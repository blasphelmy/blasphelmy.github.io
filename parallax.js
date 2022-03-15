window.addEventListener("scroll", function(){
    var element = document.getElementById("navWrapper");
    var backgroundY = 70;
    backgroundY = backgroundY + window.scrollY/15;
    if(backgroundY > 100){
        backgroundY = 100;
    }else if(backgroundY < 0){
        backgroundY = 0;
    }
    element.style.setProperty("background-position-y", backgroundY + "%");

});