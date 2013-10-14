window.addEventListener("message", receiveMessage, false);

function receiveMessage(event){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var current = tabs[0];
        chrome.tabs.executeScript(current.id, {file: "jquery.min.js"}, function(){
	    chrome.tabs.executeScript(current.id, {file: "nomnom.js"}, function(){
		chrome.tabs.executeScript(current.id, {code: "go_do('" + event.data + "')"}, function(){});
	    });
	});        
    });
}
