import bpy, math, sys
from mathutils import Vector
RES = int(sys.argv[-2]); SAMPLES = int(sys.argv[-1])
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = SAMPLES; sc.cycles.use_denoising = True
sc.render.resolution_x = RES; sc.render.resolution_y = int(RES * 1.25)
sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'; sc.view_settings.exposure = 0.0
D = '/home/claude/ig/eta/'

def mat(name, color=(1, 1, 1), rough=0.5, img=None, emit=0.0, metal=0.0, coat=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1); b.inputs["Roughness"].default_value = rough; b.inputs["Metallic"].default_value = metal
    b.inputs["Coat Weight"].default_value = coat
    if img:
        tc = nt.nodes.new("ShaderNodeTexCoord"); im = nt.nodes.new("ShaderNodeTexImage"); im.image = bpy.data.images.load(img)
        nt.links.new(tc.outputs["UV"], im.inputs["Vector"]); nt.links.new(im.outputs["Color"], b.inputs["Base Color"])
        if emit:
            nt.links.new(im.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = emit
    return m

def plane(w, h, loc, rotz, m):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc); o = bpy.context.object
    o.scale = (w, h, 1); bpy.ops.object.transform_apply(scale=True); o.rotation_euler[2] = math.radians(rotz); o.data.materials.append(m); return o

def box(w, h, t, loc, rotz, side, top=None, bevel=0.002):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object
    o.scale = (w, h, t); bpy.ops.object.transform_apply(scale=True); o.rotation_euler[2] = math.radians(rotz)
    o.data.materials.append(side)
    if bevel:
        bv = o.modifiers.new("b", 'BEVEL'); bv.width = bevel; bv.segments = 4
    if top:
        p = plane(w * 0.995, h * 0.995, (loc[0], loc[1], loc[2] + t / 2 + 0.0004), rotz, top)
    return o

# table: worn wood + map
WOOD = mat("wood", (0.30, 0.17, 0.08), 0.55)
nt = WOOD.node_tree; b = nt.nodes["Principled BSDF"]
tc = nt.nodes.new("ShaderNodeTexCoord"); wv = nt.nodes.new("ShaderNodeTexWave"); wv.inputs["Scale"].default_value = 3; wv.inputs["Distortion"].default_value = 7
nt.links.new(tc.outputs["Object"], wv.inputs["Vector"])
mx = nt.nodes.new("ShaderNodeMixRGB"); mx.inputs[1].default_value = (0.2, 0.1, 0.045, 1); mx.inputs[2].default_value = (0.4, 0.23, 0.11, 1)
nt.links.new(wv.outputs["Fac"], mx.inputs[0]); nt.links.new(mx.outputs[0], b.inputs["Base Color"])
plane(3, 3, (0, 0, 0), 0, WOOD)
MAP = mat("map", rough=0.8, img='/home/claude/ig/tex_map.png')
mp = plane(0.62, 0.45, (0.02, 0.04, 0.0006), 8, MAP)

# passport (slightly open feel: just closed book)
NAVY = mat("navy", (0.03, 0.06, 0.15), 0.6)
PP = mat("pp", rough=0.55, img=D + 'tex_passport.png')
box(0.088, 0.125, 0.007, (-0.075, 0.035, 0.0045), -14, NAVY, PP)
# boarding pass, partly tucked
PASS = mat("pass", rough=0.4, img=D + 'tex_pass.png')
bp = plane(0.205, 0.082, (0.018, -0.052, 0.0095), 9, PASS)
# phone
BLACK = mat("phone", (0.02, 0.02, 0.025), 0.25, coat=1.0)
SCR = mat("screen", rough=0.08, img=D + 'tex_phone.png', emit=0.9, coat=1.0)
ph = box(0.072, 0.148, 0.008, (0.085, 0.07, 0.0046), 12, BLACK, None, bevel=0.006)
scr = plane(0.066, 0.1357, (0.085, 0.07, 0.0088), 12, SCR)
# lights
bpy.ops.object.light_add(type='AREA', location=(-0.6, 0.5, 0.9)); k = bpy.context.object
k.data.energy = 30; k.data.size = 0.6; k.data.color = (1.0, 0.9, 0.78)
k.rotation_euler = (Vector((0, 0, 0)) - k.location).to_track_quat('-Z', 'Y').to_euler()
bpy.ops.object.light_add(type='AREA', location=(0.7, -0.4, 0.6)); f = bpy.context.object
f.data.energy = 6; f.data.size = 1.0; f.data.color = (0.8, 0.9, 1.0)
f.rotation_euler = (Vector((0, 0, 0)) - f.location).to_track_quat('-Z', 'Y').to_euler()
world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.5, 0.45, 0.4, 1); world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.12

# camera
bpy.ops.object.camera_add(location=(0.0, -0.25, 0.44)); cam = bpy.context.object; sc.camera = cam
tgt = Vector((-0.005, 0.0, 0.0))
cam.rotation_euler = (tgt - cam.location).to_track_quat('-Z', 'Y').to_euler()
cam.data.lens = 50
cam.data.dof.use_dof = True; cam.data.dof.focus_distance = (tgt - cam.location).length; cam.data.dof.aperture_fstop = 4.0
sc.render.filepath = D + 'render_eta.png'
bpy.ops.render.render(write_still=True)
