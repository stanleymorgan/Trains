
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA96_fn7V7Vagdcp6SRjMyBnaEFLBy6hWw",
    authDomain: "homework7-d60a0.firebaseapp.com",
    databaseURL: "https://homework7-d60a0.firebaseio.com",
    storageBucket: "homework7-d60a0.appspot.com",
    messagingSenderId: "879597333916"
  };
  firebase.initializeApp(config);
//variable to reference the database
var database = firebase.database();

//variables
var trainName = "";
var destination = "";
var frequency = "";
var nextArr = "";
var minAway = "";
//add button
$("#addTrain").on("click", function(){
		//event.preventDefault();
		//add new train data
	trainName =  $("#name-input").val().trim();
	destination = $("#dest-input").val().trim();
	frequency = $("#freq-input").val().trim();
	nextArr = $("#next-input").val().trim();
	//minAway = $("#min-input").val().trim();
	/////send infor to firebase
	database.ref().push({
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		nextArr: nextArr,
		minAway: minAway
	});
});
/////////////firebase watcher
database.ref().on("value", function(snapshot){
	//variable to capture snapshot in
	var user = snapshot.val();
	if(!user){
		return;
	}

	console.log(user);
	
	$("tbody").html("");
	$.each(user, function(index, value){
		console.log(value);
		var row = $("<tr>");
		var name = $("<td>");
		name.append(value.trainName);
		row.append(name);
		var dest = $("<td>");
		dest.append(value.destination);
		row.append(dest);
		var freq = $("<td>");
		freq.append(value.frequency);
		row.append(freq);
		var next = $("<td>");
		next.append(value.nextArr);
		row.append(next);
		var min = $("<td>");
		var time = new Date();
		var awayTime = time.getHours();
		var minutesAway = nextArr.value - awayTime;
		min.append(minutesAway);
		row.append(min);
		///////////////append row to body
		$("tbody").append(row);
	});
});


/*function timeNow(i) {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
  i.value = h + ':' + m;
}
<a onclick="timeNow(test1)" href="#">SET TIME</a>
<input id="test1" type="time" value="10:40"/>

<br/>
<a onclick="timeNow(test2)" href="#">SET TIME</a>
<input id="test2" type="time" value="10:40"/>*/