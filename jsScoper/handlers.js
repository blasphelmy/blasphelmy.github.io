function functionDeclaredHandler(index, array, Frame){
  var start = index;
  var end = findEOFLine(array, index);

  console.log(array[index]);
  
  var element = document.getElementById(Frame.id + Frame.fIndex + "FunctionDef");
  var newFunctionDeclarationElement = document.createElement("p");
  newFunctionDeclarationElement.classList.add("fade-in-no-bounce");
  newFunctionDeclarationElement.innerText = "FUNCTIONDEF: " + array[index+1] + "  { start: " + (start+2) + "; end: " + end + " }";
  if(element.classList.contains("hide")){
    setTimeout(() => {
      element.classList.remove("hide");
      element.classList.add("show", "fade-in");
    }, count*defaultDelay);
    count++;
  }
  setTimeout(() => {
    element.appendChild(newFunctionDeclarationElement);
  }, count * defaultDelay);
  count++;
  
  var newFunction = new functionDEF(array[index+ 1], start+2, end);
  //console.log(newFunction);
  Frame.addFunctionDefinition(newFunction);
  return end;
}
function variableDeclarationHandler(index, array, Frame){
  if(new RegExp("=").test(array[index+1]) && (new RegExp(/(^[a-zA-Z0-9]*)+([ ]*)+([=])/gm)).test(array[index + 1])){
    var keyValuePair = array[index+1].split("=");
    keyValuePair[0] = keyValuePair[0].trim();
    if(new RegExp(/\s/gm).test(keyValuePair[0])){
      addConsoleLine("variable declaration error on line: " + index + 1);
      return;
    }
    var variableName = keyValuePair[0];
    var expression = keyValuePair[1];
    expression = expression.split(";");
    expression = evalExpression(expression[0], Frame, index+1);
    var newVarible = new variable(keyValuePair[0], eval(expression)); //cheater!
    Frame.addVariables(newVarible);
  }else if(!(new RegExp(/([0-9])+([ ]*)+([;])/gm)).test(array[index+1])){
    var keyValuePair = array[index+1].split(";");
    keyValuePair[0] = keyValuePair[0].trim();
    if(new RegExp(/\s/gm).test(keyValuePair[0])){
      addConsoleLine("variable declaration error on line: " + (index + 1));
      return;
    }
    var newVarible = new variable(keyValuePair[0], null); //cheater!
    Frame.addVariables(newVarible);
  }else{
    addConsoleLine("error on line: " + (index + 1));
    errorDetected = true;
    return;
  }
    appendVariablesToVisulizer(Frame);
  index++;
  return index;
}
function variableReassignmentHandler(index, array, Frame){
  var tempArray = array[index].split("=");
  var variableName = tempArray[0].trim();
  var expression = tempArray[1].split(";");
  if(new RegExp(/\s/gm).test(variableName)){
    addConsoleLine("variable error on line: " + (index + 1));
    return;
  }
  expression = evalExpression(expression[0], Frame, index);

  var newFrame = returnFrameContainingVariable(Frame, variableName);
  newFrame.variables.set(variableName, eval(expression));
    appendVariablesToVisulizer(newFrame);
}
function consoleLoghandler(index, array, Frame){
  var newRegex = new RegExp(/\(([^)]+)\)/gm);
  var matches = newRegex.exec(array[index]);
  expression = evalExpression(matches[1], Frame, index);
  addConsoleLine(index + "> " + eval(expression));
}
