var geojsonData;

// Store local geojson file into a variable
$(document).ready(function() {
  //thinking that we manally update the geojson file
  $.getJSON('data/2021-05-03-features.geojson', function(results) {
    // Assign the results to the geojsonData variable
    geojsonData = results;
    //for testing
    // console.log(results);
    //assign each artist to an ID
      console.log(geojsonData);






        geojsonData.features.forEach(function(artist, i) {
          var prop = artist.properties;
          prop.id = i;

          // Add a new listing section to the sidebar.
          var listings = document.getElementById('page-section-proto');
          var listing = listings.appendChild(document.createElement('section'));
          // Assign a unique `id` to the listing.
          listing.id = "#" + prop['first name'] + prop['last name'];
          // Assign the `item` class to each listing for styling.
          listing.className = 'artist-bios';

          //using the title of the piece as header
          listing.innerHTML = "<div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";

          var details = listing.appendChild(document.createElement('p'));
          if (prop["bio url"]) {
            details.innerHTML += prop["bio url"] + "</div>";
          }

        });

  });





});




// console.log (geojsonData.)
