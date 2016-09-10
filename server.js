//Dopunski nodejs moduli
var express = require('express');
var fs = require('fs');
var app = express();

//Konfiguracija porta za aplikaciju (local & Heroku)
var server_port = process.env.PORT || 8080 ;
	
//Konfiguracija engine-a
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/public');

/** API ruta **/
app.get('/', function(req, res){

	//Sinkrono čitanje datoteke i slanje 
	var json = JSON.parse(fs.readFileSync('public/api-data.json', 'utf8'));
	res.send(json);
	res.end();
	
});

//Konfiguracija servera
var server = app.listen(server_port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app @ :http://localhost:8080/');
});

app.use(express.static(__dirname + '/public'));//Koristi sve iz folder 'public'

