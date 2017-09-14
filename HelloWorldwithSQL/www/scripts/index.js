// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        var sqlButton = document.getElementById("btnSQLClick");
        sqlButton.addEventListener("click", function () { callAnotherPage("TestPage.html") }, false);

        var mapButton = document.getElementById("btnMapClick");
        mapButton.addEventListener("click", function () { callAnotherPage("basic-gps.html") }, false);

        var kapselButton = document.getElementById("btnKapselClick");
        kapselButton.addEventListener("click", function () { callAnotherPage("KapselTestPage.html") }, false);
       // mapButton.addEventListener("click", function () { callAnotherPage("basic-map-splashscreen.html") }, false);
    };

    function callAnotherPage(page) {
        window.location = page;
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();