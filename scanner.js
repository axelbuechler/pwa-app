import { BrowserMultiFormatReader } from '@zxing/library';

const codeReader = new BrowserMultiFormatReader();
const WEB_APP_URL = '/api/google-script';

document.getElementById('startScan').addEventListener('click', () => {
  // Kamera initialisieren
  codeReader.decodeFromInputVideoDevice(undefined, 'video')
    .then(result => {
      console.log(result.text);
      document.getElementById('scanResult').textContent = `Gescanntes Ergebnis: ${result.text}`;
      
      // Gescannten DataMatrix-Code an Google Sheet senden
      fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sheetName: 'Test',
          values: [[new Date().toISOString(), result.text]]
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Antwort von Google Apps Script:', data);
      })
      .catch(error => {
        console.error('Fehler beim Senden:', error);
      });
    })
    .catch(err => console.error('Fehler beim Scannen', err));
});

// Testdaten senden (bereits funktional)
document.getElementById('sendTestData').addEventListener('click', function() {
  console.log("Test-Daten werden gesendet...");

  fetch(WEB_APP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sheetName: 'Test', // Dein Tabellenname
      values: [["Testdatum", "Testcode"]] // Beispiel-Testdaten
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Antwort von Google Apps Script:', data);
  })
  .catch(error => {
    console.error('Fehler beim Senden:', error);
  });
});
