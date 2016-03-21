if (Meteor.isClient) {

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
    console.log(matrix, " isCorrect()");
    var row= -1;
    console.log(matrix);
    matrix.some(function(array){
        row++;
        console.log(array);
        for(var i = 0; i < array.length-1;i++){
            if(array[i] === 0){
                continue;
            }
            for(var j = i+1; j<array.length;j++){
                if(array[i] === array[j]){
                    console.log("duplicates found in single row check");

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
                console.log( "DUPLICATES FOUND: ","columns:",i,"and",j );
                return true;
                return;
            }
        }
    }
    console.log("no duplicates in quadrants check");
    return false;
}


function transpose(array){
    console.log(array);
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
    console.log(sudoku.matrix, " isCorrect()");
    if(!hasDuplicatesInSingleRows(sudoku.matrix) && !hasDuplicatesInSingleRows(transpose(sudoku.matrix))){

        sudoku.quadrants().foreach(function(quadrant){

            if(!hasDuplicateInQuadrant(quadrant)){
                console.log('sudoku is correct');

               return bool = true;

            }else{
                return bool = false;
            }

        })

    }

    return bool;
}
//TODO: add Array to save configurations;
function bruteForce(sudoku){
//TODO: check comment
/*
 check if correct, if yes   --> check zeros. If no zero present   --> complete;
 check if correct, if yes   --> check zeros. If zeros present     --> continue bruteforce with same sudoku;
 check if correct, if no    --> go back to previous configuration and continue bruteforcing;

    */

    var newSudoku = addRandom(sudoku);

    if(isDone(newSudoku)){
        return sudoku;
    }
    if(isCorrect(newSudoku)){
        console.log(newSudoku);
        return bruteForce(newSudoku);
    }
    console.log("unsolvable");
    return false;


}

function addRandom(sudoku){
    console.log(sudoku, "addrandom");
    var row= -1;
    sudoku.matrix.forEach(function(array){
        row++;
        for(var i = 0; i < array.length-1;i++){
            if(array[i] === 0){
                array[i]= Math.floor(Math.random() * (10 - 1)) + 1;

                break;

            }
        }
       /* viewMatrix = sudoku.matrix;
        Blaze.remove(template);
        template = Blaze.render(Blaze.With(function () {
            console.log(sudoku.matrix === Matrix9x9);

            return sudoku.matrix;
        },function(){return Template.sudo}),$('.sudoDiv')[0]);*/
    });
    return sudoku;
}

function isDone(sudoku){

    var bool = true;
    if(isCorrect(sudoku)){
        sudoku.matrix.every(function(array){
            console.log(array);
            if(array.indexOf(0) > -1){
                console.log('sudoku is incomplete, continue bruteforce');
                return bool = false;
            }
        })
    }
    if(bool){


    viewMatrix = sudoku.matrix;
    Blaze.remove(template);
    template = Blaze.render(Blaze.With(function () {
        console.log(sudoku.matrix === Matrix9x9);
        return sudoku.matrix;
    },function(){return Template.sudo}),$('.sudoDiv')[0]);

    console.log('sudoku is complete, ending bruteforce');

    }
    return bool;
}


viewMatrix = Matrix9x9;

    Meteor.startup(function() {
      template = Blaze.render(Blaze.With(function () {

            viewMatrix = Matrix9x9;
          return viewMatrix;

        },function(){return Template.sudo}),$('.sudoDiv')[0]);
    });

    Template.sudo.helpers({
        sudoku: function () {

            return viewMatrix;
        }

    });
    Template.run.events(
        {
            'click #run': function (event) {
                var matr = Matrix9x9;
                bruteForce(createSudoku(matr));
                Blaze.remove(template);
                Blaze.render(Blaze.With(function () {
                    return matr;
                },function(){

                    return Template.sudo}),$('.sudoDiv')[0]);


            }
        });
}