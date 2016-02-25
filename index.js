var express = require('express');
var app = express();
var fs = require("fs");

//list of plushie names loaded before app.get for better performance
var namesList = JSON.parse(fs.readFileSync("./public/data/names.json"));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

//get personality selected and return a list of matching names
app.get('/plushies', function(request, response) {

  var returnList = []; //matching names returned to front-end
  var matchingList = []; //matching names, index only
  var maxNames = 5; //number of names return to return

  //this assumes all three are passed and are strings true or false
  var tweeInput = request.query.twee;
  var pleasantInput = request.query.pleasant;
  var shyInput= request.query.shy;

  //convert inputs to boolean, future version will search database by slider values
  function convertPersonality (personalityInput){
    if(personalityInput <  6 ){
      return true;
    } else {
      return false;
    }
  }

  //run conversion on all three personality traits
  tweeInput = convertPersonality(tweeInput);
  pleasantInput = convertPersonality(pleasantInput);
  shyInput = convertPersonality(shyInput);

  //get list of names that matches the selected personality, index only
  for (var i = 0; i < namesList.length; i++){
  	if(namesList[i].twee ==  tweeInput || namesList[i].pleasant == pleasantInput || namesList[i].shy == shyInput){
		  matchingList.push(i);
    }
  }

  //randomly select names up to maxNames, or if matching less than maxNames return all  
  for(var i = 0; i < Math.min(maxNames, matchingList.length); i++){
  	
    //randomly select an index
    var randomIndex = Math.floor(Math.random() * (matchingList.length));
  	var nameListIndex = matchingList[randomIndex];

    //put random name in returnList
    returnList.push(namesList[nameListIndex].name);
    
    //remove selected name from list of matching so it's not selected twice
    matchingList.splice(randomIndex, 1);
	}
	
  //return names to front-end
  response.setHeader('Content-Type', 'application/json');
	response.send(JSON.stringify(returnList));

});

//local
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


