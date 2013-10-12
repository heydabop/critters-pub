var oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
    'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
    'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
    'consumer_key': 'anonymous',
    'consumer_secret': 'anonymous',
    'scope': 'https://www.googleapis.com/auth/userinfo.email',
    'app_name': 'Critters'
});

chrome.browserAction.onClicked.addListener(function(tab) {
    oauth.authorize(function(){});
});
