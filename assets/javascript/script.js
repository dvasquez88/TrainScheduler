$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBI9smn9qVSuaW6G38xhFYD-lY4TWTP31U",
        authDomain: "my-first-database-d2beb.firebaseapp.com",
        databaseURL: "https://my-first-database-d2beb.firebaseio.com",
        projectId: "my-first-database-d2beb",
        storageBucket: "my-first-database-d2beb.appspot.com",
        messagingSenderId: "509480588394"
    };
    firebase.initializeApp(config);

    $('#addTrainBtn').on("click", function(){

        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var trainTimeInput = moment($("trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequencyInput = $("#frequencyInput").val().trim();

        //testing
        console.log(trainName);
        console.log(destination);
        console.log(trainTimeInput);
        console.log(frequencyInput);

        //creating object for holding train data
        var newTrain = {
            name: trainName,
            destination: destination,
            trainTime: trainTimeInput,
            frequency: frequencyInput,
        }

        trainData.push(newTrain);

        $("#trainNameInput").val("");
        $("#desintationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

        //prevents refresh
        return false;
    });

    trainData.on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());

        //assign firebase var to snapshot

        var firebaseName = childSnapshot.val().name;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSNapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");  firebaseFrequency ;
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

        //test times and info
        console.log(minutes);
        console.log(nextTrainArrival);
        console.log(moment().format("hh:mm A"));
        console.log(moment().format("X"));

        $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    });
});