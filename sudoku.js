


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


window.onload = function() {
		renderMatrix(viewMatrix);
		thread = new Worker('Brutef.js');
	};



	viewMatrix = Matrix9x9;



function renderMatrix(matrix){
	var rowNr=0;
	var columnNr=0;
	$('<table class="sudoTable"></table>').append();
	matrix.forEach(function(array){
		columnNr=0;
		rowNr++;
			$('#tableDiv').append('<tr class="row Nr-'+(rowNr).toString()+'"></tr>');
		array.forEach(function(e){
			columnNr++
$('.Nr-'+rowNr).append('<td>'+ matrix[rowNr-1][columnNr-1] +'</td>');
			
		
 		},this)
	},this)
}   
 
    
   
function startBruteForce(){
	
	thread.postMessage(viewMatrix);
}

onmessage=function(sudoku){
	renderMatrix(sudoku.matrix);
}