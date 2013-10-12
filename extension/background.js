var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key': 'anonymous',
  'consumer_secret': 'anonymous',
  'app_name': 'Critters'
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: "http://google.com/"});
    //oauth.authorize(function(){});
});
