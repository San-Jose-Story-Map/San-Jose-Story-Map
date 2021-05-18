var geojsonData;

// Store local geojson file into a variable
$(document).ready(function() {
  //thinking that we manally update the geojson file
  $.getJSON('data/2021-05-03-features.geojson', function(results) {
    // Assign the results to the geojsonData variable
    geojsonData = results;
      // console.log(geojsonData);

        geojsonData.features.forEach(function(artist, i) {
          var prop = artist.properties;
          prop.id = i;

          var listing = document.createElement('section');
          document.body.appendChild(listing);
          listing.className = 'page-section';
          listing.id = prop['first name'] + prop['last name'];
          listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";

          var details = listing.appendChild(document.createElement('p'));
          if (prop["bio url"]) {
            details.innerHTML += prop["bio url"] + "</div></div>";
          }

        });

  });





});




// console.log (geojsonData.)
