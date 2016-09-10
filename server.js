//Dopunski nodejs moduli
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var jsonfile   = require('jsonfile');

var file = 'data/api-data.json';
var app_token = '6WjVwnhfh9m2jT385X21aJrL5z0zM375';

//Konfiguracija porta za aplikaciju (local & Heroku)
var server_port = process.env.PORT || 8080 ;
	
//Konfiguracija engine-a
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/data');

app.use(bodyParser.json()); // support za json encoded body
app.use(bodyParser.urlencoded({ extended: true })); // support za encoded body

/** API **/

//Login&Logout
app.post('/login', logIn);
app.post('/logout', tokenTest, function(req,res){

	var config = {
		"username": req.body.username,
		"status": true,
		"token": ""
	};
		
	res.send(config);
	res.end();
	
});

//Dohvaćanje informacija
app.post('/mydog-info', tokenTest, function(req,res){

	var json = jsonfile.readFileSync(file); //Dohvati json
	
	var data = {
		"metaData": json.dog
	};
	
	res.send(data);
	res.end();

});
app.post('/mydog-cijepljenje', tokenTest, function(req,res){

	var json = jsonfile.readFileSync(file); 
	
	var data = {
		"metaData": json.cijepljenje
	};
	
	res.send(data); 
	res.end();

});
app.post('/mydog-hranjenje', tokenTest, function(req,res){

	var json = jsonfile.readFileSync(file); 
	
	var data = {
		"metaData": json.hranjenje
	};
	
	res.send(data); 
	res.end();

});
app.post('/mydog-setnja', tokenTest, function(req,res){

	var json = jsonfile.readFileSync(file); 
	
	var data = {
		"metaData": json.setnja
	};
	
	res.send(data);
	res.end();

});

//Update rute


//Dodatne funkcije
function logIn(req,res) {
	
	var json = jsonfile.readFileSync(file); //Dohvati json
	
	if ((json.user.username == req.body.username)&&(json.user.password == req.body.password)){
	
		var config = {
			"username": req.body.username,
			"status": true,
			"token": app_token
		};
		
		res.send(config); //Vrati token
		res.end();
	}
	else {
	
		var config = {
			"username": req.body.username,
			"status": false
		};
		
		res.send(config);
		res.end();
	}
	
}

function tokenTest(req, res, next){

	if(req.body.token == app_token){
		
		next();
		
	}else{
	
		var config = {
			"username": req.body.username,
			"status": false,
			"token": "wrong-token"
		};
		res.send(config);
		res.end();
		
	} 
	
}	

//Konfiguracija servera
var server = app.listen(server_port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app @ :http://localhost:8080/');
});

app.use(express.static(__dirname + '/data'));//Koristi sve iz folder 'data'

