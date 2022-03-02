var vueinst = new Vue({
    el: '#switchColumn',
    data: {
        userShow: true,
        venueShow: false
    }
});


const submit = function() {
    document.getElementById('Submit').addEventListener('click', send);
};



function register() {


    var user = {
        firstName: validator.escape(document.getElementById("fname").value),
        lastName: validator.escape(document.getElementById("lname").value),
        Email: validator.escape(document.getElementById("email").value),
        Phone: document.getElementById("phone").value,
        Street: validator.escape(document.getElementById("street1").value),
        Suburb: validator.escape(document.getElementById("suburb1").value),
        State: validator.escape(document.getElementById("state1").value),
        Country: validator.escape(document.getElementById("country1").value),
        pass: validator.escape(document.getElementById("pass").value)
    };

    //

    var checked = true;
    if (vueinst.userShow == true) {
        user.user = true;
        user.DOB= document.getElementById("dob").value;
        if (user.firstName == '' || user.lastName == '' || user.Email == '' || user.Phone =='' || user.Street=='' || user.Suburb=='' || user.State=='' || user.Country == '' || user.DOB == '') {
            checked = false;
        }
        if (!validator.isAfter(user.DOB,"1902-01-02")) {
            alert("Invalid date of birth");
            return 0;
        }

    }
    else {
        user.venue = document.getElementById("vname").value;
            if (user.firstName == '' || user.lastName == '' || user.Email == '' || user.Phone =='' || user.Street=='' || user.Suburb=='' || user.State=='' || user.Country == '' || user.venue == '') {
            checked = false;
        }
    }



    if (checked == false) {
        alert("missing field");
        return 0;
    }
    if (user.pass.length < 6) {
        alert("Please enter password with 6 or more characters");
        return 0;
    }

    if (!validator.isMobilePhone(user.Phone) || !validator.isLength(user.Phone,{min:10, max: 10})) {
        alert("Invalid phone number");
        return 0;
    }






    var xmlhttp = new XMLHttpRequest();

    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         var test = this.responseText;
    //         console.log(test);
    //     }
    // };


    xmlhttp.open("POST", "/register", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
    window.location="index.html";// console.log(user);
}

let send = function validate(event) {
    event.preventDefault();

    let email = {
        Email: document.getElementById("email").value
    };

    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(this.responseText);
            console.log(response.length);
            if (response.length == 0) {
                if (!validator.isEmail(email.Email)) {
                    alert("Invalid email");
                    return 0;
                }
                else {
                    validator.trim(email.Email);
                    validator.escape(email.Email);
                    validator.normalizeEmail(email.Email);
                    console.log(email.Email);
                }
                register();
            }
            else {
                alert("email in use");
                return 0;
            }

        }
    };


    xmlhttp.open("POST", "/checkEmail", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({"Email":email.Email}));
};




document.addEventListener('DOMContentLoaded',submit);