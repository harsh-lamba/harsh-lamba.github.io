function googlesigninCallback(authResult) {
    if (authResult['status']['signed_in']) {
        gapi.client.load('plus', 'v1', function () {

            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });

            request.execute(function (resp) {
                var id = resp.id;
                var fname = resp.name.givenName;
                var lname = resp.name.familyName;
                if (resp.emails != undefined) {
                    var email = resp.emails[0].value;
                    $("input#EmailAddress").val(email);
                    $("input#UserName").val(email);
                }
                $("input#FirstName").val(fname);
                $("input#LastName").val(lname);
            });
        });
        
    } 
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1555562148022968',
        xfbml: true,
        version: 'v2.2'
    });
};

function onLinkedInAuth() {
    IN.UI.Authorize().params({ "scope": ["r_basicprofile", "r_emailaddress"] }).place();
    IN.API.Profile("me").fields("id,firstName,lastName,emailAddress")
      .result(function (me) {
          var profile = me.values[0];
          var id = profile.id;
          var firstName = profile.firstName;
          var lastName = profile.lastName;
          var email = profile.emailAddress;

          $("input#FirstName").val(firstName);
          $("input#LastName").val(lastName);
          $("input#EmailAddress").val(email);
          $("input#UserName").val(email);
      });
}

function render() {
    gapi.signin.render('customBtn', {
        'callback': 'googlesigninCallback',
        'clientid': '679403284257-rpgquavb9jrn18n8etlfldvo041jo3c5.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'requestvisibleactions': 'https://schema.org/AddAction',
        'scope': 'https://www.googleapis.com/auth/plus.login email'
    });
}


function fb_login() {
    FB.login(function (response) {

        if (response.authResponse) {
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function (response) {
                $("input#FirstName").val(response.first_name);
                $("input#LastName").val(response.last_name);
                $("input#EmailAddress").val(response.email);
                $("input#UserName").val(response.email);
            });

        } 
    }, {
        scope: 'public_profile,email'
    });
}
(function () {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());