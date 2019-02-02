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

var database = firebase.database();

$(document).ready(function() {

    $('#submitBtn').click(function() {
        event.preventDefault();

        // collect data from form and trim
        var trainName = $('#trName').val().trim();
        var trainDest = $('#trDest').val().trim();
        var trainFirst = $('#trFirst').val().trim();
        var trainFreq = $('#trFreq').val().trim();
            trainFreq = Math.round(trainFreq);

        // execute if form is fully completed
        if (trainName !== '' && trainDest !== '' && trainFirst !== '' && trainFreq !== '') {

            // store form data in object
            var newTrain = {
                name: trainName,
                destination: trainDest,
                firstDeparture: trainFirst,
                frequency: trainFreq
            };

            // push new object to firebase
            database.ref().push(newTrain);

            // clear form
            $('#trName').val('');
            $('#trDest').val('');
            $('#trFirst').val('');
            $('#trFreq').val('');

        }

    });
    
    // execute for all child data in firebase
    database.ref().on('child_added',function (snap) {

        // console.log(snap.val());

        // grab data from firebase
        var trainName = snap.val().name;
        var trainDest = snap.val().destination;
        var trainFirst = snap.val().firstDeparture;
        var trainFreq = snap.val().frequency;

        // set first train back one year to ensure it falls before current time
        var firstTrainConvert = moment(trainFirst, "hh:mm").subtract(1, "years");

        var currentTime = moment();

        // calculate time between current time and first train
        var timeBetween = moment().diff(moment(firstTrainConvert), "minutes");

        // divide timeBetween by frequency of trains
        var timeApart = timeBetween % trainFreq;

        // subtract train frequency by timeApart
        var minutesAway = trainFreq - timeApart;

        // calculate next arrival
        var nextArrival = moment().add(minutesAway, "minutes");
        
        // create new row to hold train data
        var newRow = $('<tr>').append(
            $('<td>').text(trainName),
            $('<td>').text(trainDest),
            $('<td class="centered">').text('every ' + trainFreq + ' minutes'),
            $('<td class="centered">').text(moment(nextArrival).format('hh:mm a')),
            $('<td class="centered">').text(minutesAway + ' minutes')        
        );

        // add new train row to table body
        $('#trainSched > tbody').append(newRow);
        
    });

    // setup modal
    var modal = $('#myModal');

    // when the user clicks the button, open the modal 
    $('#trBtn').click(function() {
        event.preventDefault();
        modal.css("display", "block");
    });

    // when the user clicks x, close the modal
    $('.close').click(function() {
        modal.css("display", "none");
    });

});
