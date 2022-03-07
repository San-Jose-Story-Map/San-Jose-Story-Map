var geojsonData;
// Gathers artist details from geojson and stores it in variable
$(document).ready(function() {
  //change the file when new submissions have been made
  $.getJSON('data/2021-06-features.geojson', function(results) {
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
        // listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";

        if (prop["personal url"]) {

          listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + "<a id='artist-portfolio-bio' href='" +
            prop["personal url"] + "' target= 'blank'>" + prop["first name"] + " " + prop["last name"] + "</a></h2>";
        }
        else{
          listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
        }

        var details = listing.appendChild(document.createElement('p'));
        details.innerHTML += prop["bio url"] + "</div></div>";
      }
    });
  });
});
