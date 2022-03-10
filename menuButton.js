function menuBarClick(){
  var element = document.getElementById("menuScreen");
  var menuButton = document.getElementById("menuButton");
  if(element.classList.contains("hide")){
      element.classList.remove("hide");
      element.classList.add("show");
  }else{
    element.classList.remove("show");
      element.classList.add("hide");
  }
  var id = null;
  var initRotation = 0;
  clearInterval(id);
  id = setInterval(function(){
    if(initRotation >= 180){
      // menuButton.style.setProperty("transform", "rotate("+90+"deg)");
      clearInterval(id);
    }else{
      initRotation = initRotation + 5;
      menuButton.style.setProperty("transform", "rotate("+initRotation+"deg)");
    }
  }, 8);
}