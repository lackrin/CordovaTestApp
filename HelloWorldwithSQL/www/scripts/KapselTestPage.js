
var t0 = Number(new Date()); //Time passed in from main activity.
var t1 = performance.now();
var t2; //onLoad
var t3; //deviceready
var readStartTime;
var logonInitTime;
var unlockTime;
var resumeTime;

var applicationContext = null;

window.onerror = onError;

function onError(msg, url, line) {
    var idx = url.lastIndexOf("/");
    var file = "unknown";
    if (idx > -1) {
        file = url.substring(idx + 1);
    }
    alert("An error occurred in " + file + " (at line # " + line + "): " + msg);
    return false; //suppressErrorAlert;
}

function init() {
    updateStatus2("EventLogging: deviceready called");
   // var kapselBody = document.getElementById("kapselBody");
   // kapselBody.onload = "onLoad()";
    t3 = performance.now();
    console.log("EventLogging Perf: " + ((t3 - t1) / 1000).toFixed(3) + " seconds from onLoad until deviceready");

    if (sap.Logger) {
        sap.Logger.setLogLevel(sap.Logger.DEBUG);  //enables the display of debug log messages from the Kapsel plugins.
        sap.Logger.debug("EventLogging: Log level set to DEBUG");
    }

    if (navigator.notification) { // Override default HTML alert with native dialog. alert is not supported on Windows
        window.alert = navigator.notification.alert;
    }

    register();
}

function logonSuccessCallback(result) {
    updateStatus2("logonSuccessCallback called");
    var endTime = performance.now();
    var endTime2 = new Date();
    console.log("EventLogging Perf: " + ((endTime - logonInitTime) / 1000).toFixed(3) + " seconds for logon.init to complete");
    console.log("EventLogging Perf: " + ((endTime - t1) / 1000).toFixed(3) + " seconds from onload till datavault is unlocked");
    console.log("EventLogging Perf: " + ((endTime2 - t0) / 1000).toFixed(3) + " seconds from main activity till datavault is unlocked.  Requires modifying MainActivity.java");  //loadUrl(launchUrl + "?startTime=" + new java.util.Date().getTime());
    console.log("EventLogging:  logonSuccessCallback " + JSON.stringify(result));
    applicationContext = result;
    showScreen("MainDiv");
}

//used when the logon plugin does not register with a server
function logon2SuccessCallback(result) {
    console.log("EventLogging: logon2SuccessCallback " + JSON.stringify(result));
    applicationContext = result;
    applicationContext.applicationEndpointURL = "https://sapes4.sapdevcenter.com/sap/opu/odata/IWFND/RMTSAMPLEFLIGHT";
    showScreen("MainDiv");
}

function logonErrorCallback(error) {   //this method is called if the user cancels the registration.
    alert("An error occurred:  " + JSON.stringify(error));
    if (device.platform == "Android") {  //Not supported on iOS
        navigator.app.exitApp();
    }
}

function read() {
    updateStatus2("Read request started");
    readStartTime = performance.now();
    if (!applicationContext) {
        alert("Register or unlock before proceeding");
        return;
    }
    clearTable();
    sUrl = applicationContext.applicationEndpointURL + "/CarrierCollection?$format=json";  //JSON format is less verbose than atom/xml
    var oHeaders = {};
    //oHeaders['X-SMP-APPCID'] = applicationContext.applicationConnectionId;  //not needed as this will be sent by the logon plugin

    var request = {
        headers: oHeaders,
        requestUri: sUrl,
        method: "GET"
    };

    if (device.platform == "windows") { //provided by the authproxy and logon plugins on Android and iOS but not on Windows
        request.user = applicationContext.registrationContext.user;
        request.password = applicationContext.registrationContext.password;
    }
    OData.read(request, readSuccessCallback, errorCallback);
}

function readSuccessCallback(data, response) {
    var endTime = performance.now();
    updateStatus2("Read " + data.results.length + " records in " + ((endTime - readStartTime) / 1000).toFixed(3) + " seconds");
    var carrierTable = document.getElementById("carrierTable");

    for (var i = data.results.length - 1; i >= 0; i--) {
        var row = carrierTable.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = data.results[i].carrid;
        cell2.innerHTML = data.results[i].CARRNAME;
    }
}

function clearTable() {
    var carrierTable = document.getElementById("carrierTable");
    while (carrierTable.rows.length > 1) {
        carrierTable.deleteRow(1);
    }
}

function errorCallback(e) {
    alert("An error occurred: " + JSON.stringify(e));
    showScreen("MainDiv");
}

function register() {
    logonInitTime = performance.now();
    updateStatus2("Calling Logon.init");
    sap.Logon.init(logonSuccessCallback, logonErrorCallback, appId, context);
    //sap.Logon.initPasscodeManager(logon2SuccessCallback, errorCallback, appId);  //initialize the datavault without registering with an SMP server
}

function unRegister() {
    updateStatus2("Calling deleteRegistration");
    showScreen("LoadingDiv");
    sap.Logon.core.deleteRegistration(logonUnregisterSuccessCallback, errorCallback);
    //sap.Logon.deletePasscodeManager(logonUnregisterSuccessCallback, errorCallback);  //Used when the datavault is initialized with initPasscodeManager
    clearTable();
}

function logonUnregisterSuccessCallback(result) {
    updateStatus2("Successfully Unregistered");
    console.log("EventLogging: logonUnregisterSuccessCallback " + JSON.stringify(result));
    applicationContext = null;
    register();
}

function lock() {
    sap.Logon.lock(logonLockSuccessCallback, errorCallback);
    clearTable();
}

function logonLockSuccessCallback(result) {
    console.log("EventLogging: logonLockSuccessCallback " + JSON.stringify(result));
    showScreen("LockedDiv");
}

function unlock() {
    unlockTime = performance.now();
    sap.Logon.unlock(unlockSuccessCallback, errorCallback);
}

function unlockSuccessCallback(result) {
    updateStatus2("unLockSuccessCallback called");
    var endTime = performance.now();
    console.log("EventLogging Perf: " + ((endTime - unlockTime) / 1000).toFixed(3) + " seconds to unlock the datavault");
    showScreen("MainDiv");
}

function managePasscode() {
    sap.Logon.managePasscode(managePasscodeSuccessCallback, errorCallback);
}

function managePasscodeSuccessCallback() {
    console.log("EventLogging: managePasscodeSuccess");
}

function showScreen(screenIDToShow) {
    var screenToShow = document.getElementById(screenIDToShow);
    screenToShow.style.display = "block";
    var screens = document.getElementsByClassName('screenDiv');
    for (var i = 0; i < screens.length; i++) {
        if (screens[i].id != screenToShow.id) {
            screens[i].style.display = "none";
        }
    }
}

function updateStatus2(msg) {
    var d = new Date();
    document.getElementById('statusID2').innerHTML = msg + " at " + addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds());
    console.log("EventLogging: " + msg + " at " + addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds() + "." + addZero(d.getMilliseconds())));
}

function addZero(input) {
    if (input < 10) {
        return "0" + input;
    }
    return input;
}

function onLoad() {
    console.log("EventLogging: onLoad");
    t2 = performance.now();
    var endTime = new Date();
    console.log("EventLogging Perf: " + ((endTime - t0) / 1000).toFixed(3) + " seconds between MainActivity and onLoad");
}

function onBeforeUnload() {
    console.log("EventLogging: onBeforeUnLoad");
}

function onUnload() {
    console.log("EventLogging: onUnload");
}

function onPause() {
    console.log("EventLogging: onPause");
}

function onResume() {
    resumeTime = performance.now();
    console.log("EventLogging: onResume");
}

function onSapResumeSuccess() {
    console.log("EventLogging: onSapResumeSuccess");
    var endTime = performance.now();
    console.log("EventLogging Perf: " + ((endTime - resumeTime) / 1000).toFixed(3) + " seconds from onresume to onSapResumeSuccess");
}

function onSapLogonSuccess() {
    console.log("EventLogging: onSapLogonSuccess");
}

function onSapResumeError(error) {
    console.log("EventLogging: onSapResumeError " + JSON.stringify(error));
}

document.addEventListener("deviceready", init, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("onSapResumeSuccess", onSapResumeSuccess, false);
document.addEventListener("onSapLogonSuccess", onSapLogonSuccess, false);
document.addEventListener("onSapResumeError", onSapResumeError, false);
