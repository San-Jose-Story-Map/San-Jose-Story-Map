var geojsonData;
// Gathers artist details from geojson and stores it in variable
$(document).ready(function() {
  //change the file when new submissions have been made
  $.getJSON('data/2021-05-03-features.geojson', function(results) {
    geojsonData = results;
    geojsonData.features.forEach(function(artist, i) {
      var prop = artist.properties;
      prop.id = i;

      //If the user has submitted a bio, create element onto the page
      if (prop["bio url"]) {
        var listing = document.createElement('section');
        document.body.appendChild(listing);

        listing.className = 'page-section';
        listing.id = prop['first name'] + prop['last name'];
        listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";

        var details = listing.appendChild(document.createElement('p'));
        details.innerHTML += prop["bio url"] + "</div></div>";
      }
    });
  });
});
