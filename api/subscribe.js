// Usaremos require para compatibilidad (CommonJS)
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const { email, name, phone } = req.body;
  if (!email || !name) {
    res.status(400).json({ error: 'Email y nombre son requeridos.' });
    return;
  }

  // Datos que enviaremos a Mailchimp
  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: name,
      PHONE: phone || ''
    }
  };

  // Obtén estos valores desde variables de entorno en tu plataforma de despliegue
  const API_KEY = process.env.MAILCHIMP_API_KEY; // Ejemplo: "abcd1234-us4"
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID; // El ID de tu audiencia en Mailchimp

  if (!API_KEY || !AUDIENCE_ID) {
    res.status(500).json({ error: 'Falta la configuración de Mailchimp.' });
    return;
  }

  // El data center se extrae de la API_KEY (todo lo que sigue al guion)
  const DATACENTER = API_KEY.split('-')[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  try {
    const mailchimpRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!mailchimpRes.ok) {
      const errorData = await mailchimpRes.json();
      res.status(mailchimpRes.status).json({ error: errorData.detail || 'Error al suscribir.' });
    } else {
      res.status(200).json({ success: '¡Suscripción exitosa!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};
