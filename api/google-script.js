// api/google-script.js

import axios from 'axios';

export default async function handler(req, res) {
  // Überprüfen, ob es sich um eine POST-Anfrage handelt
  if (req.method === 'POST') {
    try {
      // Leite die Anfrage an das Google Apps Script weiter
      const response = await axios.post('https://script.google.com/macros/s/AKfycbySRoJ18euew2zqOL3nOWqGInzOkDxL7kw5Oi32-pqU7T8r56nf_HL-hdjUq1cXAMMA1w/exec', {
        sheetName: req.body.sheetName,
        values: req.body.values
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Fehler beim Weiterleiten:', error);
      res.status(500).json({ error: 'Fehler beim Weiterleiten der Anfrage' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Methode ${req.method} nicht erlaubt`);
  }
}
