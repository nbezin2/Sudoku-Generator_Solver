var grid;
var pad = 5;
var gStart = pad*30;
var gEnd = gStart+(30*9);
var solveB, newB, modeB, eModeB, mModeB, hModeB, mode;

var gridVals;
var checkGridVals;
var solved = false;
var load = "";

function setup() {
	// put setup code here
	createCanvas(windowWidth,windowHeight);
	gridVals = new Array(9);
	grid = new Grid(pad); //Parameter is a padding for drawing the grid. It gets multiplied by 30
	mode = 0;
	newGame();
	solveB = createButton("Solve");
	newB = createButton("New Game");
	modeB = createButton("Mode");
	solveB.mousePressed(solveGame);
	newB.mousePressed(newGame);
	modeB.mousePressed(changeMode);
	
}

function draw() {
	//put drawing code here
	background(255);
	grid.show();
	
	addDarkLines();
	
	solveB.position(20, 20);
	newB.position(20, 40);
	modeB.position(20, 60);
	
}

function addDarkLines() {
	strokeWeight(3);
	line(gStart, gStart, gEnd, gStart);
	line(gStart, gEnd, gEnd, gEnd);
	line(gStart, gStart+90, gEnd, gStart+90);
	line(gStart, gStart+180, gEnd, gStart+180);
	
	line(gStart, gStart, gStart, gEnd);
	line(gEnd, gStart, gEnd, gEnd);
	line(gStart+90, gStart, gStart+90, gEnd);
	line(gStart+180, gStart, gStart+180, gEnd);
	strokeWeight(1);
}

function checkLegalMove(r, c, n) {
	if (r != -1) {
		for (var i =0; i<9; i++) {
			if (grid.getPosition(r, i).getVal() == n || grid.getPosition(i, c).getVal() == n) {
				return false;
			}
		}
		
		var y3 = Math.floor(r/3); //which row of the 3x3 grids are we checking
		var x3 = Math.floor(c/3); //which column of the 3x3 grid are we checking
		for (var i=0; i < 3; i++) {
			for (var j=0; j < 3; j++) {
				if (grid.getPosition(i+(3*y3),j+(3*x3)).getVal() == n) {
					return false;
				}			
			}
		}
		return true;
	}
	return false;
}

function keyPressed() {
	if (keyCode == BACKSPACE) {
		if (grid.getSelectedP()[0] != -1) {
			grid.setVal(grid.getSelectedP()[0],grid.getSelectedP()[1], 0);
		}
	}
}

function keyTyped() {
	if (key == 1 || key == 2 || key == 3 || key == 4 || key == 5 ||
		key == 6 || key == 7 || key == 8 || key == 9) {
		var num = key;
		if (grid.getSelectedP()[0] != -1) {
			if (checkLegalMove(grid.getSelectedP()[0], grid.getSelectedP()[1], num)) {
				grid.setVal(grid.getSelectedP()[0],grid.getSelectedP()[1], num);
			}
		}
	}
}

function mousePressed() {
	if (mouseX >= gStart && mouseY >= gStart && mouseX <= gEnd && mouseY <= gEnd) {
		r = Math.floor((mouseY-gStart)/30);
		c = Math.floor((mouseX-gStart)/30);
		grid.selectP(c,r);
	}
	else {
		grid.selectP(-1, -1);
	}
}

function displaySolution() {
	for (var i=0; i < 9; i++) {
		for (var j=0; j < 9; j++) {
			grid.setGridVal(i,j,gridVals[i][j]);
		}
	}
}

function fillGrid() {
	var numFill;
	if (mode == 0) {
		numFill = 5;
	}
	else if (mode == 1) {
		numFill = 3;
	}
	else {
		numFill = 3;
	}
	
	for (var i=0; i<9; i++) {
		for (var j=0; j<numFill; j++) {
			var rPos = Math.floor(Math.random() * 9);
			if (gridVals[i][rPos] == 0) {
				for (var n=0;n<9;n++) {
					var rNum = Math.floor((Math.random() * 9)+1);
					if (possible(i, rPos, rNum)) {
						gridVals[i][rPos] = rNum;
						grid.setGridVal(i,rPos,gridVals[i][rPos]);
						break;
					}
				}
			}
		}
	}
}

function setUpGridVals() {
	gridVals = new Array(9);
	for (var i = 0; i < 9; i++) {
		gridVals[i] = new Array(9);
		for (var j = 0; j < 9; j++) {
			gridVals[i][j] = 0;
			grid.resetPerms();
			grid.setVal(i,j,gridVals[i][j]);
			solvedBoard = null;
		}
	}
	fillGrid();
}

function possible(r,c,n) {
	if (r != -1) {
		for (var i =0; i<9; i++) {
			if (gridVals[r][i] == n || gridVals[i][c] == n) {
				return false;
			}
		}
		
		var y3 = Math.floor(r/3); //which row of the 3x3 grids are we checking
		var x3 = Math.floor(c/3); //which column of the 3x3 grid are we checking
		for (var i=0; i < 3; i++) {
			for (var j=0; j < 3; j++) {
				if (gridVals[i+(3*y3)][j+(3*x3)] == n) {
					return false;
				}			
			}
		}
		return true;
	}
	return false;
}

function sudokuSolve() {
	
	//loop through grid looking for empty space
	for (var i=0; i < 9; i++) {
		for (var j=0; j < 9; j++) {
			if (gridVals[i][j] == 0) {
				for (var n = 1; n < 10; n++) {
					if (possible(i, j, n)) {
						gridVals[i][j] = n;
						sudokuSolve();
						if (!solved) {
							gridVals[i][j] = 0;
						}
					}
				}
				return;
			}
		}
	}
	
	solved = true;
}

function solveGame() {
	sudokuSolve();
	displaySolution();
}

function newGame() {
	grid.resetPerms();
	setUpGridVals();
	solved = false;
	checkGridVals = gridVals;
	sudokuSolve();
	if (solved) {
		solved = false;
		gridVals = checkGridVals;
	}
	else {
		load += ".";
		if (load.length > 5) {
			load = "";
		}
		text(load, gEnd-150, gEnd+15);
		newGame();
	}
}

function changeMode() {
	eModeB = createButton("Easy");
	mModeB = createButton("Medium"); 
	hModeB = createButton("Hard"); 
	
	eModeB.position(20, 80);
	mModeB.position(65, 80);
	hModeB.position(127, 80);
	
	eModeB.mousePressed(modeEas);
	mModeB.mousePressed(modeMed);
	hModeB.mousePressed(modeHar);
}

function modeEas() {
	mode = 0;
	
	eModeB.remove();
	mModeB.remove();
	hModeB.remove();
	newGame();
}

function modeMed() {
	mode = 1;
	
	eModeB.remove();
	mModeB.remove();
	hModeB.remove();
	newGame();
}

function modeHar() {
	mode = 2;
	
	eModeB.remove();
	mModeB.remove();
	hModeB.remove();
	newGame();
}


