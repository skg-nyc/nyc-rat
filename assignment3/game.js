/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-18 Worcester Polytechnic Institute.
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

var royalPurple = 0x9F26CE;
var lightPink = 0xFF80BD;
var brush = 0x270E;
var spade = 0x2660;
var heart = 0x2665;
var club = 0x2663
var diamond = 0x2666;
var dot = 0x25CF;
var rect = 0x25AE;
var triangle = 0x25B2;
var clear = 0x274C;



var currentColor = PS.COLOR_BLACK;
var currentTool = brush;


var wantToDraw = false;


PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

	// Establish grid dimensions
	
	PS.gridSize( 18, 18 );

	
	// Set background color to Perlenspiel logo gray

	PS.gridColor( 0x303030 );

	PS.color(0,0, PS.COLOR_WHITE);
	PS.color(1,0, PS.COLOR_BLACK);
	PS.color(2,0, PS.COLOR_RED);
	PS.color(3,0, PS.COLOR_ORANGE);
	PS.color(4,0, PS.COLOR_YELLOW);
	PS.color(5,0, PS.COLOR_GREEN);
	PS.color(6,0, PS.COLOR_BLUE);
	PS.color(7,0, royalPurple);
	PS.color(8,0, lightPink);
	PS.glyph(9,0, brush);
	PS.glyph(10,0, spade);
	PS.glyph(11,0, heart);
	PS.glyph(12,0, club);
	PS.glyph(13,0, diamond);
	PS.glyph(14,0, dot);
	PS.glyph(15,0, rect);
	PS.glyph(16,0, triangle);
	PS.glyph(17,0, clear);


	PS.border(PS.ALL,0,5); //topline borders
	var i;
	for ( i = 1; i < 18; i++)
	{
		PS.border(PS.ALL,i,0);
	}
	
	// Change status line color and text

	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "Draw!" );
	
	// Preload click sound

	PS.audioLoad( "fx_click" );
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

PS.touch = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Toggle color of touched bead from white to black and back again
	// NOTE: The default value of a bead's [data] is 0, which equals PS.COLOR_BLACK

	// ----------------------------------------colors
	if (y == 0 && x == 0) {
		PS.statusText("Color: White");
		currentColor = PS.COLOR_WHITE;
	} else if (y == 0 && x == 1) {
		PS.statusText("Color: Black");
		currentColor = PS.COLOR_BLACK;
	} else if (y == 0 && x == 2) {
		PS.statusText("Color: Red");
		currentColor = PS.COLOR_RED;
	} else if (y == 0 && x == 3) {
		PS.statusText("Color: Orange");
		currentColor = PS.COLOR_ORANGE;
	} else if (y == 0 && x == 4) {
		PS.statusText("Color: Yellow");
		currentColor = PS.COLOR_YELLOW;
	} else if (y == 0 && x == 5) {
		PS.statusText("Color: Green");
		currentColor = PS.COLOR_GREEN;
	} else if (y == 0 && x == 6) {
		PS.statusText("Color: Blue");
		currentColor = PS.COLOR_BLUE;
	} else if (y == 0 && x == 7) {
		PS.statusText("Color: Purple");
		currentColor = royalPurple;
	} else if (y == 0 && x == 8) {
		PS.statusText("Color: Pink");
		currentColor = lightPink;
	}

	// ----------------------------------------tools
	else if (y == 0 && x == 9) {
		PS.statusText("Tool: Brush");
		currentTool = brush;
	} else if (y == 0 && x == 10) {
		PS.statusText("Tool: Spade");
		currentTool = spade;
	} else if (y == 0 && x == 11) {
		PS.statusText("Tool: Heart");
		currentTool = heart;
	} else if (y == 0 && x == 12) {
		PS.statusText("Tool: Club");
		currentTool = club;
	} else if (y == 0 && x == 13) {
		PS.statusText("Tool: Diamond");
		currentTool = diamond;
	} else if (y == 0 && x == 14) {
		PS.statusText("Tool: Circle");
		currentTool = dot;
	} else if (y == 0 && x == 15) {
		PS.statusText("Tool: Rectangle");
		currentTool = rect;
	} else if (y == 0 && x == 16) {
		PS.statusText("Tool: Triangle");
		currentTool = triangle;
	}

	// ----------------------------------------clear

	else if (y==0 && x == 17) {
		PS.statusText("Canvas Cleared");
		var i;
		for (i = 1; i < 18; i++) {
			PS.color(PS.ALL, i, PS.COLOR_WHITE);
		}
	}

	// ----------------------------------------canvas
	if (y != 0) {

		wantToDraw = true;
		PS.audioPlay( "fx_click" );

		if (currentTool == brush) {
			PS.statusText("Tool: Brush");
			PS.color(x, y, currentColor);
		}
		if (currentTool == spade) {
			PS.statusText("Tool: Spade");
			spadeTool(x,y);
		}
		if (currentTool == heart) {
			PS.statusText("Tool: Heart");
			heartTool(x,y);
		}
		if (currentTool == club) {
			PS.statusText("Tool: Club");
			clubTool(x,y);
		}
		if (currentTool == diamond) {
			PS.statusText("Tool: Diamond");
			diaTool(x,y);
		}
		if (currentTool == dot) {
			PS.statusText("Tool: Circle");
			dotTool(x,y);
		}
		if (currentTool == rect) {
			PS.statusText("Tool: Rectangle");
			rectTool(x,y);
		}
		if (currentTool == triangle) {
			PS.statusText("Tool: Triangle");
			triTool(x,y);
		}


	}


	// Play click sound

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


function isXWithin(num){
	if (num <= 17 && num >=0) {
		return true;
	} else return false;
}
function isYWithin(num){
	if (num <= 17 && num >=1) {
		return true;
	} else return false;
}

function spadeTool(x,y) {
	if (isXWithin(x-2) && isXWithin(x+2) && isYWithin(y-2) && isYWithin(y+3)) {
		PS.color(x, y, currentColor);
		PS.color(x, y+1, currentColor);
		PS.color(x, y+2, currentColor);
		PS.color(x, y+3, currentColor);
		PS.color(x, y-2, currentColor);
		PS.color(x, y-1, currentColor);
		PS.color(x+1, y-1, currentColor);
		PS.color(x-1, y-1, currentColor);
		PS.color(x-1, y+3, currentColor);
		PS.color(x+1, y+3, currentColor);
		PS.color(x-2, y, currentColor);
		PS.color(x-2, y+1, currentColor);
		PS.color(x-1, y, currentColor);
		PS.color(x-1, y+1, currentColor);
		PS.color(x+2, y, currentColor);
		PS.color(x+2, y+1, currentColor);
		PS.color(x+1, y, currentColor);
		PS.color(x+1, y+1, currentColor);
	}
	else {
		PS.statusText("Entire stamp must fit on the canvas.");
	}
}

function heartTool(x,y) {
	if (isXWithin(x-3) && isXWithin(x+3) && isYWithin(y-2) && isYWithin(y+3)) {
		PS.color(x, y, currentColor);
		PS.color(x, y-1, currentColor);
		PS.color(x, y+1, currentColor);
		PS.color(x, y+2, currentColor);
		PS.color(x, y+3, currentColor);
		PS.color(x-1, y, currentColor);
		PS.color(x-1, y-1, currentColor);
		PS.color(x-1, y-2, currentColor);
		PS.color(x-1, y+1, currentColor);
		PS.color(x-1, y+2, currentColor);
		PS.color(x+1, y, currentColor);
		PS.color(x+1, y-1, currentColor);
		PS.color(x+1, y-2, currentColor);
		PS.color(x+1, y+1, currentColor);
		PS.color(x+1, y+2, currentColor);
		PS.color(x-2, y, currentColor);
		PS.color(x-2, y-1, currentColor);
		PS.color(x-2, y-2, currentColor);
		PS.color(x-2, y+1, currentColor);
		PS.color(x+2, y, currentColor);
		PS.color(x+2, y-1, currentColor);
		PS.color(x+2, y-2, currentColor);
		PS.color(x+2, y+1, currentColor);
		PS.color(x+3, y, currentColor);
		PS.color(x+3, y-1, currentColor);
		PS.color(x-3, y, currentColor);
		PS.color(x-3, y-1, currentColor);
	}
	else {
		PS.statusText("Entire stamp must fit on the canvas.");
	}
}

function clubTool(x,y) {
	if (isXWithin(x-3) && isXWithin(x+2) && isYWithin(y-2) && isYWithin(y+3)) {
		PS.color(x, y, currentColor);
		PS.color(x, y+1, currentColor);
		PS.color(x, y+2, currentColor);
		PS.color(x, y+3, currentColor);
		PS.color(x, y-1, currentColor);
		PS.color(x, y-2, currentColor);
		PS.color(x-1, y, currentColor);
		PS.color(x-1, y+1, currentColor);
		PS.color(x-1, y+2, currentColor);
		PS.color(x-1, y+3, currentColor);
		PS.color(x-2, y+3, currentColor);
		PS.color(x+1, y+3, currentColor);
		PS.color(x-1, y-1, currentColor);
		PS.color(x-1, y-2, currentColor);
		PS.color(x-2, y, currentColor);
		PS.color(x-3, y, currentColor);
		PS.color(x+1, y, currentColor);
		PS.color(x+2, y, currentColor);
		PS.color(x-2, y+1, currentColor);
		PS.color(x-3, y+1, currentColor);
		PS.color(x+1, y+1, currentColor);
		PS.color(x+2, y+1, currentColor);

	}
	else {
		PS.statusText("Entire stamp must fit on the canvas.");
	}
}

function diaTool(x,y) {
	if (isXWithin(x-2) && isXWithin(x+2) && isYWithin(y-2) && isYWithin(y+3)) {
		PS.color(x, y, currentColor);
		PS.color(x, y-1, currentColor);
		PS.color(x, y-2, currentColor);
		PS.color(x, y+1, currentColor);
		PS.color(x, y+2, currentColor);
		PS.color(x, y+3, currentColor);
		PS.color(x-1, y, currentColor);

		PS.color(x-1, y-1, currentColor);
		PS.color(x-1, y+1, currentColor);
		PS.color(x-1, y+2, currentColor);

		PS.color(x-2, y, currentColor);
		PS.color(x-2, y+1, currentColor);

		PS.color(x+1, y, currentColor);
		PS.color(x+1, y-1, currentColor);
		PS.color(x+1, y+1, currentColor);
		PS.color(x+1, y+2, currentColor);

		PS.color(x+2, y, currentColor);
		PS.color(x+2, y+1, currentColor);
	}
	else {
		PS.statusText("Entire stamp must fit on the canvas.");
	}
}

function dotTool(x,y) {
	if (isXWithin(x-2) && isXWithin(x+2) && isYWithin(y-2) && isYWithin(y+2)) {
		PS.color(x, y, currentColor);
		PS.color(x, y-1, currentColor);
		PS.color(x, y-2, currentColor);
		PS.color(x, y+1, currentColor);
		PS.color(x, y+2, currentColor);

		PS.color(x-1, y, currentColor);
		PS.color(x-1, y-1, currentColor);
		PS.color(x-1, y-2, currentColor);
		PS.color(x-1, y+1, currentColor);
		PS.color(x-1, y+2, currentColor);

		PS.color(x+1, y, currentColor);
		PS.color(x+1, y-1, currentColor);
		PS.color(x+1, y-2, currentColor);
		PS.color(x+1, y+1, currentColor);
		PS.color(x+1, y+2, currentColor);

		PS.color(x+2, y, currentColor);
		PS.color(x+2, y-1, currentColor);
		PS.color(x+2, y+1, currentColor);

		PS.color(x-2, y, currentColor);
		PS.color(x-2, y-1, currentColor);
		PS.color(x-2, y+1, currentColor);

	}
	else {
		PS.statusText("Entire stamp must fit on the canvas.");
	}
}

function rectTool(x,y) {
	if (isXWithin(x-1) && isXWithin(x+1) && isYWithin(y-2) && isYWithin(y+3)) {
		PS.color(x, y, currentColor);
		PS.color(x, y-1, currentColor);
		PS.color(x, y-2, currentColor);
		PS.color(x, y+1, currentColor);
		PS.color(x, y+2, currentColor);
		PS.color(x, y+3, currentColor);

		PS.color(x-1, y, currentColor);
		PS.color(x-1, y-1, currentColor);
		PS.color(x-1, y-2, currentColor);
		PS.color(x-1, y+1, currentColor);
		PS.color(x-1, y+2, currentColor);
		PS.color(x-1, y+3, currentColor);

		PS.color(x+1, y, currentColor);
		PS.color(x+1, y-1, currentColor);
		PS.color(x+1, y-2, currentColor);
		PS.color(x+1, y+1, currentColor);
		PS.color(x+1, y+2, currentColor);
		PS.color(x+1, y+3, currentColor);
	}
	else {
		PS.statusText("Entire stamp must fit on the canvas.");
	}
}

function triTool(x,y) {
	if (isXWithin(x-2) && isXWithin(x+2) && isYWithin(y-1) && isYWithin(y+1)) {
		PS.color(x, y, currentColor);
		PS.color(x, y-1, currentColor);
		PS.color(x, y+1, currentColor);

		PS.color(x-1, y, currentColor);
		PS.color(x-1, y+1, currentColor);
		PS.color(x-2, y+1, currentColor);

		PS.color(x+1, y, currentColor);
		PS.color(x+1, y+1, currentColor);
		PS.color(x+2, y+1, currentColor);

	}
	else {
		PS.statusText("Entire stamp must fit on the canvas.");
	}
}

PS.release = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	wantToDraw = false;

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

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	var next;

	// Toggle color of touched bead from white to black and back again
	// NOTE: The default value of a bead's [data] is 0, which equals PS.COLOR_BLACK

	if (wantToDraw == true && y !=0) {
		if (currentTool == brush) {
			PS.color(x, y, currentColor); // set color to value of data
			PS.border(x, y, 0);
		}
		if (currentTool == spade) {
			spadeTool(x,y);
		}
		if (currentTool == heart) {
			heartTool(x,y);
		}
		if (currentTool == club) {
			clubTool(x,y);
		}

		if (currentTool == diamond) {
			diaTool(x,y);
		}
		if (currentTool == dot) {
			dotTool(x,y);
		}
		if (currentTool == rect) {
			rectTool(x,y);
		}
		if (currentTool == triangle) {
			triTool(x,y);
		}

	}

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



PS.exit = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};



/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exitGrid() event handler:



PS.exitGrid = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	wantToDraw = false;

	// Add code here for when the mouse cursor/touch moves off the grid.
};



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


	PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
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
