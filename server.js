// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/prueba', function(error){
	if(error){
		throw error;		
	}else{
		console.log('Conectado a MongoDB');
	}
});
var UserSchema = mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true}
});
var UserModel = mongoose.model('User', UserSchema);


var privateKey = fs.readFileSync('fakekeys/privatekey.pem').toString(),
    certificate = fs.readFileSync('fakekeys/certificate.pem').toString();


var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname));

app.get("/",function(req,res){
    res.render("index");
    });
  
https.createServer({key: privateKey, cert: certificate}, app).listen(8000);
http.createServer(app).listen(8001);

console.log('running on https://localhost:8000 and http://localhost:8001');
