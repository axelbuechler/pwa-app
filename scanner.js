const codeReader = new ZXing.BrowserMultiFormatReader();
let selectedDeviceId;

// Liste der Video-Eingabegeräte abrufen (Kameras)
codeReader.listVideoInputDevices()
  .then(videoInputDevices => {
    const sourceSelect = document.createElement('select');
    sourceSelect.id = 'sourceSelect';
    videoInputDevices.forEach(device =>
      sourceSelect.appendChild(new Option(device.label, device.deviceId))
    );
    document.body.appendChild(sourceSelect);

    sourceSelect.onchange = () => {
      selectedDeviceId = sourceSelect.value;
    };

    document.getElementById('startScan').addEventListener('click', () => {
      if (selectedDeviceId) {
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            console.log(result.text);
            document.getElementById('scanResult').textContent = result.text;

            // Test-Daten an die Vercel Function senden
            fetch('/api/google-script', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sheetName: 'Test', 
                values: [[new Date().toISOString(), result.text]],
              }),
            })
              .then(response => response.json())
              .then(data => {
                console.log('Antwort von Google Apps Script:', data);
              })
              .catch(error => {
                console.error('Fehler beim Senden:', error);
              });
          }

          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
          }
        });
      }
    });
  })
  .catch(err => console.error(err));

// Funktion, um Test-Daten an die Google Sheets zu senden
document.getElementById('sendTestData').addEventListener('click', function() {
  console.log("Test-Daten werden gesendet...");

  fetch('/api/google-script', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sheetName: 'Test', 
      values: [["Testdatum", "Testcode"]] 
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


