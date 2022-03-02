// FOR CREATING A HOTSPOT
var vueinst = new Vue({
  el: '#content',
  data: {
    selected: true
  }
});

// const submit = function() {
//   document.getElementById('Submit').addEventListener('click', send);
// };


function loadHotspots() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var test = JSON.parse(this.responseText);
      console.log(test);
      for (var i = 0; i < test.length; i++) {
        var row = document.createElement("tr");
        var id = document.createElement("td");
        var venuename = document.createElement("td");

        id.innerHTML = test[i].id;
        venuename.innerHTML = test[i].Venue_Name;
        row.appendChild(id);
        row.appendChild(venuename);
        document.getElementById("hotspotTable").appendChild(row);
      }

    }
  };

  xmlhttp.open("GET", "/users/getHotspots", true);
  xmlhttp.send();
}

function createHotspot() {
  var venue = {
    Name: validator.escape(document.getElementById("Name").value),
    Start: validator.escape(document.getElementById("Start").value),
    End: validator.escape(document.getElementById("End").value),
    Street: validator.escape(document.getElementById("Street").value),
    Suburb: validator.escape(document.getElementById("Suburb").value),
    State: validator.escape(document.getElementById("State").value),
    Country: validator.escape(document.getElementById("Country").value),
  };


  var checked = true;
  if (venue.Name == '' || venue.Start == '' || venue.End == '' || venue.Street=='' || venue.Suburb=='' || venue.State=='' || venue.Country == '' ) {
    checked = false;
  }

  if (!validator.isAfter(venue.Start,"2021-01-01")) {
    alert("Invalid start date");
    return 0;
  }
  if (!validator.isAfter(venue.End,venue.Start)) {
    alert("Invalid end date");
    return 0;
  }



  if (checked == false) {
    alert("missing field");
    return 0;
  }

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText != '')
      alert(this.responseText);
    }
    else {
      window.location.reload(true);
    }
  };


  xmlhttp.open("POST", "/users/createHotspot", true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(venue));
}

function DeleteHotspot() {
  var xmlhttp = new XMLHttpRequest();

  var venue = {
    venueid : validator.escape(document.getElementById("hotspotID").value)
  };


  // xmlhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     }

  //   }
  // };

  xmlhttp.open("POST", "/users/deleteHotspot", true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(venue));
}

// document.addEventListener('DOMContentLoaded',submit);


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

function createOfficial() {


    var user = {
        firstName: validator.escape(document.getElementById("fname").value),
        lastName: validator.escape(document.getElementById("lname").value),
        Email: validator.escape(document.getElementById("email").value),
        Phone: document.getElementById("Phone").value,
        Street: validator.escape(document.getElementById("Street").value),
        Suburb: validator.escape(document.getElementById("Suburb").value),
        State: validator.escape(document.getElementById("State").value),
        Country: validator.escape(document.getElementById("Country").value),
        pass: validator.escape(document.getElementById("pass").value)
    };


    var checked = true;
    if (user.firstName == '' || user.lastName == '' || user.Email == '' || user.Phone =='' || user.Street=='' || user.Suburb=='' || user.State=='' || user.Country == '') {
            checked = false;
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

    // console.log(user);
    var xmlhttp = new XMLHttpRequest();

    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         var test = this.responseText;
    //         console.log(test);
    //     }
    // };


    xmlhttp.open("POST", "/users/register", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
    window.location.reload(false);// console.log(user);
}