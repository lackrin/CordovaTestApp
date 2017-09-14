var appId = "com.kapsel.gs"; // Change this to app id on server

// Optional initial connection context
var context = {
    "serverHost": "hcpms-p1942840630trial.hanatrial.ondemand.com", //Place your SMP 3.0 server name here
    //"serverHost": "hcpms-i82XXXXtrial.hanatrial.ondemand.com", //SAP Cloud Platform Mobile Services
    "https": true,  //true for SAP Cloud Platform Mobile Services
    "serverPort": "443",  //443 for SAP Cloud Platform Mobile Services
    //"multiUser": true,
    "useLocalStorage": true,
    "user": "P1942840630",          //For demo purposes, specify the user name and password you wish to register with here to save typing on the device 
    "password": "mojo1010",        //Note, if you wish to use this user name and password to be passed to the backend OData producer, choose Basic as the SSO mechanism
    //The AuthProxy plugin with the Logon plugin can respond to 401 Authentication challenges if the same credentials used to register are also used to make OData requests
    //Once set the credentials can be changed by calling sap.Logon.changePassword()
    "passcode": "password",     //Hardcoding passwords and unlock passcodes are strictly for ease of use during development
    //Passcode can be changed by calling sap.Logon.managePasscode()
    "unlockPasscode": "password",
    "passcode_CONFIRM": "password",
    "oldPasscode": "password",
    "communicatorId": "REST",

    //"auth": [ { "type": "saml2.web.post" } ], //Indicates that a redirect to a SAML IDP should be used for registration
    //"refreshSAMLSessionOnResume": "skip",  // Useful for offline apps when you may not wish for a saml check to be performed when the app is resumed since you may be offline

    "custom": {
        "hiddenFields": ["farmId", "resourcePath", "securityConfig", "serverPort", "https"]
    }
};