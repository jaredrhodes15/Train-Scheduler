//$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDeeUfzIuiC2mcdPB2YgbFUlImR5SYhJh4",
    authDomain: "train-activity-95f2d.firebaseapp.com",
    databaseURL: "https://train-activity-95f2d.firebaseio.com",
    projectId: "train-activity-95f2d",
    storageBucket: "train-activity-95f2d.appspot.com",
    messagingSenderId: "759991554204"
  };
  firebase.initializeApp(config);

// Store Firebase in "database" variable
var database = firebase.database();

// Submit button function
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "hh:mm a").format("H");
    var freq = $("#frequency").val().trim();


    var newTrain = {
        trainName: trainName,
        destination: cityName,
        firstTrain: firstTrain,
        frequency: freq,

    };
  });

  console.log(newDog);

  database.ref().push(newTrain);

  database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % newFreq;

    // Minute(s) Until Train
    var tMinutesTillTrain = newFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    // Display On Page
    $("#addTrainHere").append(
      ' <tr><td>' + newTrain +
      ' </td><td>' + newLocation +
      ' </td><td>' + newFreq +
      ' </td><td>' + catchTrain +
      ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

    // Clear input fields
    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;
  },
    //Handle the errors
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


// });
