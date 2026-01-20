# RetroCurrimus

## File Structure

* `.gitignore` - [See here](https://git-scm.com/docs/gitignore).
* `build.sh` - Builds all the files into a flat folder for easy upload to the [web editor](https://editor.p5js.org).
* `index.html` - Renders the canvas and imports the files.
* `README.md` - Information about the project.
* `style.css` - Styles the webpage.

### Assets
#### Assets/Fonts
Contains fonts used

### Build
Where the built files go for release.

### Global
This holds files that are used across the entire game
* `constants.js` - Contains the settings object, enums, and any "magic numbers" used in the script.
* `driver.js` - This contains the main execution of the program (the `setup` and `draw` functions.)
* `state.js` - Contains code for the game state and switching screens.

### Plans
This contains planning files for the game.
* `game-flow.mmd` - A flowchart for game execution.
* `levels-3-to-5-plans.piskel` - A saved [Piskel](www.piskelapp.com) file for the outlines for levels three to five.

### Screens
Contains the code for drawing and setting up all game screens.
* `credits.js` - Credits screen, displays who helped and worked on this project.
* `error.js` - Screen to display when something goes wrong.
* `fail.js` - Screen displayed when you die.
* `game-generic.js` - Runs the active level, runs the player tick, draws the objects, etc.
* `level-select.js` - Allows you to go to whichever selected level you have unlocked.
* `main-menu.js` - Displayed on startup, takes you either to the most recent level, level select, credits, or leaves the game.
* `title-card.js` - Displays the title briefly.
* `win.js` - Screen displayed when you win.
#### Screens/Levels
Contains code for drawing and settings up all of the levels of the game.

### Utils
Contains scripts and classes used throughout the code.
* `button.js` - Contains the `Button` class used to draw buttons in non-active screens.
* `physics.js` - Contains physics objects.
* `screen.js` - Contains code for easily making and registering new screens and levels.
* `shapes.js` - Contains code for making shapes
	* `star` - Draws a star with a set inner and outer radius and n points.
	* `title` - Draws the title of the game.
* `text-styles.js` - Simplifies text styling into one function.