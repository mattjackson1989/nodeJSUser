/* index.js */


//call modules
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var editUser = false;

var app = express();

app.set('port',(process.env.PORT) || 3000);
//set up the view
app.set('views', path.join(__dirname, 'views'));
//setting view engine to ejs--therefore, changed the .html files to .ejs
app.set('view engine','ejs');

//This is grabbing the json file
var fileToHost = '/';
var USER_FILE = path.join(path.join(__dirname, fileToHost), 'users.json');

//grab json object
var obj = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
//DEBUG
//console.log(obj);


//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//display static page
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/routes'));


// GET all static pages/js/template data ->not needed 
//Serve the static html page 
app.get('/', function(req, res){
	var templateData = {title: "User Management"};
	res.render('index.html', templateData);
	res.send('load-users.js');
});

//FIRST ENDPOINT--
//Get api/users -- 
//Populate the table for initial response or redirecting from 'submit'


app.get('/api/users', function(req, res){
	//replace this with json route
	var parsedJson;
	parsedJson = fs.readFileSync('./users.json');
	var contents = JSON.stringify(parsedJson);
	console.log(parsedJson);
	res.send(parsedJson);

	

});

//Display add-edit-user.html
app.get('/add-edit-user.html', function(req, res){
	res.render('add-edit-user.html');

});

//SECOND ENDPOINT--
//Get api/user/:id --
//This is used to populate the form for when you are editing a single user
//GLOBAL VAR
var currentUser;

app.get('/api/user/:id', function(req, res){
	editUser = true;
	for(var i = 0; i < obj.length; i++){
		if(obj[i].id == req.params.id){
			currentUser = obj[i];
			res.send(obj[i]);
		}
	}
});



//THIRD ENDPOINT--
//POST api/user --
//This is used when you wish to add a new user into the JSON file
app.post('/api/user', function(req, res){
	
	if(editUser){
	for(var i = 0; i<obj.length;i++){
		if(obj[i].id == req.body.id){
			//editing existing user
		obj[i] = req.body;
		var configJSON = JSON.stringify(obj);
		fs.writeFileSync('./users.json', configJSON);

		console.log(configJSON);
		
		res.redirect('/');
		}
	
	};
    }
	
	//For ADDING A NEW USER
	if(editUser == false){
	//Turn contents into JSON string
		console.log('Creating new user');
		var contents = req.body;
		contents.id = Date.now();
		JSON.stringify(contents);
		console.log(contents);
		//push to the end of the obj
		obj.push(contents);
		//DEBUG
		console.log(obj);
		var configJSON = JSON.stringify(obj);

		fs.writeFileSync('./users.json', configJSON);

		
		res.redirect('/');
		}
		editUser = false;

});
//FOURTH ENDPOINT--
//DELETE api/user/:id -- 
//This is used when you wish to remove a user from the JSON file
app.delete('/api/user/:id', function(req, res){
	for(var i = 0; i < obj.length; i++){
		if(obj[i].id == req.params.id){

			
			
			
			console.log("user deleted: " + obj[i].fname + " " + obj[i].lname);
			obj.splice(i, 1);
			console.log(obj);
			var configJSON = JSON.stringify(obj);

			fs.writeFileSync('./users.json', configJSON);
			res.send(200);
		}
	}
	

});

//Port listening
var port = 3000;

//app.listen(port);
console.log("Listening on port 3000");