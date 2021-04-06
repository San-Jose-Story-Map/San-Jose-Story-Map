'use strict';

//grab a form
const form = document.querySelector('.form-inline');

//grab an input
const inputEmail = form.querySelector('#inputEmail');
const inputArtist = form.querySelector('#inputArtist');
const inputLatitude = form.querySelector('#inputLatitude');
const inputLongitude = form.querySelector('#inputLongitude');
const inputDescription = form.querySelector('#inputDescription');


//config your firebase push
const config = {
    apiKey: "AIzaSyBB0UCWP5D_O3BeefjcxiDg0gYm9JHy-1A",
    authDomain: "sj-story-test.firebaseapp.com",
    databaseURL: "https://sj-story-test.firebaseio.com",
    projectId: "sj-story-test",
    storageBucket: "sj-story-test.appspot.com",
    messagingSenderId: "1001553027625",
    appId: "1:1001553027625:web:9c86514a630438da247238",
    measurementId: "G-KGKPGFVRQP"
};

//create a functions to push
function firebasePush(email, artist, longitude, latitude, url, description) {

    //prevents from breaking
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }



    //push new data
    var type = firebase.database().ref('sjstorymap').child('features').push().set(
        {
                type: 'Feature',
                properties: {
                    email: email.value,
                    artist: artist.value,
                    description: description.value,
                    url: url.value
                },
                geometries: {
                    type: 'Point',
                    coordinates: {
                        longitude: longitude.value,
                        latitude: latitude.value
                    },
                }
        });

    // var mailsRef = firebase.database().ref('emails').push().set(email.value);
    //
    // var artistRef = firebase.database().ref('artist').push().set(artist.value);
    //
    // var longitudeRef = firebase.database().ref('longitude').push().set(longitude.value);
    //
    // var latitudeRef = firebase.database().ref('latitude').push().set(latitude.value);
    //
    // var urlRef = firebase.database().ref('url').push().set(url.value);
    //
    // var descriptionRef = firebase.database().ref('description').push().set(description.value);

}

//push on form submit
if (form) {
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        firebasePush(inputEmail, inputArtist, inputLongitude, inputLatitude, inputUrl, inputDescription);

        //shows alert if everything went well.
        return alert('Data Successfully Sent to Realtime Database');
    })
}
