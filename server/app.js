// NPM imports
const express = require("express");
const jwt = require('jsonwebtoken');
var cors = require('cors');
const multer = require('multer');
const chalk = require('chalk');
//const config = require('config');

const { Sequelize, Model, DataTypes } = require('sequelize');


// Setup NODE APP
const app = express();

// Setup CORS for parsing Client form to json.
app.use(cors());

// Reads key from config
app.set('llave', "pestillo");

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

// DB Auth
const sequelize = new Sequelize('mariadb://admin:node@localhost:3306/node')
try {
  sequelize.authenticate();
  console.log(chalk.bgGreen.black(' Conexión en db/admin/node: CORRECTA '));
} catch (error) {
  console.error(chalk.bgRed.white(' Error en db/admin/node: ', error ));
}

// DATABASE INSERTS 
// USER INSERT //
class User extends Model {}

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

(async () => {
  // Async database reload
  await sequelize.sync({ force: true });
  // Building an example user
  const u1 = User.build({name: 'Cabesa', email: 'javi@javidiaz.es', password: 'Pestillo10'});
  await u1.save();
  //console.log(u1);
})();



// SUDADERAS INSERT //
class Sudaderas extends Model {}

Sudaderas.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_path:{
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Sudaderas' // We need to choose the model name
});

(async () => {
  // Async database reload
  await sequelize.sync({ force: true });
  // Building an example user
  const s1 = Sudaderas.build({name: 'Adidas', image_path: "public/storage/articles/default.jpeg", price: 24.99});
  const s2 = Sudaderas.build({name: 'Nike', image_path: "public/storage/articles/default.jpeg", price: 27.99});
  const s3 = Sudaderas.build({name: 'Puma', image_path: "public/storage/articles/default.jpeg", price: 21.99});
  const s4 = Sudaderas.build({name: 'Reebok Originals', image_path: "public/storage/articles/default.jpeg", price: 45.99});
  const s5 = Sudaderas.build({name: 'Vanshee Brand', image_path: "public/storage/articles/default.jpeg", price: 19.99});
  await s1.save();
  await s2.save();
  await s3.save();
  await s4.save();
  await s5.save();
  //console.log(s1);
})();

// ENDING OF DATABASE INSERTS

// PARSING application/json
app.use(express.json());
// PARSING application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// PARSING multipart/form-data
const multerdata = multer();

// storage config
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/storage/articles');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.name}.${ext}`);
  }
});

var upload = multer({ storage: multerStorage });


// Static contents
app.use('/public', express.static('public'));

// Test object

// ENTRYPOINTS!


/* USER ENTRYPOINT  */
// Login
app.get('/login', function(req, res) {
  // TODO: check user/passwd
  //if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
    const payload = {
     user: '', 
     check:  true
    };
    const token = jwt.sign(payload, app.get('llave'), {
     expiresIn: 1440
    });
    res.json({
     mensaje: 'Autenticación correcta',
     token: token
    });
   //   } else {
   //       res.json({ mensaje: "Usuario o contraseña incorrectos"})
   //   }
});

// CREATE 

app.post('/user/', function (req, res) {
  User.create(req.body)
    .then(newUser => {res.send(newUser);})
    .catch(err => console.log(err));

});

app.get('/user/', function (req, res) {
  User.findAll()
    .then(users => {res.send(users);})
    .catch(err => console.log(err));
});

// UPDATE
app.put('/user/', function (req, res) {
  User.update(req.body, {
    where: { id: req.body.id }
    })
    .then(result => {res.send({updated: result[0]});})
    .catch(err => {console.log(err)});
});


// DELETE
app.delete('/user/:id', function (req, res) {
  User.destroy({
    where: { id: req.params.id }
    })
    .then(result => {res.send({deleted: result});})
    .catch(err => {console.log(err)});
});


/* SUDADERAS ENTRYPOINT */

// Listar sudaderas 
app.get('/sudaderas/', rutasProtegidas, function (req, res) {
  Sudaderas.findAll()
    .then(sudaderas => {res.send(sudaderas);})
    .catch(err => console.log(err));
});

// Crear sudadera con imagen
app.post('/sudaderas/', upload.single('image'), function (req, res) {
  const newSudadera = req.body;
  newSudadera['image_path'] = req.file.path;
  
  Sudaderas.create(newSudadera)
    .then(newSudadera => {res.send(newSudadera);})
    .catch(err => console.log(err));
});

// PORT CONFIGURATION
const PORT = 5000
app.listen(PORT, () => {
 console.log(chalk.bgCyan.black(` Servidor ejecutado en el puerto: ${PORT} `));
});
