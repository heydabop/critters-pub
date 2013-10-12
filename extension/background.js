chrome.browserAction.onClicked.addListener(function(activeTab){
    var newUrl = "http://google.com/";
    chrome.tabs.create({url: newUrl});
});
