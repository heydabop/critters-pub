document.querySelector("#hello").onclick = function(){
    //chrome.tabs.create({url: "http://google.com"});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var current = tabs[0];
        chrome.tabs.executeScript(current.id, {file: "jquery.min.js"}, function(){});
        chrome.tabs.executeScript(current.id, {file: "nomnom.js"}, function(){});
        chrome.tabs.executeScript(current.id, {code: "go_do()"}, function(){});
    });
}
