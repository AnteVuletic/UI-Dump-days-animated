let hamburger = document.querySelector(".navigation__hamburger");
let navbar = document.querySelector(".navbar");
let title = document.getElementById("animateSlide");
let titleHeader = document.getElementById("tittleAnimate");
const HEADER_TEXT = [" developera"," marketingaša"," poduzetnika"," digitalaca"," dizajnera"];

hamburger.addEventListener("click",(event)=>{
    navbar.classList.toggle("navbar--show");
    hamburger.classList.toggle("navigation__hamburger--clicked");
});

document.addEventListener("scroll", (event)=>{
    if(window.pageYOffset !== 0)
        navbar.classList.add("navbar--scrolled");
    else
        navbar.classList.remove("navbar--scrolled");

    if(window.pageYOffset >= getCoords(title).top)
        title.querySelectorAll(".text__tittle").forEach((element,index)=>{
            element.classList.add("text__tittle--inbound");
        });
    else
        title.querySelectorAll(".text__tittle").forEach((element,index)=>{
            element.classList.remove("text__tittle--inbound");
        });
});

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top - clientTop;
    var left = box.left - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}


const executeElementTypingRecursive = (functionToExecute, executionNumber) =>{
    if(executionNumber){
        functionToExecute(HEADER_TEXT[HEADER_TEXT.length - executionNumber]);
        setTimeout(()=>{
            executeElementTypingRecursive(functionToExecute,executionNumber-1);
        },100  * HEADER_TEXT[HEADER_TEXT.length - executionNumber].length + 5200);
    }
}
const executeElementTyping = (element) =>{
    let headerText = document.createElement("span");
    headerText.classList.add("tittle__blue");
    titleHeader.append(headerText);
    let div = document.createElement("div");
    let textNode = document.createElement("span");
    div.classList.add("cursor");
    headerText.append(textNode);
    headerText.append(div);
    const addElement = (executionNumber) =>{
        textNode.innerText += element[element.length-executionNumber];
    }
    const removeElements = (executionNumber) =>{
        let insertingText = "";
        for(let i = 0; i < executionNumber; i++){
            insertingText += element[i];
        }
        textNode.innerText = insertingText;
    }
    const recursiveRemove = (functionToRemove,lengthToRemove) =>{
        if(lengthToRemove){
            functionToRemove(lengthToRemove);
            setTimeout(function(){
                recursiveRemove(functionToRemove,lengthToRemove-1)
            },100);
        }
    }
    const recursiveExecution = (functionToAdd,functionToRemove,executionNumber,lengthOfArray) =>{
        if(executionNumber){
            functionToAdd(executionNumber);
            setTimeout(function(){
                recursiveExecution(functionToAdd,functionToRemove,executionNumber-1,lengthOfArray)
            },100);
        }
        else{
            div.classList.remove("cursor");
            div.classList.add("cursor--flashing");
            setTimeout(function(){
                div.classList.add("cursor");
                div.classList.remove("cursor--flashing");
                recursiveRemove(functionToRemove,lengthOfArray);
            },3000);
        }
    };
    recursiveExecution(addElement,removeElements,element.length,element.length);
    setTimeout(()=>{            
        div.classList.remove("cursor");
        div.classList.add("cursor--flashing");
    },200  * element.length + 3000);
    setTimeout(()=>{
        titleHeader.removeChild(headerText);
    },200 *element.length+4000);
};
let executionTime = 0;
HEADER_TEXT.forEach(element =>{
    executionTime += 200 * element.length + 4000;
});
executeElementTypingRecursive(executeElementTyping,HEADER_TEXT.length);
setInterval(()=>{
    executeElementTypingRecursive(executeElementTyping,HEADER_TEXT.length);
},executionTime);