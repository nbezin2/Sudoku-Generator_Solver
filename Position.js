class Position {
	constructor(r, c, pad) {
		//Padding is multiplied by 30. just to keep in mind
		this.xPos = (r+pad)*30;
		this.yPos = (c+pad)*30;
		this.W = 30;
		this.H = 30;
		this.value = 0;
		this.permVal = false;
		this.selected = false;
	}
	
	getVal() {
		return this.value;
	}
	
	PVal(val) {
		this.permVal = val;
	}
	
	getPermVal() {
		return this.permVal;
	}
	
	setVal(val) {
		this.value = val;
	}
	
	setSelect() {
		if (!this.selected) {
			this.selected = true;
		}
		else {
			this.selected = false;
		}
	}
	
	setPermVal(val) {
		this.permVal = true;
		this.value = val;
	}
	
	show() {
		stroke(0);
		fill(255);
		rect(this.xPos, this.yPos, this.W, this.H);
		
		if (this.value > 0) {
			if (this.permVal) {
				textSize(20);
				fill(0);
				text(this.value, this.xPos + 9, this.yPos + 23);
			}
			else {
				textSize(20);
				fill(0,0,255);
				text(this.value, this.xPos + 9, this.yPos + 23);
			}
		}
		else {
			textSize(20);
			fill(0);
			text("", this.xPos + 9, this.yPos + 23);
		}
		
		if (this.selected) {
			fill(0, 200, 0, 60);
			rect(this.xPos, this.yPos, this.W, this.H);
		}
	}
}