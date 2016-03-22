/**
 * 
 */
if('function' === typeof importScripts){

importScripts("underscore.js");
};

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
};

function hasDuplicatesInSingleRows(matrix){
    var bool = false;
    //console.log(matrix, " isCorrect()");
    var row= -1;
    //console.log(matrix);
    matrix.some(function(array){
        row++;
        //console.log(array);
        for(var i = 0; i < array.length-1;i++){
            if(array[i] === 0){
                continue;
            }
            for(var j = i+1; j<array.length;j++){
                if(array[i] === array[j]){
                    //console.log("duplicates found in single row check");

                    return  bool = true;

                }
            }
        }

    });
    return bool;
}

function hasDuplicateInQuadrant(matrix){

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
                //console.log( "DUPLICATES FOUND: ","columns:",i,"and",j );
                return true;
                return;
            }
        }
    }
    //console.log("no duplicates in quadrants check");
    return false;
}


function transpose(array){
    //console.log(array);
    var arrayLength = array[0].length;
    var newArray = [];
    for(var i = 0; i < array[0].length; i++){
        newArray.push([]);
    }

    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < arrayLength; j++){
            newArray[j].push(array[i][j]);
        }
    }
    return(newArray);
}

function isCorrect(sudoku){
    var bool = false;
    //console.log(sudoku.matrix, " isCorrect()");
    if(!hasDuplicatesInSingleRows(sudoku.matrix) && !hasDuplicatesInSingleRows(transpose(sudoku.matrix))){
    	
        sudoku.quadrants().forEach(function(quadrant){

            if(!hasDuplicateInQuadrant(quadrant)){
                //console.log('sudoku is correct');

               return bool = true;

            }else{
                return bool = false;
            }

        })

    }

    return bool;
}

function bruteForce(sudoku,history){
	//console.log('runing');
//TODO: check comment
/*
 check if correct, if yes   --> check zeros. If no zero present   --> complete;
 check if correct, if yes   --> check zeros. If zeros present     --> continue bruteforce with same sudoku;
 check if correct, if no    --> go back to previous configuration and continue bruteforcing;

    */
	
	var bool = false;
	var currentRecursiveHistory = history;
	
	var uncheckedSudos = addNext(sudoku);
	//console.log(uncheckedSudos);
	uncheckedSudos.some(function(sudoku){
		
		if(isCorrect(sudoku)){
			currentRecursiveHistory.push(sudoku);
	    	   if(isFull(sudoku)){
	    	   //console.log(sudoku);
	    	   bool = sudoku;
	    	   return true;
	    	   
	       }else{
	    	   //console.log(sudoku);
	    	   try{return bool = bruteForce(sudoku,currentRecursiveHistory);
	    	   }catch(e){
	    		   
	    	   }
	    	   
	       }
	        	
	    }else{
	    	//console.log(sudoku);
	    	sudoku = currentRecursiveHistory.pop();
	    	 try{return bool = bruteForce(sudoku,currentRecursiveHistory);
	    	   }catch(e){
	    		   
	    	   }
	    	}
	},this);

  return bool;


}

function addNext(sudoku){
    
  uncheckedSudokus =[];
    var row= -1;
    var deepClone=[];
    sudoku.matrix.some(function(array){
        row++;
      
        for(var i = 0; i<array.length-1; i++){
            if(array[i] == 0){
            	for(var i2 = 1; i2<10; i2++){
            		
            		array[i]=i2;
            		deepClone.push(array.slice(0));
                    
            	}
            	console.log(deepClone);
                
               return true;

            }
            
        }
      
     
    },this);
    console.log(deepClone);
   
    uncheckedSudokus.push(deepClone);
    console.log("unchecked",uncheckedSudokus);
    return uncheckedSudokus;
}

function isFull(sudoku){

    var bool = true;
    if(isCorrect(sudoku)){
        sudoku.matrix.every(function(array){
            //console.log(array);
            if(array.indexOf(0) > -1){
                //console.log('sudoku is incomplete, continue bruteforce');
                return bool = false;
            }
        })
    }

    return bool;
}

self.onmessage = function(e){
	//console.log(e.data);
	var sudoku = createSudoku(e.data);
	bruteForce(sudoku, []);
}


function deepCloneMatrix(matrix){
	var deepClone = [];
	matrix.forEach(function(array){
		deepClone.push(array.slice(0));
	},this);
	return deepClone;
}

