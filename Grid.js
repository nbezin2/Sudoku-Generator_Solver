class Grid {
	constructor(pad) {
		this.positions = new Array(9);
		this.selectedP = [-1, -1];
		
		for (var r = 0; r < 9; r++) {
			this.positions[r] = new Array(9);
			for (var c = 0; c < 9; c++) {
				this.positions[r][c] = new Position(r, c, pad);
			}
		}
		
	}
	
	getPosition(r, c) {
		return this.positions[r][c];
	}
	
	resetPerms() {
		for (var r=0; r<9; r++) {
			for (var c=0; c<9; c++) {
				this.positions[r][c].PVal(false);
			}
		}
	}
	
	setVal(r, c, n) {
		if (this.positions[r][c].getPermVal() == false) {
			this.positions[r][c].setVal(n);
		}
	}
	
	setGridVal(r, c, n) {
		this.positions[r][c].setPermVal(n);
	}
	
	getSelectedP() {
		return this.selectedP;
	}
	
	selectP(r, c) {
		
		if (this.selectedP[0] != -1) {
			this.positions[this.selectedP[0]][this.selectedP[1]].setSelect();
			if (r != -1) {
				this.positions[r][c].setSelect();
			}
			this.selectedP = [r, c];
		}
		else {
			if (r != -1) {
				this.positions[r][c].setSelect();
			}
			this.selectedP = [r, c];
		}
	}
	
	show() {
		for (var r = 0; r < 9; r++) {
			for (var c = 0; c < 9; c++) {
				this.positions[r][c].show();				
			}
		}
		
	}
	
}