import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [result, setResult] = useState(null);

  const sendEmail = event => {
    event.preventDefault();
    axios
      .post('/send', { ...state })
      .then(response => {
        setResult(response.data);
        setState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch(() => {
        setResult({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      });
  };

  const onInputChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div>
      {result && (
        <p className={`${result.success ? 'success' : 'error'}`}>
          {result.message}
          <p>&nbsp;</p>
          <a href="https://pages.planestic.udistrital.edu.co/maestria-en-gestion-y-seguridad-de-la-informacion/wp-content/uploads/2021/11/Plan_de_estudios.pdf" type="button" class="btn btn-secondary">Descargar plan de estudios</a>
        </p>
      )}
      <form onSubmit={sendEmail}>
        <Form.Group controlId="name">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            placeholder="Escriba su nombre completo"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={state.email}
            placeholder="Escriba su correo electronico"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Asunto</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={state.subject}
            placeholder="Escriba el asunto"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={state.message}
            rows="3"
            placeholder="Escriba su mensaje"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="light" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
