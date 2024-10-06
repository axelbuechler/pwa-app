document.getElementById('sendTestBtn').addEventListener('click', function() {
  console.log("Test-Daten werden gesendet...");

  fetch('https://script.google.com/macros/s/AKfycbySRoJ18euew2zqOL3nOWqGInzOkDxL7kw5Oi32-pqU7T8r56nf_HL-hdjUq1cXAMMA1w/exec?action=appendData&sheetName=Test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [["Testdatum", "Testcode"]]
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Fehler beim Senden: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    alert('Test-Daten erfolgreich gesendet.');
  })
  .catch(error => {
    console.error('Fehler beim Senden:', error);
  });
});
