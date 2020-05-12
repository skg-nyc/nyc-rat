/*
game.js for Perlenspiel 3.3.x
Last revision: 2020-03-24 (BM)

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

var G = ( function () {
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

    let endPointArr = []; // *BM* This is the easy way to create a new empty array
    let blueEndPoint = [99, 99];
    let redEndPoint = [99, 99];
    let greenEndPoint = [99, 99];

    endPointArr.push( blueEndPoint );
    endPointArr.push( redEndPoint );
    endPointArr.push( greenEndPoint );

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

    let prevEndPointArr = []; // *BM* ditto
    let prevBlueEndPoint = [99, 99];
    let prevRedEndPoint = [99, 99];
    let prevGreenEndPoint = [99, 99];

    prevEndPointArr.push( prevBlueEndPoint );
    prevEndPointArr.push( prevRedEndPoint );
    prevEndPointArr.push( prevGreenEndPoint );

    let counter = 0;
    let countdown = 200;

    let display = false;

    let testCondition = false;

    // computer definition
    const Computer = function ( x, y, id ) {
        this.id = id;

        this.ltopx = x;
        this.ltopy = y;
        this.rtopx = x + 1;
        this.rtopy = y;

        this.lbotx = x + 1;
        this.lboty = y;
        this.rbotx = x + 1;
        this.rboty = y + 1;

        this.isActive = INACTIVE;
        this.fadeSpeed = 0;

        this.isConnected = false;

        this.color = PS.COLOR_RED;

        this.updateColor = function () {
            if ( this.color === PS.COLOR_RED ) {
                PS.fade( x, y, COMP_FADE_RATE, { onEnd : gameOver } );
                PS.fade( x, y + 1, COMP_FADE_RATE, { onEnd : gameOver } );
                PS.fade( x + 1, y, COMP_FADE_RATE, { onEnd : gameOver } );
                PS.fade( x + 1, y + 1, COMP_FADE_RATE, { onEnd : gameOver } );

                PS.color( x, y, PS.COLOR_RED );
                PS.color( x, y + 1, PS.COLOR_RED );
                PS.color( x + 1, y, PS.COLOR_RED );
                PS.color( x + 1, y + 1, PS.COLOR_RED );

            }
            else if ( this.color === PS.COLOR_GREEN ) {
                PS.fade( x, y, COMP_FADE_RATE );
                PS.fade( x, y + 1, COMP_FADE_RATE );
                PS.fade( x + 1, y, COMP_FADE_RATE );
                PS.fade( x + 1, y + 1, COMP_FADE_RATE );

                PS.color( x, y, PS.COLOR_GREEN );
                PS.color( x, y + 1, PS.COLOR_GREEN );
                PS.color( x + 1, y, PS.COLOR_GREEN );
                PS.color( x + 1, y + 1, PS.COLOR_GREEN );

            }
        };

    };

    // array of all the computers
    let compArr = [];

    let comp1 = new Computer( 2, 2, 1 );
    let comp2 = new Computer( 1, 5, 2 );
    let comp3 = new Computer( 3, 8, 3 );
    let comp4 = new Computer( 1, 11, 4 );
    let comp5 = new Computer( 2, 14, 5 );
    let comp6 = new Computer( 5, 15, 6 );
    let comp7 = new Computer( 8, 13, 7 );
    let comp8 = new Computer( 11, 15, 8 );
    let comp9 = new Computer( 14, 14, 9 );
    let comp10 = new Computer( 15, 11, 10 );
    let comp11 = new Computer( 13, 8, 11 );
    let comp12 = new Computer( 15, 5, 12 );
    let comp13 = new Computer( 14, 2, 13 );
    let comp14 = new Computer( 11, 1, 14 );
    let comp15 = new Computer( 8, 3, 15 );
    let comp16 = new Computer( 5, 1, 16 );

    compArr.push( comp1 );
    compArr.push( comp2 );
    compArr.push( comp3 );
    compArr.push( comp4 );
    compArr.push( comp5 );
    compArr.push( comp6 );
    compArr.push( comp7 );
    compArr.push( comp8 );
    compArr.push( comp9 );
    compArr.push( comp10 );
    compArr.push( comp11 );
    compArr.push( comp12 );
    compArr.push( comp13 );
    compArr.push( comp14 );
    compArr.push( comp15 );
    compArr.push( comp16 );

    // activates starter computers
    comp3.isActive = ACTIVE;
    comp7.isActive = ACTIVE;
    comp11.isActive = ACTIVE;
    comp15.isActive = ACTIVE;

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

    //make all the other computers active (for testing)

    // functions start here

    const activate_random = function () {
        if ( count_computers() !== compArr.length ) {
            let ran = Math.floor( Math.random() * compArr.length );
            if ( compArr[ ran ].isActive ) {
                activate_random();
            }
            else {
                // PS.debug("random number: " + ran);
                compArr[ ran ].isActive = true;
                drawComputer( ran + 1 );
            }
        }
        else {
            // PS.debug("all active\n")
        }
    };

    const drawComputer = function ( idNum ) {

        let thisComp = compArr[ idNum - 1 ];
        if ( thisComp.isActive ) {
            let x = thisComp.ltopx;
            let y = thisComp.ltopy;

            PS.alpha( x, y, OPAQUE );
            PS.alpha( x + 1, y, OPAQUE );
            PS.alpha( x, y + 1, OPAQUE );
            PS.alpha( x + 1, y + 1, OPAQUE );

            PS.color( x, y, GRAY );
            PS.color( x + 1, y, GRAY );
            PS.color( x, y + 1, GRAY );
            PS.color( x + 1, y + 1, GRAY );

            PS.border( x, y, {
                top : 4,
                left : 4,
                bottom : 0,
                right : 0
            } );
            PS.border( x + 1, y, {
                top : 4,
                left : 0,
                bottom : 0,
                right : 4
            } );
            PS.border( x, y + 1, {
                top : 0,
                left : 4,
                bottom : 24,
                right : 0
            } );
            PS.border( x + 1, y + 1, {
                top : 0,
                left : 0,
                bottom : 30,
                right : 4
            } );

            PS.borderColor( x, y, DARK_GRAY );
            PS.borderColor( x + 1, y, DARK_GRAY );
            PS.borderColor( x, y + 1, DARK_GRAY );
            PS.borderColor( x + 1, y + 1, DARK_GRAY );

            thisComp.updateColor();

        }
        // else {
        //     PS.border(x, y, 0);
        //     PS.border(x + 1, y, 0);
        //     PS.border(x, y + 1, 0);
        //     PS.border(x + 1, y + 1, 0);
        // }

    };

    const count_computers = function () {
        let activeNum = 0;
        for ( let i = 0; i < 16; i += 1 ) {
            if ( compArr[ i ].isActive ) {
                activeNum += 1;
            }
        }
        return activeNum;
    };

    const gameOver = function () {
        if ( timer ) {
            PS.timerStop( timer );
            timer = null;
        }

        PS.statusText( "Game Over! Score: " + ( counter * count_computers() ) );
        DB.send();
    };

    const isServerClicked = function ( x, y ) {
        if ( x === 9 || x === 8 ) {
            if ( y === 8 || y === 9 ) {
                return true;
            }
        }
        return false;
    };

    const make_connection = function () {
        let path;
        let prevPath;
        let tempNum;
        switch ( connCounter ) {
            case 2:
                if ( connectionPathOne ) {
                    if ( prevPathOne ) {
                        prevPath = prevPathOne[ prevPosOne ];
                        PS.gridPlane( BLUE_CONNECTION_PLANE );
                        PS.color( prevPath[ 0 ], prevPath[ 1 ], BG_COLOR );
                        PS.alpha( prevPath[ 0 ], prevPath[ 1 ], 0 );
                        tempNum = check_which_connection( prevEndPointArr[ 0 ][ 0 ], prevEndPointArr[ 0 ][ 1 ] );
                        PS.debug("prev point: " + prevEndPointArr[0][0] + prevEndPointArr[0][1]+ "tempNum1 = " +tempNum+"\n");
                        compArr[ tempNum - 1 ].isConnected = false;
                        compArr[ tempNum - 1 ].color = PS.COLOR_RED;

                        prevPosOne += 1;
                        if ( prevPosOne >= prevPathOne.length ) {
                            prevPathOne = null;
                        }
                    }

                    path = connectionPathOne[ connPositionOne ];
                    PS.gridPlane( BLUE_CONNECTION_PLANE );
                    PS.alpha( path[ 0 ], path[ 1 ], OPAQUE );
                    PS.color( path[ 0 ], path[ 1 ], CONN_BLUE );

                    connPositionOne += 1;
                    if ( connPositionOne >= connectionPathOne.length ) {
                        prevPathOne = connectionPathOne;
                        prevEndPointArr[ 0 ][ 0 ] = [endPointArr[ 0 ][ 0 ]];
                        prevEndPointArr[ 0 ][ 1 ] = [endPointArr[ 0 ][ 1 ]];
                        connectionPathOne = null;
                        PS.gridPlane( COMPUTER_PLANE );
                    }
                }
                break;
            case 3:
                if ( connectionPathTwo ) {
                    if ( prevPathTwo ) {
                        prevPath = prevPathTwo[ prevPosTwo ];
                        PS.gridPlane( RED_CONNECTION_PLANE );
                        PS.color( prevPath[ 0 ], prevPath[ 1 ], BG_COLOR );
                        PS.alpha( prevPath[ 0 ], prevPath[ 1 ], 0 );
                        tempNum = check_which_connection( prevEndPointArr[ 1 ][ 0 ], prevEndPointArr[ 1 ][ 1 ] );
                        //PS.debug("prev point: " + prevEndPointArr[1][0] + prevEndPointArr[1][1]+ "tempNum1 = " +tempNum+"\n");
                        compArr[ tempNum - 1 ].isConnected = false;
                        compArr[ tempNum - 1 ].color = PS.COLOR_RED;

                        prevPosTwo += 1;
                        if ( prevPosTwo >= prevPathTwo.length ) {
                            prevPathTwo = null;
                        }
                    }

                    path = connectionPathTwo[ connPositionTwo ];
                    PS.gridPlane( RED_CONNECTION_PLANE );
                    PS.alpha( path[ 0 ], path[ 1 ], OPAQUE );
                    PS.color( path[ 0 ], path[ 1 ], CONN_RED );

                    connPositionTwo += 1;
                    if ( connPositionTwo >= connectionPathTwo.length ) {
                        prevPathTwo = connectionPathTwo;
                        prevEndPointArr[ 1 ][ 0 ] = [endPointArr[ 1 ][ 0 ]];
                        prevEndPointArr[ 1 ][ 1 ] = [endPointArr[ 1 ][ 1 ]];
                        connectionPathTwo = null;
                        PS.gridPlane( COMPUTER_PLANE );
                    }
                }
                break;
            case 1:
                if ( connectionPathThree ) {
                    if ( prevPathThree ) {
                        prevPath = prevPathThree[ prevPosThree ];
                        PS.gridPlane( GREEN_CONNECTION_PLANE );
                        PS.color( prevPath[ 0 ], prevPath[ 1 ], BG_COLOR );
                        PS.alpha( prevPath[ 0 ], prevPath[ 1 ], 0 );
                        tempNum = check_which_connection( prevEndPointArr[ 2 ][ 0 ], prevEndPointArr[ 2 ][ 1 ] );
                        //PS.debug("prev point: " + prevEndPointArr[2][0] + prevEndPointArr[2][1]+ "tempNum1 = " +tempNum+"\n");
                        compArr[ tempNum - 1 ].isConnected = false;
                        compArr[ tempNum - 1 ].color = PS.COLOR_RED;

                        prevPosThree += 1;
                        if ( prevPosThree >= prevPathThree.length ) {
                            prevPathThree = null;
                        }
                    }

                    path = connectionPathThree[ connPositionThree ];
                    PS.gridPlane( GREEN_CONNECTION_PLANE );
                    PS.alpha( path[ 0 ], path[ 1 ], OPAQUE );
                    PS.color( path[ 0 ], path[ 1 ], CONN_GREEN );

                    connPositionThree += 1;
                    if ( connPositionThree >= connectionPathThree.length ) {
                        prevPathThree = connectionPathThree;
                        prevEndPointArr[ 2 ][ 0 ] = [endPointArr[ 2 ][ 0 ]];
                        prevEndPointArr[ 2 ][ 1 ] = [endPointArr[ 2 ][ 1 ]];
                        connectionPathThree = null;
                        PS.gridPlane( COMPUTER_PLANE );
                    }
                }
                break;
            default:
                DB.send(); // *BM* make sure this happens soon in the game
                break;
        }

    };

    const check_which_connection = function ( x, y ) {
        // PS.debug("given x: " + x + " Given Y: " + y +"\n");
        let num;
        if ( x == 2 && y == 2 || x == 3 && y == 2 ||
            x == 2 && y == 3 || x == 3 && y == 3 ) {
            num = 0;
        }
        else if ( x == 1 && y == 5 || x == 2 && y == 5 ||
            x == 1 && y == 6 || x == 2 && y == 6 ) {
            num = 1;
        }
        else if ( x == 3 && y == 8 || x == 4 && y == 8 ||
            x == 3 && y == 9 || x == 4 && y == 9 ) {
            num = 2;
        }
        else if ( x == 1 && y == 11 || x == 2 && y == 11 ||
            x == 1 && y == 12 || x == 2 && y == 12 ) {
            num = 3;
        }
        else if ( x == 2 && y == 14 || x == 3 && y == 14 ||
            x == 2 && y == 15 || x == 3 && y == 15 ) {
            num = 4;
        }
        else if ( x == 5 && y == 15 || x == 6 && y == 15 ||
            x == 5 && y == 16 || x == 6 && y == 16 ) {
            num = 5;
        }
        else if ( x == 8 && y == 13 || x == 9 && y == 13 ||
            x == 8 && y == 14 || x == 9 && y == 14 ) {
            num = 6;
        }
        else if ( x == 11 && y == 15 || x == 12 && y == 15 ||
            x == 11 && y == 16 || x == 12 && y == 16 ) {
            num = 7;
        }
        else if ( x == 14 && y == 14 || x == 15 && y == 14 ||
            x == 15 && y == 15 || x == 15 && y == 15 ) {
            num = 8;
        }
        else if ( x == 15 && y == 11 || x == 16 && y == 11 ||
            x == 15 && y == 12 || x == 16 && y == 12 ) {
            num = 9;
        }
        else if ( x == 13 && y == 8 || x == 14 && y == 8 ||
            x == 13 && y == 9 || x == 14 && y == 9 ) {
            num = 10;
        }
        else if ( x == 15 && y == 5 || x == 16 && y == 5 ||
            x == 15 && y == 6 || x == 16 && y == 6 ) {
            num = 11;
        }
        else if ( x == 14 && y == 2 || x == 15 && y == 2 ||
            x == 14 && y == 3 || x == 15 && y == 3 ) {
            num = 12;
        }
        else if ( x == 11 && y == 1 || x == 12 && y == 1 ||
            x == 11 && y == 2 || x == 12 && y == 2 ) {
            num = 13;
        }
        else if ( x == 8 && y == 3 || x == 9 && y == 3 ||
            x == 8 && y == 4 || x == 9 && y == 4 ) {
            num = 14;
        }
        else if ( x == 5 && y == 1 || x == 6 && y == 1 ||
            x == 5 && y == 2 || x == 6 && y == 2 ) {
            num = 15;
        }
        else {
            num = 99;
            PS.debug( "error\n" );
        }
        // PS.debug("comp #" + (num+1) + " identified\n");
        return num + 1;
        // compArr[num].isConnected = true;
        // PS.debug("comp " + (num+1) + " is connected\n");

    };

    const checks_for_connections = function () {
        for ( let i = 0; i <= 2; i++ ) {
            if ( endPointArr[ i ][ 0 ] !== 99 && endPointArr[ i ][ 1 ] !== 99 ) {
                if ( successConnectionX === endPointArr[ i ][ 0 ] && successConnectionY === endPointArr[ i ][ 1 ] ||
                    successConnectionX === endPointArr[ i ][ 0 ] && successConnectionY === endPointArr[ i ][ 1 ] - 1 ||
                    successConnectionX === endPointArr[ i ][ 0 ] && successConnectionY === endPointArr[ i ][ 1 ] + 1 ||
                    successConnectionX === endPointArr[ i ][ 0 ] + 1 && successConnectionY === endPointArr[ i ][ 1 ] ||
                    successConnectionX === endPointArr[ i ][ 0 ] + 1 && successConnectionY === endPointArr[ i ][ 1 ] - 1 ||
                    successConnectionX === endPointArr[ i ][ 0 ] + 1 && successConnectionY === endPointArr[ i ][ 1 ] + 1 ||
                    successConnectionX === endPointArr[ i ][ 0 ] - 1 && successConnectionY === endPointArr[ i ][ 1 ] ||
                    successConnectionX === endPointArr[ i ][ 0 ] - 1 && successConnectionY === endPointArr[ i ][ 1 ] - 1 ||
                    successConnectionX === endPointArr[ i ][ 0 ] - 1 && successConnectionY === endPointArr[ i ][ 1 ] + 1 ) {
                    drawingConnection = false;
                    PS.statusText( "Computer already connected!" );
                }
            }
        }
    };

    const connection_handler = function () {
        counter += 1;
        countdown -= 1;
        if ( countdown === 0 ) {
            activate_random();
            countdown = 200;
        }
        PS.statusText( "Score = " + counter + " x" + count_computers() );
        make_connection();
        for ( let o = 0; o < compArr.length; o++ ) {
            if ( compArr[ o ].isActive ) {
                compArr[ o ].updateColor();
            }
        }
    };

    const loggedIn = function () {
        PS.gridPlane( SERVER_PLANE );
        PS.alpha( 8, 8, OPAQUE );
        PS.alpha( 8, 9, OPAQUE );
        PS.alpha( 9, 8, OPAQUE );
        PS.alpha( 9, 9, OPAQUE );

        PS.color( 8, 8, SERVER_GRAY );
        PS.color( 8, 9, SERVER_GRAY );
        PS.color( 9, 8, SERVER_GRAY );
        PS.color( 9, 9, SERVER_GRAY );

        PS.gridPlane( COMPUTER_PLANE );

        for ( let o = 1; o < 17; o++ ) {
            drawComputer( o );
        }

        // -----------------------------------------------------to check active statuses
        // for (let i = 0; i < compArr.length; i++) {
        //     PS.debug("the comp id is: " + compArr[i].id +", active status is " + compArr[i].isActive+"\n");
        // }

        timer = PS.timerStart( TICKS, connection_handler );
        // PS.debug("endpoint array b1:" + endPointArr[0][0] + " " +endPointArr[0][1] +"\n");
        // PS.debug("endpoint array r2:" + endPointArr[1][0] + " " +endPointArr[1][1] +"\n");
        // PS.debug("endpoint array g3:" + endPointArr[2][0] + " " +endPointArr[2][1] +"\n");

    };

    //---------------------------------------------------(return)
    return {
        init : function () {
            //PS.debug( "PS.init() called\n" );
            PS.gridSize( GRID_X, GRID_Y );
            PS.statusText( "Prototype" );
            PS.gridColor( GRAY );
            PS.gridPlane( BG_PLANE );
            PS.color( PS.ALL, PS.ALL, BG_COLOR );
            PS.border( PS.ALL, PS.ALL, 0 );

            DB.active( false );
            DB.init( "lostConnections", loggedIn );

            // PS.debug("endpoint array b1:" + endPointArr[0][0] + " " +endPointArr[0][1] +"\n");
            // PS.debug("endpoint array r2:" + endPointArr[1][0] + " " +endPointArr[1][1] +"\n");
            // PS.debug("endpoint array g3:" + endPointArr[2][0] + " " +endPointArr[2][1] +"\n");
        },
        touch : function ( x, y ) {
            //PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

            testCondition = false;

            if ( isServerClicked( x, y ) ) {
                drawingConnection = true;

                startConnectionX = x;
                startConnectionY = y;
                // PS.debug( "server clicked\n");
                // PS.debug("x = " + startConnectionX + ", y = " + startConnectionY + ".\n");
            }
        },
        release : function ( x, y ) {
            // PS.debug( "PS.release() @ " + x + ", " + y + "\n" );
            let colorReleasedOn = PS.color( x, y );
            if ( drawingConnection ) {
                successConnectionX = x;
                successConnectionY = y;

                checks_for_connections();

                if ( colorReleasedOn !== BG_COLOR && drawingConnection ) {
                    let extracted;
                    PS.statusText( "Prototype" );
                    switch ( connCounter ) {
                        case 1:
                            endPointArr[ 0 ] = [x, y];
                            connPositionOne = 0;
                            prevPosOne = 0;
                            connectionPathOne = PS.line( startConnectionX, startConnectionY, successConnectionX, successConnectionY );
                            extracted = check_which_connection( successConnectionX, successConnectionY );
                            compArr[ extracted - 1 ].isConnected = true;
                            compArr[ extracted - 1 ].color = PS.COLOR_GREEN;
                            // PS.debug("comp " + (extracted) + " is connected\n");
                            break;
                        case 2:
                            endPointArr[ 1 ] = [x, y];
                            connPositionTwo = 0;
                            prevPosTwo = 0;
                            connectionPathTwo = PS.line( startConnectionX, startConnectionY, successConnectionX, successConnectionY );
                            extracted = check_which_connection( successConnectionX, successConnectionY );
                            compArr[ extracted - 1 ].isConnected = true;
                            compArr[ extracted - 1 ].color = PS.COLOR_GREEN;
                            // PS.debug("comp " + (extracted) + " is connected\n");
                            break;
                        case 3:
                            endPointArr[ 2 ] = [x, y];
                            connPositionThree = 0;
                            prevPosThree = 0;
                            connectionPathThree = PS.line( startConnectionX, startConnectionY, successConnectionX, successConnectionY );
                            extracted = check_which_connection( successConnectionX, successConnectionY );
                            compArr[ extracted - 1 ].isConnected = true;
                            compArr[ extracted - 1 ].color = PS.COLOR_GREEN;
                            // PS.debug("comp " + (extracted) + " is connected\n");
                            break;
                    }
                    // PS.debug("endpoint array b1:" + endPointArr[0][0] + " " +endPointArr[0][1] +"\n");
                    // PS.debug("endpoint array r2:" + endPointArr[1][0] + " " +endPointArr[1][1] +"\n");
                    // PS.debug("endpoint array g3:" + endPointArr[2][0] + " " +endPointArr[2][1] +"\n");
                    check_which_connection( successConnectionX, successConnectionY );

                    if ( connCounter === 3 ) {
                        connCounter = 1;
                        //PS.debug("counter is " + connCounter + "\n");
                    }
                    else if ( connCounter !== 3 ) {
                        connCounter++;
                        // PS.debug("counter is " + connCounter + "\n");
                    }
                    else {
                        PS.debug( "connection counter problem" );
                        PS.debug( "connection counter is " + connCounter + "\n" );
                    }
                }
            }
            // PS.debug("color here is " + colorReleasedOn + "\n");
            // PS.debug("Connection dropped at " + x + ", " + y + "\n");

            testCondition = true;
            drawingConnection = false;
        },
        shutdown : function () {
            DB.send();
        }
    };

}() );

PS.init = G.init;
PS.touch = G.touch;
PS.release = G.release;
PS.shutdown = G.shutdown;











