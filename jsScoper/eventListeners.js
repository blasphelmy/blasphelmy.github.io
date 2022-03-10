window.addEventListener("load", function(e){
    editor = CodeMirror.fromTextArea(document.getElementById("code"), {
          firstLineNumber: 0,
          lineNumbers: true,
          theme: "material-palenight",
          matchBrackets: true,
          autoCloseBrackets: true,
          continueComments: "Enter",
          extraKeys: {"Ctrl-Q": "toggleComment"},
        });
        editor.setSize(null, 400);
        outPutEditor = CodeMirror.fromTextArea(document.getElementById("code_array"), {
          firstLineNumber: 0,
          lineNumbers: true,
          theme: "material-palenight",
          matchBrackets: true,
          autoCloseBrackets: true,
          continueComments: "Enter",
          extraKeys: {"Ctrl-Q": "toggleComment"},
        });
        outPutEditor.setSize(null, 400);
        initParse();
  });