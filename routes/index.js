var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ticketsModel = require ('../models/ticketsModel');
var cloudinary = require ('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
 tickets = await ticketsModel.getTickets();
 tickets = tickets.splice (0,5);
 res.render('index',{
  tickets
  });

});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  console.log(req.body)

  var obj = {
    to: 'lucianozink@gmail.com',
    subject: 'contacto desde la web',
    html: nombre + " " + "se contacto y quiere mas info a este correo: " + email + ".<br> ademas, hizo la siguiente consulta: " + mensaje
  }
   
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'mensaje enviado correctamente',
  });

});


module.exports = router;
