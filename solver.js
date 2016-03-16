var Matrix9x9 = [ [ 0, 2, 0, 0, 0, 9, 0, 0, 6 ],
                  [ 0, 1, 3, 0, 5, 4, 0, 0, 0 ],
                  [ 0, 0, 5, 0, 0, 8, 0, 0, 0 ], 
                  [ 1, 6, 0, 0, 0, 3, 8, 0, 0 ],
                  [ 8, 0, 0, 0, 0, 0, 0, 0, 3 ], 
                  [ 0, 0, 4, 7, 0, 0, 0, 5, 1 ],
                  [ 0, 0, 0, 8, 0, 0, 6, 0, 0 ], 
                  [ 0, 0, 0, 4, 3, 0, 7, 8, 0 ],
                  [ 4, 0, 0, 9, 0, 0, 0, 1, 0 ] ];

var matrixWrongduplicatesRow = [ [ 0, 2, 0, 0, 0, 9, 0, 0, 6 ],
                  [ 0, 1, 3, 0, 5, 4, 0, 0, 0 ],
                  [ 0, 0, 5, 0, 0, 8, 0, 0, 0 ], 
                  [ 1, 6, 0, 0, 0, 3, 8, 0, 0 ],
                  [ 8, 0, 0, 0, 0, 0, 0, 0, 3 ], 
                  [ 0, 0, 4, 7, 0, 0, 0, 5, 1 ],
                  [ 0, 0, 0, 8, 0, 8, 6, 0, 0 ], 
                  [ 0, 0, 0, 4, 3, 0, 7, 8, 0 ],
                  [ 4, 0, 0, 9, 0, 0, 0, 1, 0 ] ];

var matrixWrongduplicatesQuadrant = [ [ 0, 2, 0, 0, 0, 9, 0, 0, 6 ],
                                 [ 2, 1, 3, 0, 5, 4, 0, 0, 0 ],
                                 [ 0, 0, 5, 0, 0, 8, 0, 0, 0 ], 
                                 [ 1, 6, 0, 0, 0, 3, 8, 0, 0 ],
                                 [ 8, 0, 0, 0, 0, 0, 0, 0, 3 ], 
                                 [ 0, 0, 4, 7, 0, 0, 0, 5, 1 ],
                                 [ 0, 0, 0, 8, 0, 0, 6, 0, 0 ], 
                                 [ 0, 0, 0, 4, 3, 0, 7, 8, 0 ],
                                 [ 4, 0, 0, 9, 0, 0, 0, 1, 0 ] ];

var getQuadrant = function(row,column,matrix){
	
	var arr = [];
	row = row * 3;
	column=column*3;
	for(var i=row; i<row+3;i++){		
		arr.push(matrix[i].slice(column,column+3));
	}
	return arr;
}

var createSudoku = function(m) {
	matrixComplete=[];
	
	m.forEach(function(matrixArray) {
		var arr=[];
		matrixArray.forEach(function(matrixElement) {	
			arr.push(matrixElement);
		});
		matrixComplete.push(arr);
	});
	
	return {
		matrix : this.matrixComplete,
		getDimensions : function() {
			return this.matrix.length;
		},
		NW:	function(){ return getQuadrant(0,0,this.matrix)},
		N:	function(){ return getQuadrant(0,1,this.matrix)},
		NE:	function(){ return getQuadrant(0,2,this.matrix)},
		W:	function(){ return getQuadrant(1,0,this.matrix)},
		C:	function(){ return getQuadrant(1,1,this.matrix)},
		E:	function(){ return getQuadrant(1,2,this.matrix)},
		SW:	function(){ return getQuadrant(2,0,this.matrix)},
		S:	function(){ return getQuadrant(2,1,this.matrix)},
		SE:	function(){ return getQuadrant(2,2,this.matrix)},
		quadrants: function(){
			return [this.NW(),this.N(),this.NE(),this.W(),this.C(),this.E(),this.SW(),this.S(),this.SE()];
		}
		
		};
}

function hasDuplicatesInSingleRows(matrix){
	var row= -1;
	console.log(matrix);
	matrix.forEach(function(array){
		row++
		for(var i = 0; i < array.length-1;i++){
			if(array[i] === 0){
				continue;
			}
			for(var j = i+1; j<array.length;j++){
				if(array[i] === array[j]){
			
					return true;	
				}
			}
		}
		
	})
	console.log("no duplicates");
	return false;
}

function hasDuplicateInQuadrant(matrix){
	console.log("no duplicates");
	var arr=[];
	matrix.forEach(function(array){
		arr = array.concat(arr);

	});
		for(var i = 0; i < arr.length-1;i++){
			if(arr[i] === 0){
				continue;
			}
			for(var j = i+1; j<arr.length;j++){
				if(arr[i] === arr[j]){
					console.log( "columns:",i,"and",j );
					return true;	
				}
			}
		}
		
	return false;		
	}
	

function transpose(array){
	var arrayLength = array[0].length;
    var newArray = [];
    for(var i = 0; i < array[0].length; i++){
        newArray.push([]);
    };
   
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < arrayLength; j++){
            newArray[j].push(array[i][j]);
        };
    };
    return(newArray);
}

function isCorrect(sudoku){
	console.log(sudoku.matrix,transpose(sudoku.matrix));
	if(!hasDuplicatesInSingleRows(sudoku.matrix) && !hasDuplicatesInSingleRows(transpose(sudoku.matrix))){
	
		sudoku.quadrants().forEach(function(quadrant){
			
			if(hasDuplicateInQuadrant(quadrant)){
								
			}
			
		})
	}
	return false;
}

function bruteForce(sudoku){
	
	var newSudoku = addRandom(sudoku);
	console.log(newSudoku);
	if(isDone(newSudoku)){
		return sudoku;
	}
	if(isCorrect(newSudoku())){
		console.log(newSudoku());
		return bruteForce(newSudoku);
	}
	console.log("unsolvable");
	return false;
	
	
}

function addRandom(sudoku){
	var row= -1;
	sudoku.matrix.forEach(function(array){
		row++
		for(var i = 0; i < array.length-1;i++){
			if(array[i] === 0){		
				array[i]= Math.floor(Math.random() * (10 - 1)) + 1;
				
			}
			
			
		}
		
	});
	return sudoku;
}

function isDone(sudoku){
console.log("isDone sudoku",sudoku, sudoku.matrix);

	if(isCorrect(sudoku.matrix)){
		sudoku.matrix.forEach(function(array){
			if(array.indexOf(0) > -1){
				return false;
			}
		})
	}
	return true;
}
