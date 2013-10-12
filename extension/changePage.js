document.querySelector("#hello").onclick = function(){
    //chrome.tabs.create({url: "http://google.com"});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var current = tabs[0];
    alert(current);
    });
}
