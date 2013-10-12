chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "nomnom.js"});
});
/*
var oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
    'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
    'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
    'consumer_key': 'anonymous',
    'consumer_secret': 'anonymous',
    'scope': 'https://www.googleapis.com/auth/userinfo.email',
    'app_name': 'Critters'
});

function useEmail(resp, xhr){
    var email = JSON.parse(resp).data.email;
    alert(email);
};

function onAuthorized(){
    var url = 'https://www.googleapis.com/userinfo/email'
    var request = {
        'method': 'GET',
        'parameters': {'alt': 'json'}
    };
    oauth.sendSignedRequest(url, useEmail, request);
};
*/
