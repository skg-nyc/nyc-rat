/*
game.js for Perlenspiel 3.3.x
Last revision: 2020-03-24 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-20 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
By default, all event-handling function templates are COMMENTED OUT (using block-comment syntax), and are therefore INACTIVE.
Uncomment and add code to the event handlers required by your project.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.init() event handler:

var CANVAS_SIZE = 31;

var BG_GREY = 0xB7B7B7;

var BASE_DOG = 0xa36b39;
var DOG_SPOTS = 0x704116;
var DARKER_BROWN = 0x472709;
var EYE_COLOR = 0x15315e;

var wantToDraw = false;
var currentColor = PS.COLOR_BLACK;


PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

	// PS.debug( "PS.init() called\n" );

	PS.gridSize( CANVAS_SIZE, CANVAS_SIZE );
	PS.gridColor( BG_GREY );
	PS.border( PS.ALL, PS.ALL, 0 );


    PS.color( 15, 15, BASE_DOG);

    var i;
    for (i = 7; i<24; i++) {
        PS.color (12, i, BASE_DOG);
        PS.color (13, i, BASE_DOG);
        PS.color (14, i, BASE_DOG);
        PS.color (15, i, BASE_DOG);
        PS.color (16, i, BASE_DOG);
        PS.color (17, i, BASE_DOG);
        PS.color (18, i, BASE_DOG);
    }

    for (i = 8; i<23; i++) {
        PS.color (11, i, BASE_DOG);
        PS.color (19, i, BASE_DOG);
    }

    for (i = 9; i<22; i++) {
        PS.color (10, i, BASE_DOG);
        PS.color (20, i, BASE_DOG);
    }

    for (i = 10; i<21; i++) {
        PS.color (9, i, BASE_DOG);
        PS.color (21, i, BASE_DOG);
    }

    PS.color(6, 10, DARKER_BROWN);
    PS.color(6, 11, DARKER_BROWN);
    PS.color(6, 12, DARKER_BROWN);

    PS.color(7, 8, DARKER_BROWN);
    PS.color(7, 9, DARKER_BROWN);
    PS.color(7, 10, DARKER_BROWN);
    PS.color(7, 11, DARKER_BROWN);
    PS.color(7, 12, DARKER_BROWN);
    PS.color(7, 13, DARKER_BROWN);

    PS.color(8, 7, DARKER_BROWN);
    PS.color(8, 8, DARKER_BROWN);
    PS.color(8, 9, DARKER_BROWN);
    PS.color(8, 10, DARKER_BROWN);
    PS.color(8, 11, DARKER_BROWN);
    PS.color(8, 12, DARKER_BROWN);
    PS.color(8, 13, DARKER_BROWN);

    PS.color(9, 6, DARKER_BROWN);
    PS.color(9, 7, DARKER_BROWN);
    PS.color(9, 8, DARKER_BROWN);
    PS.color(9, 9, DARKER_BROWN);
    PS.color(9, 10, DARKER_BROWN);
    PS.color(9, 11, DARKER_BROWN);
    PS.color(9, 12, DARKER_BROWN);

    PS.color(10, 6, DARKER_BROWN);
    PS.color(10, 7, DARKER_BROWN);
    PS.color(10, 8, DARKER_BROWN);
    PS.color(10, 9, DARKER_BROWN);
    PS.color(10, 10, DARKER_BROWN);

    PS.color(11, 6, DARKER_BROWN);
    PS.color(11, 7, DARKER_BROWN);
    PS.color(11, 8, DARKER_BROWN);
    PS.color(11, 9, DARKER_BROWN);

    PS.color(12, 6, DARKER_BROWN);
    PS.color(12, 7, DARKER_BROWN);
    PS.color(12, 8, DARKER_BROWN);

    PS.color(13, 6, DARKER_BROWN);
    PS.color(13, 7, DARKER_BROWN);

    //------------------------------------------

    PS.color(24, 10, DARKER_BROWN);
    PS.color(24, 11, DARKER_BROWN);
    PS.color(24, 12, DARKER_BROWN);

    PS.color(23, 8, DARKER_BROWN);
    PS.color(23, 9, DARKER_BROWN);
    PS.color(23, 10, DARKER_BROWN);
    PS.color(23, 11, DARKER_BROWN);
    PS.color(23, 12, DARKER_BROWN);
    PS.color(23, 13, DARKER_BROWN);

    PS.color(22, 7, DARKER_BROWN);
    PS.color(22, 8, DARKER_BROWN);
    PS.color(22, 9, DARKER_BROWN);
    PS.color(22, 10, DARKER_BROWN);
    PS.color(22, 11, DARKER_BROWN);
    PS.color(22, 12, DARKER_BROWN);
    PS.color(22, 13, DARKER_BROWN);

    PS.color(21, 6, DARKER_BROWN);
    PS.color(21, 7, DARKER_BROWN);
    PS.color(21, 8, DARKER_BROWN);
    PS.color(21, 9, DARKER_BROWN);
    PS.color(21, 10, DARKER_BROWN);
    PS.color(21, 11, DARKER_BROWN);
    PS.color(21, 12, DARKER_BROWN);

    PS.color(20, 6, DARKER_BROWN);
    PS.color(20, 7, DARKER_BROWN);
    PS.color(20, 8, DARKER_BROWN);
    PS.color(20, 9, DARKER_BROWN);
    PS.color(20, 10, DARKER_BROWN);

    PS.color(19, 6, DARKER_BROWN);
    PS.color(19, 7, DARKER_BROWN);
    PS.color(19, 8, DARKER_BROWN);
    PS.color(19, 9, DARKER_BROWN);

    PS.color(18, 6, DARKER_BROWN);
    PS.color(18, 7, DARKER_BROWN);
    PS.color(18, 8, DARKER_BROWN);

    PS.color(17, 6, DARKER_BROWN);
    PS.color(17, 7, DARKER_BROWN);

    //------------------------------------nose

    PS.color(14, 16, PS.COLOR_BLACK);
    PS.color(15, 16, PS.COLOR_BLACK);
    PS.color(16, 16, PS.COLOR_BLACK);

    PS.color(14, 17, PS.COLOR_BLACK);
    PS.color(15, 17, PS.COLOR_BLACK);
    PS.color(16, 17, PS.COLOR_BLACK);

    PS.color(14, 19, PS.COLOR_BLACK);
    PS.color(15, 18, PS.COLOR_BLACK);
    PS.color(16, 19, PS.COLOR_BLACK);

    PS.color(12, 19, PS.COLOR_BLACK);
    PS.color(13, 20, PS.COLOR_BLACK);
    PS.color(17, 20, PS.COLOR_BLACK);
    PS.color(18, 19, PS.COLOR_BLACK);

    //------------------------------------------

    PS.color(13, 14, EYE_COLOR);
    PS.color(13, 13, EYE_COLOR);

    PS.color(17, 14, EYE_COLOR);
    PS.color(17, 13, EYE_COLOR);

    PS.color(13, 12, PS.COLOR_WHITE);
    PS.color(12, 12, PS.COLOR_WHITE);
    PS.color(12, 13, PS.COLOR_WHITE);
    PS.color(12, 14, PS.COLOR_WHITE);

    PS.color(17, 12, PS.COLOR_WHITE);
    PS.color(18, 12, PS.COLOR_WHITE);
    PS.color(18, 13, PS.COLOR_WHITE);
    PS.color(18, 14, PS.COLOR_WHITE);

    PS.color(11, 12, PS.COLOR_BLACK);
    PS.color(12, 11, PS.COLOR_BLACK);
    PS.color(13, 11, PS.COLOR_BLACK);

    PS.color(19, 12, PS.COLOR_BLACK);
    PS.color(19, 12, PS.COLOR_BLACK);
    PS.color(18, 11, PS.COLOR_BLACK);
    PS.color(17, 11, PS.COLOR_BLACK);

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	// PS.statusText( "Game" );

	// Add any other initialization code you need here.
};



/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.touch() event handler:



PS.touch = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

    wantToDraw = true;
    PS.color( x,y, currentColor);


	// Add code here for mouse clicks/touches
	// over a bead.
};



/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.release() event handler:



PS.release = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

    wantToDraw = false;

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};



/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.enter() event handler:



PS.enter = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

    if (wantToDraw == true) {
        PS.color(x, y, currentColor);
    }
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};



/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exit() event handler:

/*

PS.exit = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

*/

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exitGrid() event handler:

/*

PS.exitGrid = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

*/

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyDown() event handler:



PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	//PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	if (key == 113) {
        currentColor = PS.COLOR_WHITE;
    }
    if (key == 119) {
        currentColor = PS.COLOR_BLACK;
    }
    if (key == 101) {
        currentColor = BASE_DOG;
    }
    if (key == 114) {
        currentColor = DOG_SPOTS;
    }
};



/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyUp() event handler:

/*

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

*/

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

// UNCOMMENT the following code BLOCK to expose the PS.input() event handler:

/*

PS.input = function( sensors, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

*/

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/

// UNCOMMENT the following code BLOCK to expose the PS.shutdown() event handler:

/*

PS.shutdown = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

	// Add code here to tidy up when Perlenspiel is about to close.
};

*/
