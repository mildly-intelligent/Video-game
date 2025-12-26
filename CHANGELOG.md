# Changelog

## [0.3.2] - 2025-12-26

### Added
- Make `compose.sh` compose a .txt file if the file is not one of: `.js`, `.html`, `.json`, `.css`, or `.txt`.
- Document changelog footnotes

## [0.3.1] - 2025-12-21

### Added
- Create script (`./compose.sh`) to compose project to be ready to upload to https://editor.p5js.org/.

### Removed
- Remove `README.md` temporarily

## [0.3.0] - 2025-12-16

### Changed
- Deprecate `Point`, prefer objects in format `{x: number, y: number}`
- Add register to `state` for physics object

### Added
- Add `_PhysicsObject` base class for physics objects
- Add `StaticPhysObj` and `DynamicPhysObj`
- Add enums for physics handling
- Document code more

### Removed
- Remove last updated from file headers


## [0.2.0] - 2025-12-10

### Changed
- **Breaking:** Rename screen draw and setup functions to `setup`/`draw` followed by the screenID
- Reformat date in file headers from `DD/MM/YYYY` to `DD-MM-YYYY`

### Added
- Add global `state` object to control game state
- Map most buttons to change `state.screen` to the appropriate screen
- Create error screen
- Create enums for both error codes and error messages
- Make driver code to run all the screens
- Make startup code to set initial game state and future startup functions
- Make shapes file for custom shapes
- Create `star` function


## [0.1.1] - 2025-12-10

### Changed
- Rename version constants to all-caps and have trailing and leading double underscores

### Added
- Add version number to main menu

### Removed
- Remove prerelease from version number


## [0.1.0] - 2025-12-10

_Initial release._

<!--
	These are links to the commits on github.
	If the link ends with `#######` that means it is the current commit
-->
[0.3.2]: https://github.com/mildly-intelligent/Video-game/commit/#######
[0.3.1]: https://github.com/mildly-intelligent/Video-game/commit/5777974
[0.3.0]: https://github.com/mildly-intelligent/Video-game/commit/b9faebb
[0.2.0]: https://github.com/mildly-intelligent/Video-game/commit/b176330
[0.1.1]: https://github.com/mildly-intelligent/Video-game/commit/3640ccf
[0.1.0]: https://github.com/mildly-intelligent/Video-game/commit/909c16f