var geojsonData;
// Gathers artist details from geojson and stores it in variable
$(document).ready(function() {
  //change the file when new submissions have been made
  var storymapCon = document.createElement('container');
  var wishCon = document.createElement('container');
  var poeticCon = document.createElement('container');
  var noBioCon = document.createElement('container');
  document.body.appendChild(storymapCon);
  document.body.appendChild(wishCon);
  document.body.appendChild(poeticCon);
  document.body.appendChild(noBioCon);
  storymapCon.className = 'storymap-con';
  wishCon.className = 'wish-con';
  poeticCon.className = 'poetic-con';
  noBioCon.className = 'nobio-con';

  storymapCon.innerHTML = "<h1>San José Story Map Contributors</h1>";
  wishCon.innerHTML = "";
  poeticCon.innerHTML = "";
  noBioCon.innerHTML = "";



  $.getJSON('data/sj-story-map-all-2022-winner.geojson', function(results) {
      geojsonData = results;
      geojsonData.features.forEach(function(artist, i) {
          var prop = artist.properties;
          prop.id = i;
          if (prop["bio url"]) {
            if (prop["category"] == 'storymap') {
              //If the user has submitted a bio, create element onto the page
              if (prop["bio url"]) {
                var listing = document.createElement('section');

                storymapCon.appendChild(listing);



                listing.className = 'page-section';
                listing.id = prop['first name'] + prop['last name'];
                // listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
                listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";

                if (prop["personal url"]) {
                  listing.innerHTML += "<h5 class='personal-web-link'><a target = '_blank' href='" + prop["personal url"] + "'> Website</a></h5>"
                }
                listing.innerHTML += "<p>" + prop["bio url"] + "</p>";
              }

            } else if (prop["category"] == 'wish') {
              //If the user has submitted a bio, create element onto the page
              if (prop["bio url"]) {
                var listing = document.createElement('section');

                wishCon.appendChild(listing);



                listing.className = 'page-section';
                listing.id = prop['first name'] + prop['last name'];
                // listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
                listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";

                if (prop["personal url"]) {
                  listing.innerHTML += "<h5 class='personal-web-link'><a target = '_blank' href='" + prop["personal url"] + "'> Website</a></h5>"
                }
                listing.innerHTML += "<p>" + prop["bio url"] + "</p>";
              }

            } else if (prop["category"] == 'poetic') {
              //If the user has submitted a bio, create element onto the page
              if (prop["bio url"]) {
                var listing = document.createElement('section');

                poeticCon.appendChild(listing);



                listing.className = 'page-section';
                listing.id = prop['first name'] + prop['last name'];
                // listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
                listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";

                if (prop["personal url"]) {
                  listing.innerHTML += "<h5 class='personal-web-link'><a target = '_blank' href='" + prop["personal url"] + "'> Website</a></h5>"
                }
                listing.innerHTML += "<p>" + prop["bio url"] + "</p>";
              }
            }
          } else {
            if (prop["category"] == 'storymap') {
              //If the user has submitted a bio, create element onto the page

                var listing = document.createElement('section');
                noBioCon.appendChild(listing);

                listing.className = 'page-section';
                listing.id = prop['first name'] + prop['last name'];
                listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
                if (prop["personal url"]) {
                  listing.innerHTML += "<h5 class='personal-web-link'><a target = '_blank' href='" + prop["personal url"] + "'> Website</a></h5>"
                }

            } else if (prop["category"] == 'wish') {

            var listing = document.createElement('section');

            noBioCon.appendChild(listing);

            listing.className = 'page-section';
            listing.id = prop['first name'] + prop['last name'];
            listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
            if (prop["personal url"]) {
              listing.innerHTML += "<h5 class='personal-web-link'><a target = '_blank' href='" + prop["personal url"] + "'> Website</a></h5>"
            }

          } else if (prop["category"] == 'poetic') {

            var listing = document.createElement('section');

            noBioCon.appendChild(listing);

            listing.className = 'page-section';
            listing.id = prop['first name'] + prop['last name'];
            listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
            if (prop["personal url"]) {
              listing.innerHTML += "<h5 class='personal-web-link'><a target = '_blank' href='" + prop["personal url"] + "'> Website</a></h5>"
            }
          }



        // //If the user has submitted a bio, create element onto the page
        // if (prop["bio url"]) {
        //   var listing = document.createElement('section');
        //
        //   document.body.appendChild(listing);
        //
        //
        //
        //   listing.className = 'page-section';
        //   listing.id = prop['first name'] + prop['last name'];
        //   // listing.innerHTML = "<div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
        //   listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
        //
        //   if (prop["personal url"]) {
        //     listing.innerHTML +="<h5 class='personal-web-link'><a target = '_blank' href='" + prop["personal url"] + "'> Website</a></h5>"
        //   }
        //   listing.innerHTML += "<p>" + prop["bio url"] + "</p>";
        // } else {
        //   var listing = document.createElement('section');
        //
        //   document.body.appendChild(listing);
        //
        //   listing.className = 'page-section';
        //   listing.id = prop['first name'] + prop['last name'];
        //   listing.innerHTML = "<h2 class='section-heading text-uppercase' id='artist-bio-name'>" + prop['first name'] + " " + prop['last name'] + "</h2>";
        // }
      }});
  });
});
