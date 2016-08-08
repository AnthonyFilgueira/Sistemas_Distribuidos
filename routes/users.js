var User;

exports.setModel = function(modelo){
   User = modelo;
};

exports.index = function(req, res){
    User.find({}, function (error, users) {
        if (error) {
            res.send('Ha surgido un error.');
        } else {
            res.render('users/index', {
                users: users
            });
        }
    })
};

exports.create = function(req, res){
    res.render('users/save', {
        put: false,
        action: '/users/',
        user: new User({
            email: '',
            password: ''
        })
    });
};

exports.store = function(req, res){
   var user = new User({
      email: req.body.email,
      password: req.body.password
   });
   user.save(function(error, documento){
      if(error){
         res.send('Error al intentar guardar el Usuario.');
      }else{ 
         res.redirect('/users');
      }
   });
};

exports.show = function(req, res){
   User.findById(req.params.id, function(error, documento){
      if(error){
         res.send('Error al intentar ver el Usuario.');
      }else{
         res.render('users/show', {
            user: documento
         });
      }
   });
};

exports.edit = function(req, res){
   User.findById(req.params.id, function(error, documento){
      if(error){
         res.send('Error al intentar ver el Usuario.');
      }else{
         res.render('users/save', {
            put: true,
            action: '/users/' + req.params.id,
            user: documento
         });
      }
   });
};

exports.update = function(req, res){
   User.findById(req.params.id, function(error, documento){
      if(error){
         res.send('Error al intentar modificar el Usuario.');
      }else{
         var user = documento;
         user.email = req.body.email;
         user.password = req.body.password;
         user.save(function(error, documento){
            if(error){
               res.send('Error al intentar guardar el Usuario.');
            }else{ 
               res.redirect('/users');
            }
         });
      }
   });
};

exports.destroy = function(req, res){
    User.remove({_id: req.params.id}, function (error) {
        if (error) {
            res.send('Error al intentar eliminar el Usuario.');
        } else {
            res.redirect('/users');
        }
    });
};


