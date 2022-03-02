// var bcrypt = require('bcrypt');

function login() {

    let user = {
         user: document.getElementById('login-username').value,
         pass: document.getElementById('login-password').value
    };

    if (user.pass.length < 6) {
        alert("Please enter password with 6 or more characters");
        return 0;
    }

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "Invalid Login") {
                alert("Invalid Login");
            }
            else {
                var response = JSON.parse(this.responseText);
                if(response[0].Role == "1") {
                    console.log("success");
                    window.location = "users/UserPages/UserCheckIn.html";
                }
                else if (response[0].Role == "2") {
                    console.log("a");
                    window.location = "users/VenuePages/VenueAccountInfo.html";
                }
                else if (response[0].Role == "3") {
                    console.log("success");
                    window.location = "users/HealthOfficial/HealthAccountInfo.html";
                }
            }
        }
    };

    xmlhttp.open("POST", "/users/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
}

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

//     var id_token = { token: googleUser.getAuthResponse().id_token };

//     // Create AJAX Request
//     var xmlhttp = new XMLHttpRequest();

//     // Define function to run on response
//     xmlhttp.onreadystatechange = function() {
//         if (this.readState == 4 && this.status == 200) {
//             alert("Welcome"+this.responseText);
//         } else if (this.readyState == 4 && this.status >= 400) {
//             alert("Login failed");
//         }
//     };

//     xmlhttp.open("POST", "/login", true);
//     xmlhttp.setRequestHeader("Content-type", "application/json");
//     xmlhttp.send(JSON.stringify(id_token));
// }