chrome.browserAction.onClicked.addListener(function(activeTab){
    var newUrl = "inventory.html";
    chrome.tabs.create({url: newUrl});
});
