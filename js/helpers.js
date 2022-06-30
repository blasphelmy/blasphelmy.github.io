function stickyContact(){
    var contactBlockElement = document.getElementById("contactsBlock");
    var dummyBlock = document.getElementsByClassName("dummy")[0];
    var navMenuHeight = document.getElementById("navWrapper").offsetHeight;
    if(this.window.scrollY >= navMenuHeight && window.innerWidth > 1100 && !contactBlockElement.classList.contains("fixContactBlock")){
          setTimeout(() => {
           contactBlockElement.classList.remove("KFfadeout");
           contactBlockElement.classList.add("KFfadein"); 
           setTimeout(() => {
            contactBlockElement.classList.remove("KFfadein")
           }, 75);
        }, 75);
        dummyBlock.style.display = "block";
        contactBlockElement.classList.add("fixContactBlock", "KFfadeout");
    }else if(this.window.scrollY < navMenuHeight && contactBlockElement.classList.contains("fixContactBlock")){
        setTimeout(() => {
           contactBlockElement.classList.remove("KFfadeout");
           contactBlockElement.classList.add("KFfadein"); 
           setTimeout(() => {
            contactBlockElement.classList.remove("KFfadein")
           }, 75);
        }, 75);
        dummyBlock.style.display = "none";
        contactBlockElement.classList.remove("fixContactBlock");
        contactBlockElement.classList.add("KFfadeout");
    }else if(window.innerWidth <= 1100){
        try{
            contactBlockElement.classList.remove("fixContactBlock");
        }catch{
            
        }
    }
}
function stickyMenu(){
    
}
function sendMail(){
    var subjectText = document.getElementsByName("emailSubject")[0].value;
    var bodyText = document.getElementsByName("emailBody")[0].value;
    window.open('mailto:dhnguyen08@student.rtc.edu?subject=' + subjectText + '&body=' +  bodyText);
}