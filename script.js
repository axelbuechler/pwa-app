

document.getElementById('sendTestBtn').addEventListener('click', function() {
    const sheetID = '1DaL69MpN-Oeo1-mzHums2F6OlK5vVr67SnNkHo5UpI0';
    const apiURL = `https://script.google.com/macros/s/AKfycbySRoJ18euew2zqOL3nOWqGInzOkDxL7kw5Oi32-pqU7T8r56nf_HL-hdjUq1cXAMMA1w/exec`;

    // Testdaten senden
    fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [["Test Datum", "Test Code"]] })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = 'Data sent successfully!';
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
});

function handleCredentialResponse(response) {
    document.getElementById('result').textContent = `Anmeldedaten erhalten: ${response.credential}`;
}
