# Real people (optional)

Put the files below in this folder. Any file you do not add is simply skipped, the site still works with the built-in people.

| file | what it is |
|---|---|
| person1.glb, person2.glb, person3.glb | characters WITH skin (different looks are reused for everyone) |
| boss.glb, recep.glb, visitor.glb, guard.glb | optional: a special character for that role |
| idle.glb | animation: standing idle |
| walk.glb | animation: walking, **In Place** |
| sit.glb | animation: sitting idle (needed for desk workers, receptionist, boss, visitor) |
| run.glb | optional: jogging |
| wave.glb, knock.glb, water.glb | optional gestures (receptionist wave, knock, watering) |

Rules
- Minimum to turn real people on: one character + idle.glb + walk.glb. Without sit.glb only walkers (street people, players, jogger) become real.
- Character and animations must use the SAME skeleton (easiest: everything from Mixamo, bone names `mixamorig...`).
- Names are case-sensitive on GitHub.

How to get them with Mixamo (free Adobe account)
1. mixamo.com -> pick a character -> download FBX (T-pose, with skin).
2. Pick Idle, Walking (tick "In Place"), Sitting Idle -> download FBX **Without Skin**.
3. Convert each FBX to GLB (Blender: File -> Import FBX, File -> Export glTF 2.0 .glb; or any free FBX-to-GLB converter).
4. Rename like the table and copy here.

You can change the file names or add more in `js/config.js` (MODELS). Check licences before publishing.
