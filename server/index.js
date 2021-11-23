const path = require('path');
const express = require('express');
const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/form/send', (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email, // sender address
      to: process.env.email_to, // list of receivers
      subject: req.body.subject, // Subject line
      html: `
      <p>Tienes un nuevo contacto sobre la maestria.</p>
      <h3>Detalles del contacto</h3>
      <ul>
        <li>Nombre: ${req.body.name}</li>
        <li>Correo electronico: ${req.body.email}</li>
        <li>Asunto: ${req.body.subject}</li>
        <li>Mesnaje: ${req.body.message}</li>
      </ul>
      `
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Algo salio mal intenta mas tarde'
        });
      } else {
        res.send({
          success: true,
          message: 'Gracias por enviar la informacion pronto nos contactaremos'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Algo salio mal intenta mas tarde'
    });
  }
});

app.listen(3030, () => {
  console.log('server start on port 3030');
});
