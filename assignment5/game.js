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
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */


function checkIfPlane(desired, actual) {
    return (desired === actual);
}

var T = ( function () {
    var GRID_X = 31;
    var GRID_Y = 31;

    var BG_GREY = 0x66a8bd;

    var EYE_COLOR = 0x15315e;

    var COLLAR_COLOR = 0xA80909;

    var HEAD_PLANE = 1;
    var EYE_PLANE = 2;
    var PUPIL_PLANE = 3
    var SNOUT_PLANE = 4;
    var L_EAR_PLANE = 8;
    var R_EAR_PLANE = 9;
    var L_EYELID_PLANE = 5;
    var R_EYELID_PLANE = 6;
    var SAD_SNOUT_PLANE = 10;
    var OPEN_SNOUT_PLANE = 11;

    var base_sprite_id;
    var base_sprite_x;
    var base_sprite_y;

    var snout_sprite_id;
    var snout_sprite_x;
    var snout_sprite_y;

    var l_ear_sprite_id;
    var l_ear_sprite_x;
    var l_ear_sprite_y;

    var r_ear_sprite_id;
    var r_ear_sprite_x;
    var r_ear_sprite_y;

    var l_eye_w_sprite_id;
    var l_eye_w_sprite_x = 12;
    var l_eye_w_sprite_y = 12;

    var l_pupil_sprite_id;
    var l_pupil_sprite_x = 12;
    var l_pupil_sprite_y = 13;

    var r_eye_w_sprite_id;
    var r_eye_w_sprite_x = 17;
    var r_eye_w_sprite_y = 12;
    
    var r_pupil_sprite_id;
    var r_pupil_sprite_x = 17;
    var r_pupil_sprite_y = 13;

    var l_eyelid_sprite_id;
    var l_eyelid_sprite_x;
    var l_eyelid_sprite_y;

    var r_eyelid_sprite_id;
    var r_eyelid_sprite_x;
    var r_eyelid_sprite_y;

    var sad_snout_sprite_id;
    var sad_snout_sprite_x;
    var sad_snout_sprite_y;

    var open_snout_sprite_id;
    var open_snout_sprite_x;
    var open_snout_sprite_y;

    var awo_sprite_id;
    var awo_sprite_x;
    var awo_sprite_y;

    var l_eye_clicked = false;
    var r_eye_clicked = false;


//----------------------sprite loads-------------------------------------sprite loads
    var setupHeadSprite = function(image) {
        if (image !== PS.ERROR) {
            base_sprite_id = PS.spriteImage(image);
            base_sprite_x = Math.floor((GRID_X - image.width) / 2);
            base_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(base_sprite_id, HEAD_PLANE);
            PS.spriteMove(base_sprite_id, base_sprite_x-1, base_sprite_y+1);
        }
    };

    var setupSnoutSprite = function(image) {
        if (image !== PS.ERROR) {
            snout_sprite_id = PS.spriteImage(image);
            snout_sprite_x = Math.floor((GRID_X - image.width) / 2);
            snout_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(snout_sprite_id, SNOUT_PLANE);
            PS.spriteMove(snout_sprite_id, snout_sprite_x-1, snout_sprite_y+1);
        }
    };

    var setupLEarSprite = function(image) {
        if (image !== PS.ERROR) {
            l_ear_sprite_id = PS.spriteImage(image);
            l_ear_sprite_x = Math.floor((GRID_X - image.width) / 2);
            l_ear_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(l_ear_sprite_id, L_EAR_PLANE);
            PS.spriteMove(l_ear_sprite_id, l_ear_sprite_x, l_ear_sprite_y+1);
        }
    };

    var setupREarSprite = function(image) {
        if (image !== PS.ERROR) {
            r_ear_sprite_id = PS.spriteImage(image);
            r_ear_sprite_x = Math.floor((GRID_X - image.width) / 2);
            r_ear_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(r_ear_sprite_id, R_EAR_PLANE);
            PS.spriteMove(r_ear_sprite_id, r_ear_sprite_x-1, r_ear_sprite_y+1);
        }
    };

    var setupLEyelidSprite = function(image) {
        if (image !== PS.ERROR) {
            l_eyelid_sprite_id = PS.spriteImage(image);
            l_eyelid_sprite_x = Math.floor((GRID_X - image.width) / 2);
            l_eyelid_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(l_eyelid_sprite_id, L_EYELID_PLANE);
            PS.spriteMove(l_eyelid_sprite_id, l_eyelid_sprite_x-1, l_eyelid_sprite_y+1);
        }
    };

    var setupREyelidSprite = function(image) {
        if (image !== PS.ERROR) {
            r_eyelid_sprite_id = PS.spriteImage(image);
            r_eyelid_sprite_x = Math.floor((GRID_X - image.width) / 2);
            r_eyelid_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(r_eyelid_sprite_id, R_EYELID_PLANE);
            PS.spriteMove(r_eyelid_sprite_id, r_eyelid_sprite_x+4, r_eyelid_sprite_y+1);
        }
    };

    var setupSadSprite = function(image) {
        if (image !== PS.ERROR) {
            sad_snout_sprite_id = PS.spriteImage(image);
            sad_snout_sprite_x = Math.floor((GRID_X - image.width) / 2);
            sad_snout_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(sad_snout_sprite_id, SAD_SNOUT_PLANE);
            PS.spriteMove(sad_snout_sprite_id, sad_snout_sprite_x-1, sad_snout_sprite_y+1);
            PS.spriteShow(sad_snout_sprite_id, false);
        }
    };

    var setupOpenSprite = function(image) {
        if (image !== PS.ERROR) {
            open_snout_sprite_id = PS.spriteImage(image);
            open_snout_sprite_x = Math.floor((GRID_X - image.width) / 2);
            open_snout_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(open_snout_sprite_id, OPEN_SNOUT_PLANE);
            PS.spriteMove(open_snout_sprite_id, open_snout_sprite_x-1, open_snout_sprite_y+1);
            PS.spriteShow(open_snout_sprite_id, false);
        }
    };


    var setupAwoSprite = function(image) {
        if (image !== PS.ERROR) {
            awo_sprite_id = PS.spriteImage(image);
            awo_sprite_x = Math.floor((GRID_X - image.width) / 2);
            awo_sprite_y = Math.floor((GRID_Y - image.height) / 2);
            PS.spritePlane(awo_sprite_id, OPEN_SNOUT_PLANE);
            PS.spriteMove(awo_sprite_id, awo_sprite_x-1, awo_sprite_y+1);
            PS.spriteShow(awo_sprite_id, false);
        }
    };
//----------------------animate-------------------------------------animate

    var lEyeClickedFunction= function() {
        if (l_eye_clicked === false) {
            PS.spriteMove(l_eyelid_sprite_id, -1, 1);
            PS.spriteShow(sad_snout_sprite_id, false);
        } else {
            PS.spriteMove(l_eyelid_sprite_id, -1, 4);
            PS.audioPlay("dog-whimper-m", {
                fileTypes: ["mp3", "ogg"],
                path: "sounds/",
                volume: 0.8,
                loop: false
            });
            PS.spriteShow(sad_snout_sprite_id, true);
        }
    };

    var REyeClickedFunction= function() {
        if (r_eye_clicked === false) {
            PS.spriteMove(r_eyelid_sprite_id, 4, 1);
            PS.spriteShow(sad_snout_sprite_id, false);
        } else {
            PS.spriteMove(r_eyelid_sprite_id, 4, 4);
            PS.audioPlay("dog-whimper-m", {
                fileTypes: ["mp3", "ogg"],
                path: "sounds/",
                volume: 0.8,
                loop: false
            });
            PS.spriteShow(sad_snout_sprite_id, true);
        }
    };

    var barkFunction = function() {

        //growlFunction();
        PS.audioPlay("dog-bark", {
            fileTypes: ["mp3", "ogg"],
                path: "sounds/",
                volume: 0.8,
                loop: false
            });
        PS.spriteShow(open_snout_sprite_id, true);

    };

    var awooFunction = function() {

        PS.audioPlay("dog-awoo", {
            fileTypes: ["mp3", "ogg"],
            path: "sounds/",
            volume: 0.8,
            loop: false
        });
        PS.spriteShow(awo_sprite_id, true);

    };


//----------------------return-------------------------------------return

    return {
        init : function () {
            //PS.debug ("G.init() \n");

            PS.gridPlane(0);
            PS.gridSize(31,31);
            PS.gridColor( BG_GREY );
            PS.border( PS.ALL, PS.ALL, 0 );
            PS.alpha( PS.ALL, PS.ALL, 255 );
            var o;
            for (o=10;o<21;o++){
                PS.color(o,21,COLLAR_COLOR);
                PS.color(o,22,COLLAR_COLOR);
                PS.color(o,23,COLLAR_COLOR);
            }
            for (o=11;o<20;o++){
                PS.color(o,24,COLLAR_COLOR);
            }
            for (o=12;o<19;o++){
                PS.color(o,25,COLLAR_COLOR);
            }

            PS.color(15,25,0xFFD321);
            PS.color(14,25,0xFFD321);
            PS.color(16,25,0xFFD321);
            PS.color(15,26,0xFFD321);
            PS.color(14,26,0xFFD321);
            PS.color(16,26,0xFFD321);






            PS.gridPlane(HEAD_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-dog-head.png", setupHeadSprite);


            PS.gridPlane(SNOUT_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-snout.png", setupSnoutSprite);

            PS.gridPlane(L_EAR_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-left-ear.png", setupLEarSprite);

            PS.gridPlane(R_EAR_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-right-ear.png", setupREarSprite);

            PS.gridPlane(L_EYELID_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-eyelid.png", setupLEyelidSprite);

            PS.gridPlane(R_EYELID_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-eyelid.png", setupREyelidSprite);

            PS.gridPlane(SAD_SNOUT_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-snout-sad.png", setupSadSprite);

            PS.gridPlane(OPEN_SNOUT_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            PS.imageLoad("images/dgd-snout-2.png", setupOpenSprite);

            PS.imageLoad("images/dgd-awoo.png", setupAwoSprite);

            PS.statusText("Click Around Your Puppy!");

            PS.gridPlane(EYE_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            l_eye_w_sprite_id = PS.spriteSolid(2,3);
            PS.spriteSolidColor(l_eye_w_sprite_id, 0xffffff);
            PS.spriteSolidAlpha( l_eye_w_sprite_id, 255 );
            PS.spritePlane( l_eye_w_sprite_id, EYE_PLANE );
            PS.spriteMove( l_eye_w_sprite_id, l_eye_w_sprite_x, l_eye_w_sprite_y );

            r_eye_w_sprite_id = PS.spriteSolid(2,3);
            PS.spriteSolidColor(r_eye_w_sprite_id, 0xffffff);
            PS.spriteSolidAlpha( r_eye_w_sprite_id, 255 );
            PS.spritePlane( r_eye_w_sprite_id, EYE_PLANE );
            PS.spriteMove( r_eye_w_sprite_id, r_eye_w_sprite_x, r_eye_w_sprite_y );

            PS.gridPlane(PUPIL_PLANE);
            PS.alpha( PS.ALL, PS.ALL, 0 );
            l_pupil_sprite_id = PS.spriteSolid(1,2);
            PS.spriteSolidColor(l_pupil_sprite_id, EYE_COLOR);
            PS.spriteSolidAlpha( l_pupil_sprite_id, 255 );
            PS.spritePlane( l_pupil_sprite_id, PUPIL_PLANE );
            PS.spriteMove( l_pupil_sprite_id, l_pupil_sprite_x, l_pupil_sprite_y );

            r_pupil_sprite_id = PS.spriteSolid(1,2);
            PS.spriteSolidColor(r_pupil_sprite_id, EYE_COLOR);
            PS.spriteSolidAlpha( r_pupil_sprite_id, 255 );
            PS.spritePlane( r_pupil_sprite_id, PUPIL_PLANE );
            PS.spriteMove( r_pupil_sprite_id, r_pupil_sprite_x, r_pupil_sprite_y );


        },
        touch : function (x,y) {
            //PS.debug ("G.touch(): x =" + x + ", y =" + y + "\n");

            if (y >= 12 && y<=14) {
                if (x === 12 || x === 13) {
                    //PS.debug("-->l eye clicked\n");
                    l_eye_clicked = true;
                    lEyeClickedFunction();
                }
                if (x === 17 || x === 18) {
                    //PS.debug("-->r eye clicked\n");
                    r_eye_clicked = true;
                    REyeClickedFunction();
                }
                else if (x<12 || x>13) {
                    barkFunction();
                }
            } else if(y === 16 || y===17){
                if (x > 13 && x < 17) {
                    awooFunction();
                } else {
                    barkFunction();
                }
            }
            else {
                barkFunction();
            }

            if (x<17 && x>=14 && y>=25 && y<27) {
                PS.audioPlay("fx_ding");
            }
        },
        release : function (x,y) {
            //PS.debug ("G.release(): x =" + x + ", y =" + y + "\n");
            if (l_eye_clicked === true || r_eye_clicked === true) {
                l_eye_clicked = false;
                r_eye_clicked = false;
            }

            if (l_eye_clicked === false && r_eye_clicked === false) {
                //PS.debug("-->no eye clicked\n");
            }
            lEyeClickedFunction();
            REyeClickedFunction();
            PS.spriteShow(open_snout_sprite_id, false);


        },
        enter : function(x,y) {
            var y_pos, l_x_pos, r_x_pos;

            if (y <= (GRID_Y / 2) - 3) {
                y_pos = 12;
            }
            if (y >= (GRID_Y / 2) - 3) {
                y_pos = 13;
            }
            if (x <= 12) {
                l_x_pos = 12;
                r_x_pos = 17;
            }
            if (x > 12 && x <= 17) {
                l_x_pos = 13;
                r_x_pos = 17;
            }
            if (x >= 18) {
                l_x_pos = 13;
                r_x_pos = 18;
            }
            PS.spriteMove(l_pupil_sprite_id, l_x_pos, y_pos);
            PS.spriteMove(r_pupil_sprite_id, r_x_pos, y_pos);

            if (y >= 12 && y<=14) {
                if (x === 12 || x === 13) {
                    //PS.debug("-->l eye passed\n");
                } else if (x === 17 || x === 18) {
                    //PS.debug("-->r eye passed\n");
                    r_eye_clicked = true;
                } else {
                    l_eye_clicked = false;
                    r_eye_clicked = false;
                    lEyeClickedFunction();
                    REyeClickedFunction();
                }
            }
            if (y === 11 || y === 15) {
                //PS.debug("-->eyes left\n");
                l_eye_clicked = false;
                r_eye_clicked = false;
                lEyeClickedFunction();
                REyeClickedFunction();
            };

        },
        exit : function (x,y) {
            //PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );
            PS.spriteShow(open_snout_sprite_id, false);
            PS.spriteShow(awo_sprite_id, false);
        },
        exitGrid : function() {
            //PS.debug( "PS.exitGrid() called\n" );
            PS.spriteMove(l_pupil_sprite_id, 13, 13);
            PS.spriteMove(r_pupil_sprite_id, 17, 13);

        },
        keyDown : function (key) {
            //PS.debug ("G.keydown(): key =" + key + "\n");

        },
    };
} () );


PS.init = T.init;
PS.touch = T.touch;
PS.release = T.release;
PS.enter = T.enter;
PS.exit = T.exit;
PS.exitGrid = T.exitGrid;
PS.keyDown = T.keyDown;

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};



PS.shutdown = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

	// Add code here to tidy up when Perlenspiel is about to close.
};
