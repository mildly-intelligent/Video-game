# RetroCurrimus

## Notes

* This README is written in a markup language called
[MarkDown](https://en.wikipedia.org/wiki/Markdown) which the web editor doesn't have a renderer
for. If you want to read this document nice and formatted I suggest just looking at the
[GitHub repo for this project](https://github.com/mildly-intelligent/Video-game) as it has a
markdown renderer, or you could just read it as plain text.
* I am using version control for this project (specifically [Git](https://git-scm.com/)) which
allows me to go back to previous versions of code. I assume this would probably also be useful for
you grading this project.

### Documentation
* I was unable to use the header format you provided because 1) my entire filesystem decided it
didn't want to keep track of when files were created and just straight up lied to me, and 2)
because of that the only real information I had for the headers was author name (always me), title
which is the same as the file name, and date modified which was all the same day because I was
fixing the headers. I think [this](#file-structure) section of the README more than accounts for
the lack of headers on every file however.
* In a lot of the code I use a commenting format called
[JSDoc](https://en.wikipedia.org/wiki/JSDoc) because VSCode can use it for type hinting and it
makes it so I don't have to search for the function if I ever forget the order of parameters or
something. A JSDoc comment will look like this: `/** ... */` and it will use tags that start with a
`@` symbol. It's a mostly human readable format so you can just ignore the tags and understand just
fine.
* I try to credit external code as often as I can but there will be times where I will forget 
(especially in Bash because most of my time in that language is just reading documentation and
StackOverflow and copy-pasting,) but there will be times I miss code that was probably someone
else's.


## File Structure

* `.gitignore` - [See here](https://git-scm.com/docs/gitignore).
* `build.sh` - Builds all the files into a flat folder for easy upload to the [web editor](https://editor.p5js.org).
* `index.html` - Renders the canvas and imports the files.
* `README.md` - Information about the project.
* `style.css` - Styles the webpage.

### Assets
* `CREDITS.md` - Detailed credits for assets used.
#### Assets/Fonts
Contains fonts used in the code.

### Build
Where the built files go for release.

### Global
This holds files that are used across the entire game.
* `constants.js` - Contains the settings object, enums, and any "magic numbers" used in the script.
* `driver.js` - This contains the main execution of the program (the `setup` and `draw` functions.)
* `startup.js` - Code run at the very beginning of execution. Sets the state and has other related function.

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
* `physics.js` - Contains physics objects and physics logic.
* `screen.js` - Contains code for easily making and registering new screens and levels.
* `shapes.js` - Contains code for making shapes
	* `star` - Draws a star with a set inner and outer radius and n points.
	* `title` - Draws the title of the game.
* `text-styles.js` - Simplifies text styling into one function.