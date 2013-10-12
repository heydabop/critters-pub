function useEmail(resp, xhr){
    var email = JSON.parse(rep).data.email;
    alert(email);
}

function signinCallback(authResult) {
    if (authResult['access_token']) {
        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized, for example:
        document.getElementById('signinButton').setAttribute('style', 'display: none');
        document.getElementById('signoutButton').setAttribute('style', 'display: block');
        gapi.client.request({"path": "userinfo/email", "method": "GET", "callback": useEmail});
    } else if (authResult['error']) {
        // Update the app to reflect a signed out user
        // Possible error values:
        //   "user_signed_out" - User is signed-out
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatically log in the user
        console.log('Sign-in state: ' + authResult['error']);
    }
}

function signOut(){
    gapi.auth.signOut();
    document.getElementById('signinButton').setAttribute('style', 'display: block');
    document.getElementById('signoutButton').setAttribute('style', 'display: none');
}
