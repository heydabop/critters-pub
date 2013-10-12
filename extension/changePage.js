document.querySelector("#hello").onclick = function(){
    //chrome.tabs.create({url: "http://google.com"});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var current = tabs[0];
        chrome.tabs.executeScript(current.id, {file: "inject.js"}, function(){});
        //alert(current.url);
    });
}
