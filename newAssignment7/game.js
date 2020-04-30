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


var G = (function () {
    "use strict";

    // color constants
    const GRID_X = 18;
    const GRID_Y = 18;

    const BG_COLOR = PS.COLOR_WHITE;

    const CONN_BLUE = 0x953b8;
    const CONN_RED = 0x8a1a12;
    const CONN_GREEN = 0x0f7a0d;

    const GRAY = 0x999999;
    const DARK_GRAY = 0x444444;

    const SERVER_GRAY = 0x222222;

    const OPAQUE = PS.ALPHA_OPAQUE;

    // plane constants
    const BG_PLANE = 0;
    const BLUE_CONNECTION_PLANE = 1;
    const RED_CONNECTION_PLANE = 2;
    const GREEN_CONNECTION_PLANE = 3;
    const SERVER_PLANE = 4;
    const COMPUTER_PLANE = 5;

    // other constants
    const INACTIVE = 0;
    const ACTIVE = 1;

    const TICKS = 6;
    const COMP_FADE_RATE = 1200;

    // variables
    let timer = null;

    let connCounter = 1;

    let endPointArr = new Array();
    let blueEndPoint = [2,[99,99]];
    let redEndPoint =[2,[99,99]];
    let greenEndPoint = [2,[99,99]];

    endPointArr.push(blueEndPoint);
    endPointArr.push(redEndPoint);
    endPointArr.push(greenEndPoint);

    let drawingConnection = false;
    let startConnectionX;
    let startConnectionY;

    let successConnectionX;
    let successConnectionY;

    let connectionPathOne = null;
    let connPositionOne;
    let prevPathOne;
    let prevPosOne;

    let connectionPathTwo = null;
    let connPositionTwo;
    let prevPathTwo;
    let prevPosTwo;

    let connectionPathThree = null;
    let connPositionThree;
    let prevPathThree;
    let prevPosThree;

    let testCondition = false;

    // computer definition
    let Computer = function(x,y,id) {
        this.id = id;

        this.ltopx = x;
        this.ltopy = y;
        this.rtopx = x+1;
        this.rtopy = y;

        this.lbotx = x+1;
        this.lboty = y;
        this.rbotx = x+1;
        this.rboty = y+1;

        this.isActive = INACTIVE;
        this.fadeSpeed = 0;

        this.isConnected = function() {
            if (endPointArr[0][0] === this.ltopx || endPointArr[0][0] === this.rbotx) {
                if (endPointArr[0][1] === this.ltopy || endPointArr[0][1] === this.rboty);
                return true;
            } else if (endPointArr[1][0] === this.ltopx || endPointArr[1][0] === this.rbotx) {
                if (endPointArr[1][1] === this.ltopy || endPointArr[1][1] === this.rboty);
                return true;
            }else if (endPointArr[2][0] === this.ltopx || endPointArr[2][0] === this.rbotx) {
                if (endPointArr[2][1] === this.ltopy || endPointArr[2][1] === this.rboty);
                return true;
            }
            else return false;

        }



    };

    // array of all the computers
    var compArr = new Array();

    {
        var comp1 = new Computer(2, 2, 1);
        var comp2 = new Computer(1, 5, 2);
        var comp3 = new Computer(3, 8, 3);
        var comp4 = new Computer(1, 11, 4);
        var comp5 = new Computer(2, 14, 5);
        var comp6 = new Computer(5, 15, 6);
        var comp7 = new Computer(8, 13, 7);
        var comp8 = new Computer(11, 15, 8);
        var comp9 = new Computer(14, 14, 9);
        var comp10 = new Computer(15, 11, 10);
        var comp11 = new Computer(13, 8, 11);
        var comp12 = new Computer(15, 5, 12);
        var comp13 = new Computer(14, 2, 13);
        var comp14 = new Computer(11, 1, 14);
        var comp15 = new Computer(8, 3, 15);
        var comp16 = new Computer(5, 1, 16);


        compArr.push(comp1);
        compArr.push(comp2);
        compArr.push(comp3);
        compArr.push(comp4);
        compArr.push(comp5);
        compArr.push(comp6);
        compArr.push(comp7);
        compArr.push(comp8);
        compArr.push(comp9);
        compArr.push(comp10);
        compArr.push(comp11);
        compArr.push(comp12);
        compArr.push(comp13);
        compArr.push(comp14);
        compArr.push(comp15);
        compArr.push(comp16);
    } // sets up the array

    // activates starter computers
    comp3.isActive = ACTIVE;
    comp7.isActive = ACTIVE;
    comp11.isActive = ACTIVE;
    comp15.isActive = ACTIVE;

    {
        // comp1.isActive = ACTIVE;
        // comp5.isActive = ACTIVE;
        // comp9.isActive = ACTIVE;
        // comp13.isActive = ACTIVE;
        //
        // comp2.isActive = ACTIVE;
        // comp4.isActive = ACTIVE;
        // comp6.isActive = ACTIVE;
        // comp8.isActive = ACTIVE;
        // comp10.isActive = ACTIVE;
        // comp12.isActive = ACTIVE;
        // comp14.isActive = ACTIVE;
        // comp16.isActive = ACTIVE;

    } //make all the other computers active (for testing)

    // functions start here

    // TODO make "activateRandomComputer" function

    var drawComputer = function (idNum) {

        let thisComp = compArr[idNum-1];
        if (thisComp.isActive) {
            let x = thisComp.ltopx;
            let y = thisComp.ltopy;

            PS.alpha(x, y, OPAQUE);
            PS.alpha(x + 1, y, OPAQUE);
            PS.alpha(x, y + 1, OPAQUE);
            PS.alpha(x + 1, y + 1, OPAQUE);

            PS.color(x, y, GRAY);
            PS.color(x + 1, y, GRAY);
            PS.color(x, y + 1, GRAY);
            PS.color(x + 1, y + 1, GRAY);

            PS.border(x, y, {
                top: 4,
                left: 4,
                bottom: 0,
                right: 0
            });
            PS.border(x + 1, y, {
                top: 4,
                left: 0,
                bottom: 0,
                right: 4
            });
            PS.border(x, y + 1, {
                top: 0,
                left: 4,
                bottom: 24,
                right: 0
            });
            PS.border(x + 1, y + 1, {
                top: 0,
                left: 0,
                bottom: 30,
                right: 4
            });

            PS.borderColor(x, y, DARK_GRAY);
            PS.borderColor(x + 1, y, DARK_GRAY);
            PS.borderColor(x, y + 1, DARK_GRAY);
            PS.borderColor(x + 1, y + 1, DARK_GRAY);

            if (!testCondition) {
                PS.fade(x, y, COMP_FADE_RATE, {onEnd: gameOver});
                PS.fade(x, y + 1, COMP_FADE_RATE, {onEnd: gameOver});
                PS.fade(x + 1, y, COMP_FADE_RATE, {onEnd: gameOver});
                PS.fade(x + 1, y + 1, COMP_FADE_RATE, {onEnd: gameOver});

                PS.color(x, y, PS.COLOR_RED);
                PS.color(x, y + 1, PS.COLOR_RED);
                PS.color(x + 1, y, PS.COLOR_RED);
                PS.color(x + 1, y + 1, PS.COLOR_RED);
            } else {
                PS.fade(x, y, COMP_FADE_RATE, {onEnd: gameOver});
                PS.fade(x, y + 1, COMP_FADE_RATE, {onEnd: gameOver});
                PS.fade(x + 1, y, COMP_FADE_RATE, {onEnd: gameOver});
                PS.fade(x + 1, y + 1, COMP_FADE_RATE, {onEnd: gameOver});

                PS.color(x, y, PS.COLOR_GREEN);
                PS.color(x, y + 1, PS.COLOR_GREEN);
                PS.color(x + 1, y, PS.COLOR_GREEN);
                PS.color(x + 1, y + 1, PS.COLOR_GREEN);
            }

        }
        // else {
        //     PS.border(x, y, 0);
        //     PS.border(x + 1, y, 0);
        //     PS.border(x, y + 1, 0);
        //     PS.border(x + 1, y + 1, 0);
        // }

    };

    var count_computers = function() {
        let activeNum = 0;
        for (var i = 0; i < 16; i++) {
            if (compArr[i].isActive) {
                activeNum ++;
            } else continue;
        }
        return activeNum;
    };

    var gameOver = function() {
        PS.timerStop(timer);
        PS.statusText("Game Over! Score: " + count_computers());
    };

    var isServerClicked = function (x,y) {
        if (x === 9 || x === 8) {
            if (y === 8 || y === 9) {
                return true;
            }
        }
        else return false;
    };

    var make_connection = function() {
        let path;
        let prevPath;

        switch(connCounter) {
            case 2:
                if (connectionPathOne) {
                    if (prevPathOne) {
                        prevPath = prevPathOne[prevPosOne];
                        PS.gridPlane(BLUE_CONNECTION_PLANE);
                        PS.alpha(prevPath[0], prevPath[1], 0);
                        PS.color(prevPath[0], prevPath[1], BG_COLOR);

                        prevPosOne += 1;
                        if (prevPosOne >= prevPathOne.length) {
                            prevPathOne = null;
                        }
                    }

                    path = connectionPathOne[connPositionOne];
                    PS.gridPlane(BLUE_CONNECTION_PLANE);
                    PS.alpha(path[0], path[1], OPAQUE);
                    PS.color(path[0], path[1], CONN_BLUE);

                    connPositionOne += 1;
                    if (connPositionOne >= connectionPathOne.length) {
                        prevPathOne = connectionPathOne;
                        connectionPathOne = null;
                        PS.gridPlane(COMPUTER_PLANE);
                    }
                }
                break;
            case 3:
                if (connectionPathTwo) {
                    if (prevPathTwo) {
                        prevPath = prevPathTwo[prevPosTwo];
                        PS.gridPlane(RED_CONNECTION_PLANE);
                        PS.alpha(prevPath[0], prevPath[1], 0);
                        PS.color(prevPath[0], prevPath[1], BG_COLOR);

                        prevPosTwo += 1;
                        if (prevPosTwo >= prevPathTwo.length) {
                            prevPathTwo = null;
                        }
                    }

                    path = connectionPathTwo[connPositionTwo];
                    PS.gridPlane(RED_CONNECTION_PLANE);
                    PS.alpha(path[0], path[1], OPAQUE);
                    PS.color(path[0], path[1], CONN_RED);

                    connPositionTwo += 1;
                    if (connPositionTwo >= connectionPathTwo.length) {
                        prevPathTwo = connectionPathTwo;
                        connectionPathTwo = null;
                        PS.gridPlane(COMPUTER_PLANE);
                    }
                }
                break;
            case 1:
                if (connectionPathThree) {
                    if (prevPathThree) {
                        prevPath = prevPathThree[prevPosThree];
                        PS.gridPlane(GREEN_CONNECTION_PLANE);
                        PS.alpha(prevPath[0], prevPath[1], 0);
                        PS.color(prevPath[0], prevPath[1], BG_COLOR);

                        prevPosThree += 1;
                        if (prevPosThree >= prevPathThree.length) {
                            prevPathThree = null;
                        }
                    }

                    path = connectionPathThree[connPositionThree];
                    PS.gridPlane(GREEN_CONNECTION_PLANE);
                    PS.alpha(path[0], path[1], OPAQUE);
                    PS.color(path[0], path[1], CONN_GREEN);

                    connPositionThree += 1;
                    if (connPositionThree >= connectionPathThree.length) {
                        prevPathThree = connectionPathThree;
                        connectionPathThree = null;
                        PS.gridPlane(COMPUTER_PLANE);
                    }
                }
                break;

        }

    };


    var connection_handler = function() {
        make_connection();

    };

    var loggedIn = function() {
        PS.gridPlane(SERVER_PLANE);
        PS.alpha(8,8,OPAQUE);
        PS.alpha(8,9,OPAQUE);
        PS.alpha(9,8,OPAQUE);
        PS.alpha(9,9,OPAQUE);

        PS.color(8,8,SERVER_GRAY);
        PS.color(8,9,SERVER_GRAY);
        PS.color(9,8,SERVER_GRAY);
        PS.color(9,9,SERVER_GRAY);

        PS.gridPlane(COMPUTER_PLANE);
        drawComputer(3);
        drawComputer(7);
        drawComputer(11);
        drawComputer(15);

        // drawComputer(1);
        // drawComputer(5);
        // drawComputer(9);
        // drawComputer(13);

        for (let o = 1; o < 17 ; o++) {
            drawComputer(o);
        }

        // -----------------------------------------------------to check active statuses
        // for (let i = 0; i < compArr.length; i++) {
        //     PS.debug("the comp id is: " + compArr[i].id +", active status is " + compArr[i].isActive+"\n");
        // }

        timer = PS.timerStart(TICKS, connection_handler);
    };

    //---------------------------------------------------(return)
    return {
        init : function () {
            //PS.debug( "PS.init() called\n" );
            PS.gridSize( GRID_X, GRID_Y );
            PS.statusText( "Prototype" );

            PS.gridColor(GRAY);

            PS.gridPlane(BG_PLANE);
            PS.color(PS.ALL, PS.ALL, BG_COLOR);

            PS.border(PS.ALL, PS.ALL, 0);

            DB.active(true);
            DB.init("lostConnections", loggedIn);

            // PS.debug("endpoint array b1:" + endPointArr[0][0] + " " +endPointArr[0][1] +"\n");
            // PS.debug("endpoint array r2:" + endPointArr[1][0] + " " +endPointArr[1][1] +"\n");
            // PS.debug("endpoint array g3:" + endPointArr[2][0] + " " +endPointArr[2][1] +"\n");
        },
        touch : function (x,y) {
            //PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

            testCondition = false;

            if (isServerClicked(x,y)) {
                drawingConnection = true;

                startConnectionX = x;
                startConnectionY = y;
                //PS.debug( "server clicked\nx = " + startConnectionX + ", y = " + startConnectionY + ".\n");
            }
        },
        release : function (x,y) {
            // PS.debug( "PS.release() @ " + x + ", " + y + "\n" );
            let colorReleasedOn = PS.color(x, y);
            if (drawingConnection) {
                successConnectionX = x;
                successConnectionY = y;
                if (endPointArr[0][0] !== 99) {
                    for (let i = 0; i <= 2; i++) {
                        if (successConnectionX === endPointArr[i][0] && successConnectionY === endPointArr[i][1] ||
                            successConnectionX === endPointArr[i][0] && successConnectionY === endPointArr[i][1]-1 ||
                            successConnectionX === endPointArr[i][0] && successConnectionY === endPointArr[i][1]+1 ||
                            successConnectionX === endPointArr[i][0]+1 && successConnectionY === endPointArr[i][1] ||
                            successConnectionX === endPointArr[i][0]+1 && successConnectionY === endPointArr[i][1]-1 ||
                            successConnectionX === endPointArr[i][0]+1 && successConnectionY === endPointArr[i][1]+1 ||
                            successConnectionX === endPointArr[i][0]-1 && successConnectionY === endPointArr[i][1] ||
                            successConnectionX === endPointArr[i][0]-1 && successConnectionY === endPointArr[i][1]-1 ||
                            successConnectionX === endPointArr[i][0]-1 && successConnectionY === endPointArr[i][1]+1) {
                            drawingConnection = false;
                            PS.statusText("Computer already connected!");
                        }
                    }
                }
                if (colorReleasedOn !== BG_COLOR && drawingConnection) {
                    PS.statusText("Prototype");
                    switch(connCounter) {
                        case 1:
                            endPointArr[0] = [x,y];
                            connPositionOne = 0;
                            prevPosOne = 0;
                            connectionPathOne = PS.line(startConnectionX, startConnectionY, successConnectionX, successConnectionY);
                            break;
                        case 2:
                            endPointArr[1] = [x,y];
                            connPositionTwo = 0;
                            prevPosTwo = 0;
                            connectionPathTwo = PS.line(startConnectionX, startConnectionY, successConnectionX, successConnectionY);
                            break;
                        case 3:
                            endPointArr[2] = [x,y];
                            connPositionThree = 0;
                            prevPosThree = 0;
                            connectionPathThree = PS.line(startConnectionX, startConnectionY, successConnectionX, successConnectionY);
                            break;
                    }
                    // PS.debug("endpoint array b1:" + endPointArr[0][0] + " " +endPointArr[0][1] +"\n");
                    // PS.debug("endpoint array r2:" + endPointArr[1][0] + " " +endPointArr[1][1] +"\n");
                    // PS.debug("endpoint array g3:" + endPointArr[2][0] + " " +endPointArr[2][1] +"\n");
                    if (connCounter === 3){
                        connCounter = 1;
                        //PS.debug("counter is " + connCounter + "\n");
                    } else if (connCounter != 3) {
                        connCounter ++;
                        //PS.debug("counter is " + connCounter + "\n");
                    } else {
                        PS.debug("counter problem");
                        PS.debug("counter is " + connCounter + "\n");
                    }
                }
            }
            // PS.debug("color here is " + colorReleasedOn + "\n");
            // PS.debug("Connection dropped at " + x + ", " + y + "\n");

            testCondition = true;
            drawingConnection = false;
        },
        enter : function (x,y) {
            // PS.debug( "PS.release() @ " + x + ", " + y + "\n" );
        },
        exit : function (x,y) {
            // PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

        },
        exitGrid : function () {
            // PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );
        },
        shutdown : function () {
            DB.send();
        }
    }


} ()) ;


PS.init = G.init;
PS.touch = G.touch;
PS.release = G.release;
PS.enter = G.enter;
PS.exit = G.exit;
PS.exitGrid = G.exitGrid;
PS.shutdown = G.shutdown;

{
    PS.keyDown = function (key, shift, ctrl, options) {
        "use strict"; // Do not remove this directive!

        // PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

    };


    PS.keyUp = function (key, shift, ctrl, options) {
        "use strict"; // Do not remove this directive!

        // PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

    };

} // functions I probably won't need