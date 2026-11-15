# Eclipse Game Engine Roadmap

This roadmap describes intended milestones, not a claim that features are already implemented.

## Phase 1 — ECL language
- [x] Initial deterministic parser/interpreter prototype
- [x] Create basic scene objects
- [x] Set simple properties and positions
- [x] Parse basic event declarations
- [ ] Variables and expressions
- [ ] If/else conditions
- [ ] Repeat and while loops
- [ ] Functions and custom events
- [ ] Static analysis, autocomplete and diagnostics
- [ ] Runtime event dispatch

## Phase 2 — Editor foundation
- [ ] Project browser and project format
- [ ] Scene hierarchy and inspector
- [ ] 2D and 3D viewport
- [ ] Transform gizmos
- [ ] Undo/redo and autosave
- [ ] Component system and prefabs

## Phase 3 — Runtime
- [ ] Rendering abstraction
- [ ] Input system
- [ ] Physics and collision
- [ ] Audio
- [ ] Animation and skeletal rigs
- [ ] UI layout and interaction
- [ ] Navigation and basic AI

## Phase 4 — Assets
- [ ] GLB/glTF importer
- [ ] OBJ importer
- [ ] FBX importer/conversion pipeline
- [ ] Blender project conversion workflow
- [ ] Texture, material and shader editor
- [ ] Asset validation and dependency management

## Phase 5 — Production tools
- [ ] Terrain and foliage tools
- [ ] Particle/VFX editor
- [ ] Profiler and debugger
- [ ] Build/export pipeline
- [ ] Windows and Android targets
- [ ] Documentation and sample projects

## Principles
- Core authoring should work offline where practical.
- AI assistance is optional; the language/runtime must not require a remote AI service.
- Clearly label implemented, experimental and planned features.
- Prefer reproducible builds and automated tests.
