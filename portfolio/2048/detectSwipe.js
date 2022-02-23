var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
var minimumDragDistance = 65;

document.getElementById("gameBoard").addEventListener("touchstart", function(e){
    
    e = e || this.window.event;
    window.event.preventDefault();
    x1 = e.targetTouches[0].clientX;
    y1 = e.targetTouches[0].clientY;

    document.ontouchend = calculateMoveDirection;
    document.ontouchmove = logXY;
},{passive: false},);

function logXY(e) {
    e = e || window.event;
    x2 = e.targetTouches[0].clientX;
    y2 = e.targetTouches[0].clientY;
}

function calculateMoveDirection() {
    if(numberofActiveTileWorkers.active === 0 && newGame.movesAvailable() === true){
        if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
            if (x1 < x2 && Math.abs(x1 - x2) >= minimumDragDistance) {
                newGame.MoveTile("right");
            }
            if (x1 > x2 && Math.abs(x1 - x2) >= minimumDragDistance) {
                newGame.MoveTile("left");
            }
        } else if (Math.abs(x1 - x2) < Math.abs(y1 - y2)) {
            if (y1 < y2 && Math.abs(y1 - y2) >= minimumDragDistance) {
                newGame.MoveTile("down");
            }
            if (y1 > y2 && Math.abs(y1 - y2) >= minimumDragDistance) {
                newGame.MoveTile("up");
            }
        }
        x1 =0; y1 = 0; x2 = 0; y2 = 0;
        window.event.ontouchend = null;
        window.event.ontouchmove = null;
    }
}