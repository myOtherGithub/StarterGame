/*
Boards
when user reaches end goal, board is scrapped, and new board object is created with given parameters.
This allows for future reorganization to procedurally generated levels. This object is also in charge 
of generation of “unpassable” blocks, where player can go, and cannot (this will be loaded via image or text). 
This will also be drawn from the upper left corner, and to move the screen right this object will simply go left. 
*/

function Board(blockSize){
	this.blockScale = blockSize;

//this function simply draws the board from the array of vector positions given, and the blockSize scales*/

	this.drawWhatsSeen = function(positionArray){
		for(var i=0; i<positionArray.length; i++){
   			rect(positionArray[i].x[0],positionArray[i].y[0],this.blockScale,this.blockScale)
   		}
	}

//This function loads in the positions based on the string given

	this.loadPositions = function(string, levelNumber){
		var positionnumber=0;
		this.positions = [];
		var rawblocks = createBoardFromString(string, levelNumber);
		var levelheight = rawblocks.length;
		var levelwidth = rawblocks[0].length;

		for(var k =0; k<levelheight; k++){ //for each string in the blocks array
			for(var m=0; m<levelwidth; m++){ //bust it open and iterate through its contents converting _ and os to vertexes
				if(rawblocks[k][m] == "o"){
					this.positions[positionnumber] = new p5.Vector([m*this.blockScale],[k*this.blockScale]);
					positionnumber++;
				}
			}
		}
		return this.positions;
	}

//This parses the string given to the load positions function. Figured this wouldnt be needed to be called outside of board. 

	function createBoardFromString(stringArray, levelNumber) {
		var string="";
		for(currentString=0; currentString<stringArray.length; currentString++){
			string = string+stringArray[currentString]; //we turn the string into one large string
		}
		var allLevels = string.split("&_n");
		var currentLevel = allLevels[levelNumber].split("&*l"); //split metadata from board
		return currentLevel[1].split("]"); //split parts of the board
	}
}
