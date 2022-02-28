//sound effects must be defined outside of class.
var validMove = new Howl({
    src: ['moveboard.mp3']
  });
// var invalidMove = new Howl({
//     src: [''];
// });

class gameBoard {
    // defaultArray;
    gameArray;
    memoryLane;
    score;
    boardSize;
    requiredStreak;
    numOfRandomTilesPerMove;
    movedTileList;
    hiScore;
    tileSize;
    constructor(size) {
        size = parseInt(size); //we parse size as an int
        // size = 10;
        this.boardSize = size; //setting up basic tile size and difficulty configuration based on boardsize. tile size is in pixels.
        if (this.boardSize <= 4) {
            this.requiredStreak = 2;
            this.numOfRandomTilesPerMove = 1;
            this.tileSize = 102;
        } else if (this.boardSize == 5) {
            this.requiredStreak = 2;
            this.numOfRandomTilesPerMove = 2;
            this.tileSize = 82;
        } else if (this.boardSize == 6) {
            this.requiredStreak = 2;
            this.numOfRandomTilesPerMove = 3;
            this.tileSize = 68;
        } else if (this.boardSize == 7) {
            this.requiredStreak = 2;
            this.numOfRandomTilesPerMove = 3;
            this.tileSize = 58;
        } else {
            this.requiredStreak = 4;
            this.numOfRandomTilesPerMove = 5;
            this.tileSize = 58;
        }
        this.createGameElements(size);
        // this.gameArray[0][0] = 1024;
        // this.gameArray[1][0] = 2048;
        // this.gameArray[2][0] = 131072;
        // this.gameArray[3][0] = 65536;
        // this.gameArray[0][0] = 16384;
        // this.gameArray[0][0] = 32768;
        //now we create starting tiles
        this.newRandomTile();
        //and we display the game matrix to the newly created gameboard.
        this.displayArray();
        this.displayHighScore(); //displays high score to score tracker
    }
    createGameElements(size) {
        this.score = 0; //setting internal score tracker to 0
        document.getElementById("scoreTracker").innerText = "Score: " + this.score; //setting score tracker to zero
        this.gameArray = new Array(size); //creates a new game matrix based on input size
        
        //we are setting up the required css to complete the grid for gameboard
        let element = document.getElementById("gameBoard");
        element.style.setProperty('grid-template-columns', "repeat(" + size + ", minmax(0," + this.tileSize + "px))");
        element.style.setProperty('grid-template-rows', "repeat(" + size + ", minmax(0," + this.tileSize + "px))");

        //resets the gameboard in case another one already exists
        element.innerHTML = "";
        //cell, tile and matrix values init
        for (let i = 0; i < size; i++) {
            this.gameArray[i] = new Array(size);
            for (let j = 0; j < size; j++) {
                //set game matrix to zero
                this.gameArray[i][j] = 0;
                //cellid = example (row = 8, col 3) = 83
                let cellID = `${i}${j}`;

                //tile container holds a cell which holds the value of this cell's matrix in a paragraph tag
                //create tile
                let tileContainer = document.createElement("tileContainer");
                tileContainer.id = "tileContainer" + cellID;
                tileContainer.style.height = this.tileSize - 10 + "px";
                tileContainer.style.width = this.tileSize - 10 + "px";

                //create cell
                let cell = document.createElement("div");
                cell.id = cellID;
                cell.classList.add("tile");
                cell.style.height = this.tileSize - 9 + "px";
                cell.style.width = this.tileSize - 9 + "px";

                //paragragh creation. i should've probably generated a unique id for this as well. would have made some work later on easier. oh well.
                let dataNode = document.createElement("p");

                //after we create the ness. elements, we append
                cell.appendChild(dataNode);
                tileContainer.appendChild(cell);
                element.appendChild(tileContainer);
            }
        }
    }
    calculateScore(value) { //accepts in tile value then calculate score earned (tileValue * requiredstreak), updates internal score and scoreboard, then returns the total 
        this.score = this.score + (value * this.requiredStreak); //score earned (tileValue * requiredStreak)
        document.getElementById("scoreTracker").innerText = "Score: " + this.score;
        return value * this.requiredStreak;
    }
    scoreAnimate(moveTotal){ //accepts the sum of a move's total earned score
        var id = null;
        //initital top and right position precalculated for 100px and 0px
        var top = 100;
        var right = 0;
        var offsetIncrements = 1; //pixels moved per interval
        var element = document.getElementById("floatingText"); //target of this animation, which is the element floatingtext
        element.innerText = "+" + moveTotal; //setting innter text to moveTotal
        clearInterval(id);//clearing interval in case there is an interval already occuring
        
        id = setInterval(animateScore, 5); //set interval

        function animateScore(){ //move element down 55px
            if(top >= 155){ 
                element.innerText = "";
                element.style.top = 100 + "px";
                element.style.right = 0 + "px";
                clearInterval(id);
            }else{
                if(top <= 155){ //this if else corrects for overshoots in pixel increments per interval. its a nice check to have but not needed
                    if(top <= (155 - 25)){ //if halfway over
                        right = right - .06; //we shift element to the left 
                    }else{ //we shift element to the right
                        right = right + .06; 
                    }
                    top = top + offsetIncrements; //we shift element down
                }else{
                    top = 155;
                }
                //here we set elements calculated positions
                element.style.top = top + "px"; 
                element.style.right = right + "px";
            }
        }
    }
    displayHighScore(){
        //if there isnt a highscore stored for this baord size, then we set one equals to zero
        if(this.getCookie(this.boardSize)===null){
            this.setCookie(this.boardSize,0);
        }
        //if there isn't a highest tile achieved for this board size, then we set one equal zero.
        if(this.getCookie(("highestTile" + this.boardSize)) === null){
            this.setCookie(("highestTile" + this.boardSize),this.getMaxTileSize());
        }

        //we retrieve the high score and highest acheived tile for this boardsize
        var highestTile = this.getCookie("highestTile" + this.boardSize);
        var currentHighScore = this.getCookie(this.boardSize);

        //if fetched cookie is greater than any tile in this game's array, then we set the high tile display to fetched cookie
        if (highestTile >= this.getMaxTileSize()) {
            document.getElementById("highestTile").innerText = "Highest Tile Achieved: " + highestTile;
        }
        else {
            this.setCookie(("highestTile" + this.boardSize),this.getMaxTileSize());
            document.getElementById("highestTile").style.color = "rgb(206, 94, 50)";
            document.getElementById("highestTile").innerText = "Highest Tile Achieved: " + this.getCookie("highestTile" + this.boardSize);
        }

        //if the fetched cookie is greater than the high score then set the highscore board to cookie, else we update the high score board to internal score
        if(this.score <= currentHighScore){
            document.getElementById("hiScore").innerText = "High Score: " + this.getCookie(this.boardSize);
        }else{
            this.setCookie(this.boardSize,this.score);
            document.getElementById("hiScore").style.color = "rgb(206, 94, 50)";
            document.getElementById("hiScore").innerText = "High Score: " + this.score;
        }
    }
    displayArray() { //displays this game's matrix to gameBoard. 
        for (let row = 0; row < this.gameArray.length; row++) {
            for (let col = 0; col < this.gameArray[0].length; col++) {//gets ALL element from gameboard and resets them to blank. right now this game's matrix is out of sync with display
                let cellID = `${row}${col}`;
                var element = document.getElementById(cellID);
                element.innerHTML = "<p></p>"; //i cant think around this. so yikes, this is messy
                element.style.setProperty("background-color", "");
                element.style.setProperty("color", "black");
                element.style.setProperty("left", "0px");
                element.style.setProperty("top", "0px");
                element.innerHTML = "<p></p>";
                element.classList.remove("active");
                
                if (this.gameArray[row][col] != 0) {
                    element.classList.add("active");
                    element.innerHTML = "<p>" + this.gameArray[row][col] + "</p>";
                    this.setTileColor(this.gameArray[row][col], element);
                    this.setTileFontSize(element, row, col);
                }
            }
        }
    }
    setTileFontSize(element, row, col){ //set numbers font size to not overflow out of tiles. these are preset numbers, could probably do it a little more algorithmically. oh well
        element.firstChild.style.fontSize = 35 + "px"; //accepts an element, and row and column to point to a location in this game's array
            if(this.boardSize == 4){ //did i forget to parse size as an int? where?
                if(this.gameArray[row][col] > 9999){
                    element.firstChild.style.fontSize = 30 + "px";
                }
            }else if(this.boardSize == 5){
                if(this.gameArray[row][col] < 999){
                    element.firstChild.style.fontSize = 30 + "px";
                }else if(this.gameArray[row][col] < 9999){
                    element.firstChild.style.fontSize = 25 + "px";
                }else if(this.gameArray[row][col] < 99999){
                    element.firstChild.style.fontSize = 22 + "px";
                }else if(this.gameArray[row][col] < 999999){
                    element.firstChild.style.fontSize = 20 + "px";
                }
            }else if(this.boardSize == 6){
                if(this.gameArray[row][col] < 999){
                    element.firstChild.style.fontSize = 25 + "px";
                }else if(this.gameArray[row][col] < 9999){
                    element.firstChild.style.fontSize = 20 + "px";
                }else if(this.gameArray[row][col] < 99999){
                    element.firstChild.style.fontSize = 18 + "px";
                }else if(this.gameArray[row][col] < 999999){
                    element.firstChild.style.fontSize = 16 + "px";
                }
            }else if(this.boardSize == 7){
                if(this.gameArray[row][col] < 999){
                    element.firstChild.style.fontSize = 22 + "px";
                }else if(this.gameArray[row][col] < 9999){
                    element.firstChild.style.fontSize = 18 + "px";
                }else if(this.gameArray[row][col] < 99999){
                    element.firstChild.style.fontSize = 15 + "px";
                }else if(this.gameArray[row][col] < 999999){
                    element.firstChild.style.fontSize = 13 + "px";
                }
        }
    } //sets tile color, accepts a tile value, and the corrosponding element
    setTileColor(value, element) {
        switch (value) {
            case 2:
                element.style.setProperty("background-color", "#eee4da"); //jquery might like make this look nice.
                break;
            case 4:
            case 6:
                element.style.setProperty("background-color", "#eee1c9");
                break;
            case 8:
            case 18:
                element.style.setProperty("background-color", "#f3b27a");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 16:
            case 54:
                element.style.setProperty("background-color", "#f69664");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 32:
            case 162:
                element.style.setProperty("background-color", "#33AD56");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 64:
            case 486:
                element.style.setProperty("background-color", "#3EC13E");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 128:
            case 1458:
                element.style.setProperty("background-color", "#32a8a4");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 256:
            case 4374:
                element.style.setProperty("background-color", "#3292a8");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 512:
            case 13122:
                element.style.setProperty("background-color", "#ba2f2f");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 1024:
            case 39366:
                element.style.setProperty("background-color", "#db2370");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 2048:
                element.style.setProperty("background-color", "#b825b8");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 4096:
                element.style.setProperty("background-color", "#FF4DBB");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 8192:
                element.style.setProperty("background-color", "#d6006b");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 16384:
                element.style.setProperty("background-color", "#CC33FF");
                element.style.setProperty("color", "#f9f6f2");
                break;
            case 32768:
                element.style.setProperty("background-color", "#525252");
                element.style.setProperty("color", "#f9f6f2");
                break;
            default:
                element.style.setProperty("background-color", "#525252");
                element.style.setProperty("color", "#f9f6f2");
        }
    }
    newRandomTile() { //what I should've done was push the empty tiles into a stack then randomly pick from them
        let numEmptyTiles = 0;
        for (let row = 0; row < this.gameArray.length; row++) {
            for (let col = 0; col < this.gameArray[row].length; col++) {
                if (this.gameArray[row][col] === 0) {
                    numEmptyTiles++;
                }
            }
        }
        for (let i = 0; i < numEmptyTiles && i < this.numOfRandomTilesPerMove; i++) {
            var row = this.getRandomInt(this.gameArray.length);
            var col = this.getRandomInt(this.gameArray.length);
            while (this.gameArray[row][col] != 0) {
                row = this.getRandomInt(this.gameArray.length);
                col = this.getRandomInt(this.gameArray.length);
            }

            var cellID = row + "" + col;
            this.gameArray[row][col] = Math.pow(2, this.getRandomInt_Ceil(2));
            document.getElementById(cellID).style.background = "#f7e1cd";
            document.getElementById(cellID).classList.add("active");
            document.getElementById(cellID).innerHTML = "<p>" + this.gameArray[row][col] + "</p>";
            this.setTileFontSize(document.getElementById(cellID), row, col);
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    getRandomInt_Ceil(max) {
        return Math.ceil(Math.random() * max);
    }
    MoveTile(direction) {
        var gameArray = this.gameArray;
        // this.displayArray();
        if (direction === "left") {
            // console.log(this.gameArray);
            this.flowLeft(gameArray, false);
        } else if (direction === "right") {
            // console.log(this.gameArray);
            this.flowRight(gameArray, false);
        } else if (direction === "down") {
            // console.log(this.gameArray);
            this.flowDown(gameArray, false);
        } else if (direction === "up") {
            // console.log(this.gameArray);
            this.flowUp(gameArray, false);
        }
        validMove.play();
        this.displayHighScore();
    }
    actuateTile(x1, y1, x2, y2) { //accepts two coordinates, and the element to animate
        var cellID = `${x1}${y1}`;
        var targetCellID = `${x2}${y2}`;
        var endTileValue = this.gameArray[x2][y2];
        var sourceTile = document.getElementById(cellID);
        var endTile = document.getElementById(targetCellID);
        var gameArray = this.gameArray;
        

        if (y1 === y2) {
            var offsetY = this.tileSize * (x2 - x1);
        } else if (x1 === x2) {
            var offsetX = this.tileSize * (y2 - y1);
        }
        var id = null;
        var interval = 0;
        var offsetIncrements = 7;
        var top = 0;
        var left = 0;
        var scale = 1;
        var gameArray = this.gameArray;

        clearInterval(id);
        if (offsetY > 0) {
            numberofActiveTileWorkers.active++;
            id = setInterval(moveDown, interval);
        } else if (offsetY < 0) {
            numberofActiveTileWorkers.active++;
            id = setInterval(moveUp, interval);
        } else if (offsetX < 0) {
            numberofActiveTileWorkers.active++;
            id = setInterval(moveLeft, interval);
        } else if (offsetX > 0) {
            numberofActiveTileWorkers.active++;
            top = 0;
            id = setInterval(moveRight, interval);
        }
        function moveRight() {
            if (left >= offsetX) {
                sourceTile.style.top = 0 + "px";
                sourceTile.style.setProperty("transform", "scale("+ 1 +")");
                numberofActiveTileWorkers.active--;
                clearInterval(id);
            } else {

                left = left + offsetIncrements;

                if(left > (offsetX/3)*2){
                    top = top+(0.05*offsetIncrements);
                    scale = scale - .01;
                }else{
                    top = top-(0.065*offsetIncrements);
                    scale = scale+.013;
                }
                if(left >= offsetX){
                    left = offsetX;
                }
                sourceTile.style.top = top + "px";
                sourceTile.style.left = left + "px";
                sourceTile.style.setProperty("transform", "scale("+ scale +")");
            }
        }
        function moveLeft() {
            if (left <= offsetX) {
                sourceTile.style.top = 0 + "px";
                sourceTile.style.setProperty("transform", "scale("+ 1 +")");
                numberofActiveTileWorkers.active--;
                clearInterval(id);
            } else {
                left = left - offsetIncrements;
                if(left <= offsetX){
                    left = offsetX;
                }
                if(left > (offsetX/3)*2){
                    top = top-(0.05*offsetIncrements);
                    scale = scale + .01;
                }else{
                    top = top+(0.065*offsetIncrements);
                    scale = scale-.013;
                }
                sourceTile.style.top = top + "px";
                sourceTile.style.left = left + "px";
                sourceTile.style.setProperty("transform", "scale("+ scale +")");
            }
        }
        function moveUp() {
            if (top <= offsetY) {
                numberofActiveTileWorkers.active--;
                clearInterval(id);
            } else {
                top = top - offsetIncrements;
                if(top <= offsetY){
                    top = offsetY;
                }
                sourceTile.style.top = top + "px";
            }
        }
        function moveDown() {
            if (top >= offsetY) {
                numberofActiveTileWorkers.active--;
                clearInterval(id);
            } else {
                top = top + offsetIncrements;
                if(top >= offsetY){
                    top = offsetY;
                }
                sourceTile.style.top = top + "px";
            }
        }
    }
    
    flowUp(gameArray, probing) {
        //col by col, top down. if we move gameboard up, we must check each column from the top down, same for the other moves: down right left 
        var moveTotal = 0;//keeps a running total of this move's combined score
        for (var col = 0; col < gameArray[0].length; col++) {
            var streak = 1; //set initial streak at
            var index = 5; //this is effect z index. each actuated tile has a higher z-index than the previous. this ensures tiles will always "overlap" in the wanted behavior
            var memValue = "undefined" //this should change whenever we hit a tile with a different value. we start out as "undefined" since it will be more convienient
            //length gives us max size, max size - 1 gives us max starting index of gameArray 
            for (var row = 0; row < gameArray.length; row++) { //we are on the current cell
                //step 1 save current cell value to thisValue. thisValue will be useful later on.
                var thisValue = gameArray[row][col]; //we set value of current cell to thisValue 
                //step 2. ignore if zero; first, we check if current cell equals to the one before it.
                //step 2a. if not, then we reset tile streak back to one.
                if (thisValue != 0 && thisValue != memValue) { 
                    memValue = thisValue;
                    streak = 1; 
                } else if (thisValue === memValue) { //2b. if previous cell = this cell, we add to our streak.
                    streak++;
                }

                if (thisValue != 0) { //3. if current cell isn't 0, then we may proceed. else we skip this entire chain to line 521
                    let row_2 = row; //4. we do not want to mess with row, so we make a copy of it. it will also be useful information to know
                                    //for when we animate tile later
                    while (row_2 > 0 && gameArray[row_2 - 1][col] === 0) { //we check concurrent cells while zero until we hit a nonzero.
                        row_2--;
                    }

                    if (row_2 != row) { //if row_2 = row, then cell doesn't need to do anything.
                        gameArray[row_2][col] = thisValue;  //set the newfound cell position(row_2, col) to the value of the old position(row, col)
                        gameArray[row][col] = 0; //reset this current cell value
                        if(probing === true){
                            return true; //this is all we need to know if we are just probing. goodbye. else =>
                        }
                    } if (thisValue === memValue && streak === this.requiredStreak) { //if we have checked streak = streak number of cells, 
                                                                                    //that must mean there is a mean a merge is available. and thisValue === memValue should obviously always true
                        for (let index = 0; index < this.requiredStreak; index++) { //we set cells leading up to merger cell to zero.
                            gameArray[row_2 - index][col] = 0; //setting leading cells to zero.
                            if (index === this.requiredStreak - 1) { //destination cell is the final cell of the streak
                                gameArray[row_2 - index][col] = thisValue * this.requiredStreak; //set destination cell to streak required * cell value. 
                                if(probing === false){ //we only need to calculate score on an actual move. 
                                    moveTotal = moveTotal + this.calculateScore(thisValue);
                                }
                                thisValue = thisValue * this.requiredStreak; //setting up required input for tile actuation
                                row_2 = row_2 - index; //this saves destination cell
                            }
                        }
                        streak = 0;
                    }
                    if(probing === false){ //if this move isn't a probe, then we actuate the tile. this shouldn't be needed. it is a failsafe.
                        document.getElementById(row+""+col).style.zIndex = index++;
                        this.actuateTile(row, col, row_2, col);
                    }
                }

            }
        }
        if(moveTotal!=0){ 
            this.scoreAnimate(moveTotal);
        }
    }
    flowDown(gameArray, probing) {
        //top down by row, col left to right
        var moveTotal = 0;
        for (var col = 0; col < gameArray[0].length; col++) {
            var streak = 1;
            var index = 5;
            var memValue = "undefined" //this should change whenever we hit a tile with a different value
            //length gives us max size, max size - 1 gives us max starting index of gameArray 
            for (var row = gameArray.length - 1; row >= 0; row--) { //we are on the current cell

                var thisValue = gameArray[row][col]; //we set value of current cell to thisValue 

                //if zero, ignore
                if (thisValue != 0 && thisValue != memValue) {
                    memValue = thisValue;
                    streak = 1;
                } else if (thisValue === memValue) {
                    streak++;
                }

                if (thisValue != 0) {
                    let row_2 = row;
                    do {
                        row_2++;
                    } while (row_2 < gameArray.length && gameArray[row_2][col] === 0);
                    row_2--;

                    if (row_2 != row) {
                        gameArray[row_2][col] = thisValue;
                        gameArray[row][col] = 0;
                        if(probing === true){
                            return true;
                        }
                    }
                    if (thisValue === memValue && streak === this.requiredStreak) {

                        for (let index = 0; index < this.requiredStreak; index++) {
                            gameArray[row_2 + index][col] = 0;
                            if (index === this.requiredStreak - 1) {
                                gameArray[row_2 + index][col] = thisValue * this.requiredStreak;
                                // this.actuateTile(row_2, col, (row_2 + index), col, thisValue * this.requiredStreak);
                                if(probing === false){
                                    moveTotal = moveTotal + this.calculateScore(thisValue);
                                }
                                row_2 = row_2 + index;
                                thisValue = thisValue * this.requiredStreak;
                            }
                        }
                        streak = 0;
                    }
                    if(probing === false){
                        document.getElementById(row+""+col).style.zIndex = index++;
                        this.actuateTile(row, col, row_2, col);
                    }
                }
            }
        }
        if(moveTotal!=0){
            this.scoreAnimate(moveTotal);
        }
    }
    flowRight(gameArray, probing) {
        //bottom up by row, col by col
        var moveTotal = 0;
        for (var row = 0; row < gameArray.length; row++) {
            var streak = 1;
            var index = 5;
            var memValue = "undefined";
            for (var col = gameArray.length - 1; col >= 0; col--) {

                var thisValue = gameArray[row][col];

                if (thisValue != 0 && thisValue != memValue) {
                    memValue = thisValue;
                    streak = 1;
                } else if (thisValue === memValue) {
                    streak++;
                }

                if (thisValue != 0) {
                    let col_2 = col;

                    do {
                        col_2++;
                    } while (col_2 < gameArray.length && gameArray[row][col_2] === 0);
                    col_2--;

                    if (col_2 != col) {
                        gameArray[row][col_2] = thisValue;
                        gameArray[row][col] = 0;
                        if(probing === true){
                            return true;
                        }
                    }

                    if (thisValue === memValue && streak === this.requiredStreak) {

                        for (let index = 0; index < this.requiredStreak; index++) {
                            gameArray[row][col_2 + index] = 0;
                            if (index === this.requiredStreak - 1) {
                                // this.actuateTile(row, col_2, row, col_2 + index, thisValue * this.requiredStreak)
                                gameArray[row][col_2 + index] = thisValue * this.requiredStreak;
                                if(probing === false){
                                    moveTotal = moveTotal + this.calculateScore(thisValue);
                                }
                                thisValue = thisValue * this.requiredStreak;
                                col_2 = col_2 + index;
                            }
                        }
                        streak = 0;
                    }
                    if(probing === false){
                        document.getElementById(row+""+col).style.zIndex = index++;
                        this.actuateTile(row, col, row, col_2);
                    }
                }
            }
        }
        if(moveTotal!=0){
            this.scoreAnimate(moveTotal);
        }
    }
    flowLeft(gameArray, probing) {
        //bottom up by row, col by col
        var moveTotal = 0;
        for (var row = 0; row < gameArray.length; row++) {
            var streak = 1;
            var index = 5;
            var memValue = "undefined" //this should change whenever we hit a tile with a different value
            //length gives us max size, max size - 1 gives us max starting index of gameArray 
            for (var col = 0; col < gameArray[row].length; col++) { //we are on the current cell

                var thisValue = gameArray[row][col]; //we set value of current cell to thisValue 

                //if zero, ignore
                if (thisValue != 0 && thisValue != memValue) {
                    memValue = thisValue;
                    streak = 1;
                } else if (thisValue === memValue) {
                    streak++;
                }
                if (thisValue != 0) {
                    let col_2 = col;

                    do {
                        col_2--
                    } while (col_2 < gameArray.length && gameArray[row][col_2] === 0);
                    col_2++;

                    if (col_2 != col) {
                        gameArray[row][col_2] = thisValue;
                        gameArray[row][col] = 0;
                        if(probing === true){
                            return true;
                        }
                    }

                    if (thisValue === memValue && streak === this.requiredStreak) {

                        for (let index = 0; index < this.requiredStreak; index++) {
                            gameArray[row][col_2 - index] = 0;
                            if (index === this.requiredStreak - 1) {
                                // this.actuateTile(row, col_2, row, col_2 - index, thisValue * this.requiredStreak);
                                gameArray[row][col_2 - index] = thisValue * this.requiredStreak;
                                if(probing === false){
                                    moveTotal = moveTotal + this.calculateScore(thisValue);
                                }
                                col_2 = col_2 - index;
                                thisValue = thisValue * this.requiredStreak;
                            }
                        }
                        streak = 0;
                    }
                    if(probing === false){
                        document.getElementById(row+""+col).style.zIndex = index++;
                        this.actuateTile(row, col, row, col_2);
                    }
                }
            }
        }
        if(moveTotal!=0){
            this.scoreAnimate(moveTotal);
        }
    }
    returnGameArray(){
        return this.gameArray;
    }
    movesAvailable(){
        var gameArrayCopy = JSON.parse(JSON.stringify(this.gameArray)); 
        var movesAvailable = false;

        if(newGame.flowUp(gameArrayCopy, true) === true){
            return true;
        }else if(newGame.flowDown(gameArrayCopy, true) === true){
            return true;
        }else if(newGame.flowLeft(gameArrayCopy, true) === true){
            return true;
        }if(newGame.flowRight(gameArrayCopy, true) === true){
            return true;
        }
        if(this.getCookie(this.boardSize) < this.score){
            this.setCookie(this.boardSize,this.score)
        }
        this.displayHighScore();
        return movesAvailable;
    }
    getMaxTileSize(){
        var maxTile = 0;
        for(var i = 0; i < this.gameArray.length; i++){
            for(var j = 0; j < this.gameArray.length; j++){
                if(maxTile <= this.gameArray[i][j]){
                    maxTile = this.gameArray[i][j];
                }
            }
        }
        return maxTile;
    }
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    setCookie(key,value) {
        document.cookie = key + "=" + (value || "") + ";"  + "expires=Fri, 31 Dec 9999 23:59:59 GMT" + "path=/";
    }
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    returnGameSize(){
        return this.boardSize;
    }
    returnGameArray(){
        return this.gameArray;
    }
}