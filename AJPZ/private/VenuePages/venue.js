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

function getInfo1() {
    var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var user = JSON.parse(this.responseText);
        console.log(user);
        document.getElementById('venueName').value = user[0].Venue_Name;
        document.getElementById('firstName').value = user[0].Given_name;
        document.getElementById('lastName').value = user[0].Family_name;
        document.getElementById('email').value = user[0].Email;
        document.getElementById('phone').value = user[0].Phone;
      }
    };
  xmlhttp.open("GET", "/users/getVenueInfo1", true);
  xmlhttp.send();
}

function getInfo2() {
    var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var user = JSON.parse(this.responseText);
        console.log(user);
        document.getElementById('streetAddress').value = user[0].Street_Address;
        document.getElementById('suburb').value = user[0].Suburb_Town;
        document.getElementById('state').value = user[0].State;
        document.getElementById('country').value = user[0].Country;
      }
    };
  xmlhttp.open("GET", "/users/getVenueInfo2", true);
  xmlhttp.send();
}

function getHistory() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var test = JSON.parse(this.responseText);
      console.log(test);
      for (var i = 0; i < test.length; i++) {
        var row = document.createElement("tr");
        var id = document.createElement("td");
        var venuename = document.createElement("td");
        // var phone = document.createElement("td");

        id.innerHTML = test[i].Given_name;
        venuename.innerHTML = test[i].Family_name;
        // id.innerHTML = test[i].Phone;
        row.appendChild(id);
        row.appendChild(venuename);
        // row.appendChild(Phone);
        document.getElementById("historyTable").appendChild(row);
      }

    }
  };

  xmlhttp.open("GET", "/users/getHistory", true);
  xmlhttp.send();
}