/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var users = require('./routes/users');
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
users.setModel(UserModel);

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/user', user.list);

app.get('/users', users.index);
app.get('/users/create', users.create);
app.post('/users', users.store);
app.get('/users/:id', users.show);
app.get('/users/:id/edit', users.edit);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//var mongoose = require('mongoose');
//var users = require('./routes/users');
//
//mongoose.connect('mongodb://localhost/prueba', function(error){
//   if(error){
//      throw error; 
//   }else{
//      console.log('Conectado a MongoDB');
//   }
//});
//
//var UserSchema = mongoose.Schema({
//   email: {type: String, required: true},
//   password: {type: String, required: true}
//});
//var UserModel = mongoose.model('User', UserSchema);
//users.setModel(UserModel);
//
//
//var app = express();
//
//app.use("/public",express.static('public'));
////app.set('port', process.env.PORT || 8080);
////app.set('views', path.join(__dirname, 'views'));
//app.set("view engine", "jade");
////app.use(express.favicon());
////app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
////app.use(express.methodOverride());
//app.use(app.router);
//
//
//app.get('/', routes.index);
//app.get('/prueba', user.list);
////Rutas del Modulo Usuarios
//app.get('/users', users.index);
//app.get('/users/create', users.create);
//app.post('/users', users.store);
//app.get('/users/:id', users.show);
//app.get('/users/:id/edit', users.edit);
//app.put('/users/:id', users.update);
//app.delete('/users/:id', users.destroy);
////------------ ****** ------------
//
////app.get("/:nombre",function(req,res){
////    res.render("form",{nombre: req.params.nombre});
//////res.send("hola mundo");
////    //console.log("hola mundo");
////});
////app.get("/listado",function(req,res){
////    User.find(function(err,doc){
////    console.log(doc); 
////    res.render("listado");
////    });
////    //res.render("form",{nombre: req.params.nombre});  
//////res.send("hola mundo");
////    //console.log("hola mundo");
////});
////app.post("/users",function(req,res){
//////    console.log("hola mundo"+req.body.email);
//////    console.log("hola mundo"+req.body.password);
////    var user = new User({email: req.body.email, password: req.body.password });
////    user.save(function(){
////        res.send("Guardamos Tus Datos"); 
////    });
////});
//
//app.listen(8080);