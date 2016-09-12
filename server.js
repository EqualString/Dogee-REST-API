//Dopunski nodejs moduli
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var jsonfile   = require('jsonfile');
var jsonupdate = require('json-update');

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
	
	res.send(json.dog); //Info o psu
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
app.post('/mydog-lokacije', tokenTest, function(req,res){

	var json = jsonfile.readFileSync(file); 
	
	var data = {
		"metaData": json.lokacije
	};
	
	res.send(data);
	res.end();

});
app.post('/mydog-notifikacije',tokenTest, function(req,res){

	var json = jsonfile.readFileSync(file); 
	
	var data = {
		"metaData":{
			"cijepljenje":json.cijepljenje,
			"hranjenje":json.hranjenje,
			"setnja":json.setnja
		}
	};
	
	res.send(data);
	res.end();
	
});

//Update ruta
app.post('/mydog-update', tokenTest, updateFields);

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

function updateFields(req,res){
	
	var data = JSON.parse(req.body.metaData); //Novi podaci koji se spremaju
	var fieldName = req.body.fieldName; //Naziv fielda na kojem se vrši update
	
	if (fieldName == "user"){
	
		jsonupdate.update(file, { user: data  }, function(err, obj) {
			if (typeof err !== "undefined" && err !== null) {
			
				var config = {
					"status" : false,
					"error" : err.message
				};
				res.send(config);
				res.end();
				
			}
			else{
			
				var config = {
					"status" : true
				};
				
				res.send(config);
				res.end();
				
			}
		});
	
	}
	else if ( fieldName == "dog" ){
	
		jsonupdate.update(file, { dog: data  }, function(err, obj) {
			if (typeof err !== "undefined" && err !== null) {
			
				var config = {
					"status" : false,
					"error" : err.message
				};
				res.send(config);
				res.end();
				
			}
			else{
			
				var config = {
					"status" : true
				};
				
				res.send(config);
				res.end();
				
			}
		});
	
	}
	else if ( fieldName == "cijepljenje" ){
	
		jsonupdate.update(file, { cijepljenje: data  }, function(err, obj) {
			if (typeof err !== "undefined" && err !== null) {
			
				var config = {
					"status" : false,
					"error" : err.message
				};
				res.send(config);
				res.end();
				
			}
			else{
			
				var config = {
					"status" : true
				};
				
				res.send(config);
				res.end();
				
			}
		});
	
	}
	else if ( fieldName == "hranjenje" ){
	
		jsonupdate.update(file, { hranjenje: data  }, function(err, obj) {
			if (typeof err !== "undefined" && err !== null) {
			
				var config = {
					"status" : false,
					"error" : err.message
				};
				res.send(config);
				res.end();
				
			}
			else{
			
				var config = {
					"status" : true
				};
				
				res.send(config);
				res.end();
				
			}
		});
	
	}
	else if ( fieldName == "setnja" ){
	
		jsonupdate.update(file, { setnja: data  }, function(err, obj) {
			if (typeof err !== "undefined" && err !== null) {
			
				var config = {
					"status" : false,
					"error" : err.message
				};
				res.send(config);
				res.end();
				
			}
			else{
			
				var config = {
					"status" : true
				};
				
				res.send(config);
				res.end();
				
			}
		});
	
	}else{
		
		var config = {
			"status": false,
			"error": "wrong-fieldName"
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

