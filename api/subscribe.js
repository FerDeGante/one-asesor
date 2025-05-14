const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }
  const { name, email, phone } = JSON.parse(event.body);
  if (!name || !email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Nombre y correo son requeridos.' }) };
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: { FNAME: name, PHONE: phone || '' }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: result.detail || 'Error al suscribir.' })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: '¡Suscripción exitosa!' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al conectar con Mailchimp.' })
    };
  }
};