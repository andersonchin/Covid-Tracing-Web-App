//This file defines the functions which are used to send and retrieve data for the map.


// //this generates the marekers for the map.
// function loadMarkers(geojson, map){
//   geojson.features.forEach(function (marker) {
//     // create a HTML element for each feature
//     var el = document.createElement('div');
//     el.className = 'marker';

//     // make a marker for each feature and add it to the map
//     new mapboxgl.Marker(el)
//     .setLngLat(marker.geometry.coordinates)
//     .setPopup(
//       new mapboxgl.Popup({ offset: 25 }) // add popups
//       .setHTML(
//         '<h3>' +
//         marker.properties.title +
//         '</h3><p>' +
//         marker.properties.description +
//         '</p>'
//         )
//         )
//         .addTo(map);
//   });
// }

function addHotspot(){
  console.log("yo");
  var xmlhttp = new XMLHttpRequest();

  //define the object to append to the features array
  //push the new hotspot onto the hotspot array.

  xmlhttp.open("GET", "/addHotspot", true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send();
}


// function getHotspots() {
//   var geojson = {
//     type: 'FeatureCollection',
//     features: [{
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-77.032, 38.913]
//       },
//       properties: {
//         title: 'Mapbox',
//         description: 'Washington, D.C.'
//       }
//     }]
//   };
//   console.log("get");
//   var xmlhttp = new XMLHttpRequest();

//   // Define function to run on response
//   xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       // Parse the JSON and update the posts array
//       var posts = JSON.parse(this.responseText);
//       console.log(posts);
//       //loop over the returned object an create the geojson object
//       for (var i = 0; i < posts.length; i++) {
//         let long = posts[i].lon;
//         let lati = posts[i].lat;
//         let name = posts[i].name;
//         console.log(long);
//         console.log(lati);
//         console.log(name);

//         var newHotspot =  {
//           type: 'Feature',
//           geometry: {
//             type: 'Point',
//             coordinates: [long, lati]
//           },
//           properties: {
//             title: 'Mapbox',
//             description: name,
//           }
//         };
//         geojson.features.push(newHotspot);
//         console.log("new hotspot");
//       }
//     }
//     //call the load markers function using the geojson object.
//     // Open connection to server
//     xmlhttp.open("GET", "/addHotspot", true);
//     // Send request
//     xmlhttp.send();
//     console.log(geojson);
//     return geojson;
//   };
// }