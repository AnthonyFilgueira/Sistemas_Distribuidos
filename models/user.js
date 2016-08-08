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


module.exports.User = User;