import { BrowserMultiFormatReader } from '@zxing/library';

const codeReader = new BrowserMultiFormatReader();
let selectedDeviceId;

codeReader
  .listVideoInputDevices()
  .then(videoInputDevices => {
    // Zeige verfügbare Kameras an
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

            // Sende die gescannten Daten an den Server
            fetch('/api/google-script', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sheetName: 'Test', // Dein Tabellenname
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

