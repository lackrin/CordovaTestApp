// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}

function goInsert() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(insertDB, errorCB, successCB);
}

function goSearch() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(searchQueryDB, errorCB);
}

function goDelete() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(deleteRow, errorCB);
    document.getElementById('qrpopup').style.display = 'none';
}

function goEdit() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(editRow, errorCB);
    document.getElementById('qrpopup').style.display = 'none';
}

function successCB() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(queryDB, errorCB);
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}