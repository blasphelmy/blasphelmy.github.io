//variable declarations
var numberofActiveTileWorkers = { //im not really sure how this works yet. I found it online and its useful for what i need to do..
        aInternal: 0,
        aListener: function (val) { },
        set active(val) {
            this.aInternal = val;
            this.aListener(val);
        },
        get active() {
            return this.aInternal;
        },
        registerListener: function (listener) {
            this.aListener = listener;
        }
}
numberofActiveTileWorkers.registerListener(function (val) {
    if (val === 0) {
        newGame.displayArray();
        newGame.newRandomTile();
        centerToParent();
        if(newGame.movesAvailable()===false){
            alert("game over :(");
    }
    }  
});

var newGame = null;
var optionSelectionElements = document.getElementsByClassName("optionCircle");


function initializeStuff(){
    if(!document.cookie){
        document.cookie = "cookieName= true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
    for(i = 0; i < optionSelectionElements.length; i++){
        optionSelectionElements[i].addEventListener('click', function(){
            createBoard(this.id);
            document.getElementById("title").style.top = 0 + "px";
            if (this.id == 4) {
                document.getElementById("title").style.fontSize = 100 + "px";
                document.getElementById("title").innerText = "2048";
            }if (this.id == 5) {
                document.getElementById("title").style.fontSize = 100 + "px";
                document.getElementById("title").innerText = "4096";
            } else if (this.id == 6) {
                document.getElementById("title").style.fontSize = 100 + "px";
                document.getElementById("title").innerText = "8192";
            } else if (this.id == 7) {
                document.getElementById("title").innerText = "16384";
                document.getElementById("title").style.fontSize = 80 + "px";
                document.getElementById("title").style.top = 20 + "px";

            } 
        });
    }
    createBoard(4);
    centerWindow();
    centerToParent();
}
function createBoard(size) {
    let w = window.innerWidth;
    fillCorrectCircle(size);
    newGame = new gameBoard(size);
    // newGame.newRandomTile();
    newGame.displayArray();
    centerWindow();
    centerToParent();
}
function centerWindow() {
    let w = window.innerWidth;
    let element = document.getElementById("wrapper");
    let elementWidth = element.getBoundingClientRect().width;
    if(w < 438){
        document.getElementsByTagName("body")[0].style.setProperty("transform", "scale(.7)");
        element.style.left = ((w - elementWidth) * .5) - (w/5.357) + "px";
    }else{
        element.style.left = ((w - elementWidth) * .5) + "px";
    }
}
function fillCorrectCircle(size){
    var optionCircles = document.getElementsByClassName("optionCircle");
    for(var index = 0; index < optionCircles.length; index++){
        optionCircles[index].classList.remove("filled");
    }
    document.getElementById(size).classList.add("filled");
}
function centerToParent(){
    var elements = document.getElementsByClassName("tile");
    for(i = 0; i < elements.length; i++){
        var firstchild = elements[i].firstElementChild;
        firstchild.style.top = ((elements[i].offsetHeight - firstchild.offsetHeight) * .5) + "px";
    }
}
window.addEventListener('keydown', function (event) {
    if(numberofActiveTileWorkers.active === 0 && newGame.movesAvailable() === true){
        if (event.keyCode === 37) {
            event.preventDefault();
            newGame.MoveTile("left");
        }else if (event.keyCode === 39) {
            event.preventDefault();
            newGame.MoveTile("right");
        }else if (event.keyCode === 40) {
            event.preventDefault();
            newGame.MoveTile("down");
        }else if (event.keyCode === 38) {
            event.preventDefault();
            newGame.MoveTile("up");
        }else{
            event.preventDefault();
        }
    }
});
window.addEventListener('resize', centerWindow);
