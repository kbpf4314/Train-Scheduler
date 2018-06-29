$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCI9_WJGgY4wSPtz-QfwjhZT_9rOTWS1xk",
        authDomain: "kpfbootcamp.firebaseapp.com",
        databaseURL: "https://kpfbootcamp.firebaseio.com",
        projectId: "kpfbootcamp",
        storageBucket: "",
        messagingSenderId: "183430613480"
    };
    firebase.initializeApp(config);

    // Variables
    const database = firebase.database();

    // Button for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grab user input
        let trainName = $("#train-name-input").val().trim();
        let destInput = $("#dest-input").val().trim();
        let timeInput = $("#time-input").val().trim();
        let freeInput = $("#free-input").val().trim();

        //current time
        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        // Local "filler" object for train data
        let newTrain = {
            name: trainName,
            destination: destInput,
            time: timeInput,
            frequency: freeInput
        };

        // Upload employee data to firebase
        database.ref().push(newTrain);

        // Console log for all data
        //console.log(newTrain.name);
        //console.log(newTrain.destination);
        //console.log(newTrain.time);
        //console.log(newTrain.frequency);

        // Alert
        alert("Train successfully added");

        // Clear text-boxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#time-input").val("");
        $("#free-input").val("");
    });

    // Firebase event to add train to table from form
    $(document).ready(function () {
        // All code comes here 
        database.ref().on("child_added", function (childSnapshot, prevChildKey) {
            //console.log(childSnapshot.val());

            // Store everything 
            let trainName = childSnapshot.val().name;
            let destInput = childSnapshot.val().destination;
            let timeInput = parseInt(childSnapshot.val().time);
            let freeInput = parseInt(childSnapshot.val().frequency);

            // Train
            //console.log(trainName);
            //console.log(destInput);
            //console.log(timeInput);
            //console.log(freeInput);

            // Train time
            let trainTime = parseInt(moment.unix(timeInput).format("HH:mm"));
            //console.log(typeof trainTime);

            // Calculate the total time for the train
            let trainMinutes = moment().diff(moment(trainTime), "minutes");
            //console.log(trainMinutes);

            // Time apart
            let trainRemain = trainMinutes % freeInput;

            // Minutes until arrival
            //console.log(freeInput, trainRemain);
            let minUntil = freeInput - trainRemain;
            //console.log(minUntil);

            // Next arrival time
            let nextArrival = moment().add(minUntil, "minutes").format('HH:mm');

            // Add each train's data into the table
            $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destInput + "</td><td>" + freeInput + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
        })
    });
})