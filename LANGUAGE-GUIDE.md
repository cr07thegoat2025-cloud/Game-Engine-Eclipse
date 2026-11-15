# Eclipse Language (ECL) v0.1

ECL is a beginner-friendly, sentence-based scripting language for the Eclipse game engine. This first prototype uses a deterministic parser: it recognizes documented sentence patterns and reports unsupported instructions rather than guessing.

## Supported statements

```text
create a player named Hero
create an object named Coin
create a light named Sun
create a camera named MainCamera

set Hero's speed to 8
set Hero's color to yellow
set Hero's health to 100
move Hero to 0, 1, 0

show "Welcome!"
make Hero jump
destroy Coin

when Hero touches Lava, show "Ouch!"
when the player presses SPACE, make Hero jump
```

## Rules

- Write one instruction per line.
- Blank lines and lines beginning with `#` or `//` are ignored.
- Object names are case-sensitive.
- Numbers, booleans and quoted text are parsed as values.
- Objects must be created before properties or actions refer to them.
- Unknown or unsupported sentences produce a line-numbered error.
- Event declarations are parsed and registered, but are not yet connected to real input, collision or physics events.

## Roadmap

1. Variables, conditions, loops, functions and custom events.
2. Input bindings, collision events, physics properties, animation and audio commands.
3. Type checking, autocomplete, diagnostics and a formal grammar.
4. Scene graph, 3D runtime, material/light/camera controls and asset importing.
5. Asset pipeline: GLB/glTF first; FBX and OBJ through dedicated import/conversion tooling. Blender `.blend` files should use a Blender conversion/export workflow, usually to GLB/glTF.

## Scope

This repository currently contains a language prototype and a small browser demonstration. It is not yet a complete game engine. Rendering, physics, live event execution, model importing, animation, audio, AI, multiplayer and export are future milestones.
