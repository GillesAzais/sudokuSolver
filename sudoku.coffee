if Meteor.isClient
  Matrix9x9 = [
    [
      0
      2
      0
      0
      0
      9
      0
      0
      6
    ]
    [
      0
      1
      3
      0
      5
      4
      0
      0
      0
    ]
    [
      0
      0
      5
      0
      0
      8
      0
      0
      0
    ]
    [
      1
      6
      0
      0
      0
      3
      8
      0
      0
    ]
    [
      8
      0
      0
      0
      0
      0
      0
      0
      3
    ]
    [
      0
      0
      4
      7
      0
      0
      0
      5
      1
    ]
    [
      0
      0
      0
      8
      0
      0
      6
      0
      0
    ]
    [
      0
      0
      0
      4
      3
      0
      7
      8
      0
    ]
    [
      4
      0
      0
      9
      0
      0
      0
      1
      0
    ]
  ]
  matrixWrongduplicatesRow = [
    [
      0
      2
      0
      0
      0
      9
      0
      0
      6
    ]
    [
      0
      1
      3
      0
      5
      4
      0
      0
      0
    ]
    [
      0
      0
      5
      0
      0
      8
      0
      0
      0
    ]
    [
      1
      6
      0
      0
      0
      3
      8
      0
      0
    ]
    [
      8
      0
      0
      0
      0
      0
      0
      0
      3
    ]
    [
      0
      0
      4
      7
      0
      0
      0
      5
      1
    ]
    [
      0
      0
      0
      8
      0
      8
      6
      0
      0
    ]
    [
      0
      0
      0
      4
      3
      0
      7
      8
      0
    ]
    [
      4
      0
      0
      9
      0
      0
      0
      1
      0
    ]
  ]
  matrixWrongduplicatesQuadrant = [
    [
      0
      2
      0
      0
      0
      9
      0
      0
      6
    ]
    [
      2
      1
      3
      0
      5
      4
      0
      0
      0
    ]
    [
      0
      0
      5
      0
      0
      8
      0
      0
      0
    ]
    [
      1
      6
      0
      0
      0
      3
      8
      0
      0
    ]
    [
      8
      0
      0
      0
      0
      0
      0
      0
      3
    ]
    [
      0
      0
      4
      7
      0
      0
      0
      5
      1
    ]
    [
      0
      0
      0
      8
      0
      0
      6
      0
      0
    ]
    [
      0
      0
      0
      4
      3
      0
      7
      8
      0
    ]
    [
      4
      0
      0
      9
      0
      0
      0
      1
      0
    ]
  ]

getQuadrant = (row, column, matrix) ->
  arr = []
  row = row * 3
  column = column * 3
  i = row
  while i < row + 3
    arr.push matrix[i].slice(column, column + 3)
    i++
  arr

createSudoku = (m) ->
  matrixComplete = []
  m.forEach (matrixArray) ->
    arr = []
    matrixArray.forEach (matrixElement) ->
      arr.push matrixElement
      return
    matrixComplete.push arr
    return
  {
    matrix: @matrixComplete
    getDimensions: ->
      @matrix.length
    NW: ->
      getQuadrant 0, 0, @matrix
    N: ->
      getQuadrant 0, 1, @matrix
    NE: ->
      getQuadrant 0, 2, @matrix
    W: ->
      getQuadrant 1, 0, @matrix
    C: ->
      getQuadrant 1, 1, @matrix
    E: ->
      getQuadrant 1, 2, @matrix
    SW: ->
      getQuadrant 2, 0, @matrix
    S: ->
      getQuadrant 2, 1, @matrix
    SE: ->
      getQuadrant 2, 2, @matrix
    quadrants: ->
      [
        @NW()
        @N()
        @NE()
        @W()
        @C()
        @E()
        @SW()
        @S()
        @SE()
      ]

  }

hasDuplicatesInSingleRows = (matrix) ->
  bool = false
  #console.log(matrix, " isCorrect()");
  row = -1
  #console.log(matrix);
  matrix.some (array) ->
    row++
    #console.log(array);
    i = 0
    while i < array.length - 1
      if array[i] == 0
                i++
        continue
      j = i + 1
      while j < array.length
        if array[i] == array[j]
          #console.log("duplicates found in single row check");
          return bool = true
        j++
      i++
    return
  bool

hasDuplicateInQuadrant = (matrix) ->
  arr = []
  matrix.forEach (array) ->
    arr = array.concat(arr)
    return
  i = 0
  while i < arr.length - 1
    if arr[i] == 0
            i++
      continue
    j = i + 1
    while j < arr.length
      if arr[i] == arr[j]
        #console.log( "DUPLICATES FOUND: ","columns:",i,"and",j );
        return true
        return
      j++
    i++
  #console.log("no duplicates in quadrants check");
  false

transpose = (array) ->
  `var i`
  #console.log(array);
  arrayLength = array[0].length
  newArray = []
  i = 0
  while i < array[0].length
    newArray.push []
    i++
  i = 0
  while i < array.length
        j = 0
    while j < arrayLength
      newArray[j].push array[i][j]
      j++
    i++
  newArray

isCorrect = (sudoku) ->
  bool = false
  #console.log(sudoku.matrix, " isCorrect()");
  if !hasDuplicatesInSingleRows(sudoku.matrix) and !hasDuplicatesInSingleRows(transpose(sudoku.matrix))
    sudoku.quadrants().forEach (quadrant) ->
      if !hasDuplicateInQuadrant(quadrant)
        #console.log('sudoku is correct');
        bool = true
      else
        bool = false
  bool
  

		bruteForce = (sudoku, history) ->
		  #TODO: check comment
		
		  ###
		   check if correct, if yes   --> check zeros. If no zero present   --> complete;
		   check if correct, if yes   --> check zeros. If zeros present     --> continue bruteforce with same sudoku;
		   check if correct, if no    --> go back to previous configuration and continue bruteforcing;
		
		  ###
		
		  bool = false
		  currentRecursiveHistory = history
		  uncheckedSudos = addNext(sudoku)
		  uncheckedSudos.some ((sudoku) ->
		    if isCorrect(sudoku)
		      currentRecursiveHistory.push sudoku
		      if isFull(sudoku)
		        #console.log(sudoku);
		        bool = sudoku
		        return true
		      else
		        console.log sudoku
		        try
		          return bool = bruteForce(sudoku, currentRecursiveHistory)
		        catch e
		    else
		      console.log sudoku
		      sudoku = currentRecursiveHistory.pop()
		      try
		        return bool = bruteForce(sudoku, currentRecursiveHistory)
		      catch e
		    return
		  ), this
		  bool

addNext = (sudoku) ->
  uncheckedSudokus = []
  row = -1
  sudoku.matrix.some (array) ->
    row++
    i = 0
    while i < array.length - 1
      if array[i] == 0
                i2 = 1
        while i2 < 10
          clone = jQuery.extend(true, {}, sudoku)
          array[i] = i2
          uncheckedSudokus.push clone
          i2++
        return true
      i++

    ######

    return
  uncheckedSudokus

isFull = (sudoku) ->
  bool = true
  if isCorrect(sudoku)
    sudoku.matrix.every (array) ->
      #console.log(array);
      if array.indexOf(0) > -1
        #console.log('sudoku is incomplete, continue bruteforce');
        return bool = false
      return
  #   if(bool){
  #    viewMatrix = sudoku.matrix;
  #    Blaze.remove(template);
  #    template = Blaze.render(Blaze.With(function () {
  #        //console.log(sudoku.matrix === Matrix9x9);
  #        return sudoku.matrix;
  #    },function(){return Template.sudo}),$('.sudoDiv')[0]);
  #
  #    //console.log('sudoku is complete, ending bruteforce');
  #
  #    }
  bool

  viewMatrix = Matrix9x9
  Meteor.startup ->
    template = Blaze.render(Blaze.With((->
      viewMatrix = Matrix9x9
      viewMatrix
    ), ->
      Template.sudo
    ), $('.sudoDiv')[0])
    return
  Template.sudo.helpers sudoku: ->
    viewMatrix
  Template.run.events 'click #run': (event) ->
    matr = Matrix9x9
    bruteForce createSudoku(matr), []
    Blaze.remove template
    Blaze.render Blaze.With((->
      matr
    ), ->
      Template.sudo
    ), $('.sudoDiv')[0]
    return

onmessage = (sudoku) ->
  viewMatrix = sudoku.matrix
  Blaze.remove template
  template = Blaze.render(Blaze.With((->
    #console.log(sudoku.matrix === Matrix9x9);
    sudoku.matrix
  ), ->
    Template.sudo
  ), $('.sudoDiv')[0])
  return

# ---
# generated by js2coffee 2.1.0