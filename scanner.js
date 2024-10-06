// scanner.js

const WEB_APP_URL = '/api/google-script';

// Funktion, um Test-Daten an die Vercel Function zu senden
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

