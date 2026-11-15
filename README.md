# ECLIPSE — Game Engine

**Imagine it. Describe it. Play it.**

Eclipse is an ambitious game-development platform built around ECL, a beginner-friendly sentence-based programming language. The long-term goal is to combine accessible natural-language scripting with a capable 2D/3D editor and runtime.

## Current status

This repository currently contains the **ECL Language Lab v0.1 prototype**. It is an early language experiment, not yet a complete game engine.

### Included in v0.1

- Deterministic sentence parser and interpreter.
- Create player, object, light and camera declarations.
- Set simple object properties and positions.
- Register basic event declarations.
- Show messages, jump and destroy commands.
- Browser-based language lab with a small placeholder scene preview.
- Line-numbered parser errors.

### Not implemented yet

The current prototype does not include a production 2D/3D renderer, physics, live input/collision event execution, model importing, animation, audio, AI, multiplayer or game export. These are planned development areas, not existing features.

## Run the prototype

Open `index.html` in a modern browser. No build step or server is required.

## Repository layout

```text
language/       ECL parser and interpreter
index.html      Browser-based ECL Language Lab
LANGUAGE-GUIDE.md  Current ECL syntax and roadmap
README.md       Project overview
```

## Asset import direction

The planned asset pipeline prioritizes glTF/GLB. FBX, OBJ and other formats will require appropriate import/conversion tooling. Blender `.blend` projects are expected to use a Blender export/conversion workflow, usually to glTF/GLB.

## Development principles

- Core editing and scripting should work offline where practical.
- AI assistance should be optional, not required to run projects.
- ECL should be predictable: unsupported instructions should produce clear diagnostics rather than silently guessing.
- Build and test features incrementally; document what is implemented versus planned.

## License

A license has not yet been selected. Until one is added, the repository is not explicitly licensed for reuse or redistribution.
