//for hashtag menu
function myFunction() {
  var x = document.getElementById("filter-group");
  if (window.getComputedStyle(x).display === "block") {
    document.getElementById("filter-group").style.display = "none";
    console.log('filter group will be hidden');
  } else if (window.getComputedStyle(x).display === "none") {
    document.getElementById("filter-group").style.display = "block";
    // console.log('filter group will be shown');
  } else {
    // console.log('filter group will not change');
  }
}

//user access code from Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoic2pzdG9yeW1hcCIsImEiOiJja29qNjB2OHIwNHF4MndsNTF2aXVzN2ppIn0.h_ndW1nP2uVfzSaf0SSHNg';
var geojsonData;
var shownLayer = [];
var indexListing;

// Store local geojson file into a variable
$(document).ready(function() {
  //thinking that we manally update the geojson file
  $.getJSON('data/2021-05-03-features.geojson', function(results) {
    // Assign the results to the geojsonData variable
    geojsonData = results;
    //for testing
    // console.log(results);
    //assign each artist to an ID
    geojsonData.features.forEach(function(artist, i) {
      artist.properties.id = i;
      //for testing
      // console.log("artistid=" + artist.properties.id);
    });
  });
});

var filterGroup = document.getElementById('filter-group');
//coordinates for San Jose
var sanjose = [-121.8863, 37.3382];
//create new map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/sjstorymap/ckoj67pd4132g17p5drie5i5a',
  zoom: 10,
  center: sanjose
});

// This will let the .remove() function work later on
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

map.on('load', function() {
  //adds the markers to the map as a layer
  map.loadImage(
    'media/sjstory-map-marker-2.png',
    function(error, image) {
      map.addImage('custom-marker', image);
      if (error) throw error;

    }
  );

  map.addSource('sj-story-data', {
    'type': 'geojson',
    'data': geojsonData
  });

  buildLocationList(geojsonData);

  // CREATES LARGER IMAGE WHEN CLICKED
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementsByClassName("artist-img");
  var modalImg = document.getElementById("img01");
  for (var i = 0; i < img.length; i++) {
    img[i].onclick = function() {

      modal.style.display = "block";
      modalImg.src = this.src;

    }
  }

  // img.onclick = function() {
  //   modal.style.display = "block";
  //   modalImg.src = this.src;
  // }
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }




  // sets up a layer
  indexListing = 0;

  //adds hashtag popup header
  var filterHeader = document.createElement('H1');
  var headerText = document.createTextNode("HASHTAGS");
  filterHeader.appendChild(headerText);
  filterHeader.id = 'hashtag-header-text';
  filterGroup.appendChild(filterHeader);

  geojsonData.features.forEach(function(feature) {
    var symbol;
    var originalHash;
    //checks if artist/writer chose a hashtag and leaves it blank if none has been chosen
    if (!feature.properties['hashtag']) {
      symbol = "";
      originalHash = "";
    } else {
      symbol = feature.properties['hashtag'];
      originalHash = symbol;
      symbol = symbol.replace('#', '');
      //checks if user has more than one hashtag, choose the first one
      if (symbol.includes(',')) {
        var firstHash = symbol.substring(0, symbol.indexOf(","));
        console.log("first hash: " + firstHash);
        symbol = firstHash;
      }
    }

    //sets layerID to the new hashtag name
    var layerID = 'poi-' + symbol;
    //array is made so that each layer interacts with other functions
    shownLayer[indexListing] = layerID;
    indexListing++;


    //creates a layer for each hashtag/filter
    if (!map.getLayer(layerID)) {

      map.addLayer({
        'id': layerID,
        'type': 'symbol',
        'source': 'sj-story-data',
        'layout': {
          'icon-image': 'custom-marker',
          'icon-size': 0.15,
          'icon-allow-overlap': true,
          'text-allow-overlap': true,
          'text-ignore-placement': true,
          'icon-ignore-placement': true,
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
          ],
          'text-offset': [0, 1.25],
          'text-anchor': 'top'
        },
          'filter': ['==', 'hashtag', originalHash]

      });

      // Add checkbox and label elements for the layer.
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.id = layerID;
      input.checked = true;
      filterGroup.appendChild(input);

      var label = document.createElement('label');
      label.setAttribute('for', layerID);
      label.textContent = symbol;
      filterGroup.appendChild(label);

      // When the checkbox changes, update the visibility of the layer.
      input.addEventListener('change', function(e) {
        map.setLayoutProperty(
          layerID,
          'visibility',
          e.target.checked ? 'visible' : 'none'
        );
      });

    }

  });
  // for testing
  // console.log(indexListing);
});


//current location button
// map.addControl(
//   new mapboxgl.GeolocateControl({
//     positionOptions: {
//       enableHighAccuracy: true
//     },
//     trackUserLocation: true
//   })
// );

// builds the sidebar with geoJSON data
function buildLocationList(data) {
  data.features.forEach(function(artist, i) {

    var prop = artist.properties;
    prop.id = i;

    //for testing
    // console.log(prop);

    // Add a new listing section to the sidebar.
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    // Assign a unique `id` to the listing.
    listing.id = "listing-" + prop.id;
    // Assign the `item` class to each listing for styling.
    listing.className = 'item';

    // Add the link to the individual listing created above.
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = "link-" + prop.id;
    //using the title of the piece as header
    link.innerHTML = prop["title of work"];

    //user the artist and description
    var details = listing.appendChild(document.createElement('div'));
    // details.innerHTML = "<div id='artist-name'>" + prop["first name"] + " " + prop["last name"] + "<br />"
    // if (prop["bio url"]) {
    //   details.innerHTML += "<a id='artist-bio' href='" + prop["bio url"] + "'>" + "Artist Bio " + "</a>"
    // }
    // if (prop["personal url"]) {
    //   details.innerHTML += "<a id='artist-portfolio' href='" + prop["personal url"] + "'>" + "Portfolio" + "</a></div>"
    // }

    if (prop["photo submission"]) {
      // https://drive.google.com/uc?export=view&id=
      //https://drive.google.com/file/d/ID/preview


      //get around for google drive links
      var currentLink = prop["photo submission"];
      // console.log("current link: " + currentLink);
      //grabs the id of the media

      String.prototype.indexOfEnd = function(string) {
        var io = this.indexOf(string);
        return io == -1 ? -1 : io + string.length;
      }


      var newLink = currentLink.substring(currentLink.indexOfEnd('id='), currentLink.length);
      console.log("new link: " + newLink);

      // currentLink = "12ErPkEiB-Y34HUcOmrSEVIzTmm5LXxlw";


      // details.innerHTML += "<br />" + "<img class ='artist-img' src='https://drive.google.com/uc?export=view&id=" + newLink +
      //   "'/><div id='myModal' class='modal'><span class = 'close'>X</span><img class='modal-content' id='img01'><div id ='caption'></div></div>"


      details.innerHTML += "<br />" + "<img class ='artist-img' src='" + "https://drive.google.com/uc?id=" + newLink +
        "'/><div id='myModal' class='modal'><span class = 'close'>X</span><img class='modal-content' id='img01'><div id ='caption'></div></div>"


      // details.innerHTML += "<br />" + "<img class ='artist-img' src='media/lucia.jpg'/><div id='myModal' class='modal'><span class = 'close'>X</span><img class='modal-content' id='img01'><div id ='caption'></div></div>"
    }

    if (prop["video submission"]) {

      //get around for google drive links
      var currentLink = prop["video submission"];
      // console.log("current link: " + currentLink);
      var newLink = currentLink.substring(currentLink.lastIndexOf('id='), currentLink.length);
      // console.log("new link: " + newLink);
      // details.innerHTML += "<br />" + "<video width='320' controls> <source src='media/idnaM.mp4' type='video/mp4'> </video>"
      details.innerHTML += "<br />" + "<iframe src='" + "https://drive.google.com/uc?export=view&" + newLink + "' width = '600px' webkitallowfullscreen mozallowfullscreen allowfullscreen> </iframe>"
    }

    if (prop["text submission"]) {

      var newText = prop["text submission"];
      var resText = newText.replace(/\n/g, '<br />');
      // console.log(resText);
      details.innerHTML += "<br />" + resText + "<br />"
    }

    if (prop["url submission"]) {
      details.innerHTML += "<br /><a id ='url-sub' href='" + prop["url submission"] + "' target='_blank'> Link to submission</a><br />"
    }



    // details.innerHTML += "<br />" + prop.statement + "<br />"


    //Listen to the element and when it is clicked, do four things:
    //1. Update the `currentFeature` to the store associated with the clicked link
    //2. Fly to the point
    //3. Close all other popups and display popup for clicked store
    //4. Highlight listing in sidebar (and remove highlight for all other listings)

    link.addEventListener('click', function(e) {
      for (var i = 0; i < data.features.length; i++) {
        if (this.id === "link-" + data.features[i].properties.id) {
          var clickedListing = data.features[i];
          console.log("data features  = " + clickedListing);
          flyToStore(clickedListing);
          createPopUp(clickedListing);
        }
      }
      //updates the active item
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    });

    // On every scroll event, check which element is on screen
    listings.onscroll = function() {
      var visibleListing;
      var visibleListingID;
      for (var i = 0; i < data.features.length; i++) {
        checkListingLink = "link-" + i;
        visibleListingID = "listing-" + i;
        if (isElementOnScreen(checkListingLink)) {
          visibleListing = data.features[i];
          //for testing
          // console.log("we are in the onscroll function at index: " + i);
          flyToStore(visibleListing);
          createPopUp(visibleListing);

          //updates the active item with scroll
          var scrolledListing = document.getElementById(visibleListingID);
          var activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          scrolledListing.classList.add('active');
        }
      };
    }

    //checks which artist work is being viewed in the scroll bar
    function isElementOnScreen(id) {
      var element = document.getElementById(id);
      //for testing
      // console.log(element + " is on screen");
      var bounds = element.getBoundingClientRect();
      //for testing
      // console.log("bounds top: " + bounds.top + " Window inner height:" + window.innerHeight + " Bounds bottom: " + bounds.bottom);
      return bounds.top < window.innerHeight - (window.innerHeight / 1.3);
    };
  });
}



map.on('zoom', () => {
  updateTilt();
})

function updateTilt() {
  var currentZoom = map.getZoom();
  var currentPitch = map.getPitch();
  var newPitch;

  // statement prevents from trigerring durring flyTo() function

  if (map.scrollZoom.isActive()) {

    if (currentZoom > 12) {
      newPitch = 45;
      if (newPitch != currentPitch) {
        map.setPitch(45);
        //for testing
        console.log(currentZoom);
        console.log(currentPitch);
      }
      // var pitchNum = 45;
      // for (var i = currentPitch; i < pitchNum; i+= .01) {
      //   map.setPitch(i);
      // }

    }

    if (currentZoom <= 11) {
      // var pitchNum = 0;
      // for (var i = currentPitch; i > pitchNum; i-= .01) {
      //   map.setPitch(i); }


      newPitch = 0;
      if (newPitch != currentPitch) {
        map.setPitch(0);
        // map.easeTo({
        //   pitch: 0,
        //   duration: 3000,
        //   essential: true
        // });
        //for testing
        console.log(currentZoom);
        console.log(currentPitch);
      }
    }

  }
}

// var activeFly = false;
//allows the map to move depending on click/scroll
function flyToStore(currentFeature) {
  var latitude = currentFeature.geometry.coordinates[1];
  var longitude = currentFeature.geometry.coordinates[0];
  // activeFly = true;
  map.flyTo({
    center: [longitude, latitude + .006],
    zoom: 13.5,
    speed: 0.5, // make the flying slow
    curve: 1, // change the speed at which it zooms out
    // bearing: 27,
    pitch: 45,
    essential: true
  });

  // activeFly = false;
}

//creates popup over the location icon
function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  var coorPad = currentFeature.geometry.coordinates;
  var popupContent = "";


  popupContent = '<h3>' + currentFeature.properties['title of work'] +
    '</h3>' + '<div id="artist-name">' +
    currentFeature.properties['first name'] +
    " " + currentFeature.properties['last name'] + '</div>';

  if (currentFeature.properties['bio url']) {
    popupContent += "<a id='artist-bio' href='" +
      currentFeature.properties['bio url'] + "' target= 'blank'>" + "Artist Bio" + "</a>" + " - ";
  }

  if (currentFeature.properties['personal url']) {
    popupContent += "<a id='artist-portfolio' href='" +
      currentFeature.properties['personal url'] + "' target= 'blank'>" + "Portfolio" + "</a>";
  }

  popupContent += '<p>' + currentFeature.properties['statement'] + '</p>';

  //for testing
  // console.log("long and lat: " + coorPad);
  if (popUps[0]) popUps[0].remove();
  var popup = new mapboxgl.Popup({
      closeOnClick: true
    })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(popupContent)
    .addTo(map);
}
map.on('click', function(e) {
  /* Determine if a feature in the "locations" layer exists at that point. */
  // forloop is in consideration of the added hashtag symbol layers
  for (var i = 0; i < indexListing; i++) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: [shownLayer[i]]
    });
    /* If yes, then: */
    if (features.length) {

      var clickedPoint = features[0];

      // Fly to the point
      flyToStore(clickedPoint);

      //Close all other popups and display popup for clicked store
      createPopUp(clickedPoint);
      // Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      var listing = document.getElementById('listing-' + clickedPoint.properties.id);
      listing.classList.add('active');
      listing.scrollIntoView();
    }

  }

});
