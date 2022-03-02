function logout() {
    var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        window.location = "/index.html";
      }
    };

  xmlhttp.open("post", "/users/logout", true);
  xmlhttp.send();
}


function getInfo() {
    var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var user = JSON.parse(this.responseText);
        console.log(user);
        document.getElementById('firstName').value = user[0].Given_name;
        document.getElementById('lastName').value = user[0].Family_name;
        document.getElementById('DOB').value = user[0].DOB;
        document.getElementById('email').value = user[0].Email;
        document.getElementById('phone').value = user[0].Phone;
        document.getElementById('streetAddress').value = user[0].Street_Address;
        document.getElementById('suburb').value = user[0].Suburb_Town;
        document.getElementById('state').value = user[0].State;
        document.getElementById('country').value = user[0].Country;
        console.log(document.getElementById('DOB').value);

      }
    };

  xmlhttp.open("GET", "/users/getUserInfo", true);
  xmlhttp.send();
}

function checkIn() {

    var xmlhttp = new XMLHttpRequest();

    var checkin = {
        venue: validator.escape(document.getElementById("checkin").value)
    };

    console.log(checkin);
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        alert("Checked In!");
        setTimeout(function(){window.location.reload(false)}, 500);
      }
    };

    xmlhttp.open("POST", "/users/checkIn", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(checkin));
}

function saveChanges() {
    var xmlhttp = new XMLHttpRequest();

    var user = {
        firstName: validator.escape(document.getElementById("firstName").value),
        lastName: validator.escape(document.getElementById("lastName").value),
        Email: validator.escape(document.getElementById("email").value),
        Phone: document.getElementById("phone").value,
        Street: validator.escape(document.getElementById("streetAddress").value),
        Suburb: validator.escape(document.getElementById("suburb").value),
        State: validator.escape(document.getElementById("state").value),
        Country: validator.escape(document.getElementById("country").value),
        DOB: document.getElementById("DOB").value
    };



    var checked = true;
    if (user.firstName == '' || user.lastName == '' || user.Email == '' || user.Phone =='' || user.Street=='' || user.Suburb=='' || user.State=='' || user.Country == '' || user.DOB == '') {
      checked = false;
    }


    // if (!validator.isAfter(user.DOB,"1902-01-02")) {
    //   alert("Invalid date of birth");
    //     return 0;
    //     }





    if (checked == false) {
        alert("missing field");
        return 0;
    }


    if (!validator.isMobilePhone(user.Phone) || !validator.isLength(user.Phone,{min:10, max: 10})) {
        alert("Invalid phone number");
        return 0;
    }

    console.log(user);

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var user = JSON.parse(this.responseText);



      }
    };

    xmlhttp.open("POST", "/users/saveChanges", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
}

function getHotspotHistory() {
    var xmlhttp = new XMLHttpRequest();


  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var test = JSON.parse(this.responseText);
         console.log(test);
        for (var i = 0; i < test.length; i++) {
        var row = document.createElement("tr");
        var id = document.createElement("td");
        var venuename = document.createElement("td");

        id.innerHTML = test[i].Venue_Name;
        venuename.innerHTML = test[i].TimeStamp;
        row.appendChild(id);
        row.appendChild(venuename);
        document.getElementById("historyTableH").appendChild(row);
      }

      }
    };

    xmlhttp.open("POST", "/users/getHotspotHistory", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send();
}

function getUserHistory() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var test = JSON.parse(this.responseText);
      console.log(test);
      for (var i = 0; i < test.length; i++) {
        var row = document.createElement("tr");
        var id = document.createElement("td");
        var venuename = document.createElement("td");

        id.innerHTML = test[i].Venue_name;
        venuename.innerHTML = test[i].TimeStamp;
        row.appendChild(id);
        row.appendChild(venuename);
        document.getElementById("historyTable").appendChild(row);
      }

    }
  };

  xmlhttp.open("GET", "/users/getUserHistory", true);
  xmlhttp.send();
}