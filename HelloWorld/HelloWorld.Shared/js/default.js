// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=392286
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    //in here you need to register your functions
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(function completed() {
                //get the div that hosts the rating control.
                var ratingControlDiv = document.getElementById("ratingControlDiv");
                // retrieve the actual rating control.
                var ratingControl = ratingControlDiv.winControl;
                //register the event handler.
                ratingControl.addEventListener("change", ratingChanged, false);
                // get the button and register our event handler.
                var helloButton = document.getElementById("helloButton");
                //add the event listener to the button and on click do 
                //the clickhandler function
                helloButton.addEventListener("click", buttonClickHandler, false);
            }));
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };
    function buttonClickHandler(eventInfo) {
        var userName = document.getElementById("nameInput").value;
        var greetingString = "Hello, " + userName + ",,!,,";
        document.getElementById("greetingOutput").innerText = greetingString;
    }
    //this is what saves the rating
    function ratingChanged(eventInfo) {
        var ratingOutput = document.getElementById("ratingOutput");
        ratingOutput.innerText = eventInfo.detail.tentativeRating;
    }
    //this is what is used to save the user data 
    function nameInputChanged(eventInfo) {
        var nameInput = eventInfo.srcElement;
        //store the user's name for multiple sessions.
        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;
        roamingSettings.values["userName"] = nameInput.Value;
    }

    app.start();
})();