const express = require('express');
const {
    google
} = require('googleapis');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', async (req, res) => {

    const {
        nick,
        code,
        team,
        location,
        phone,
        email
    } = req.body;

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',

        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    // create clinete instance auth
    const client = await auth.getClient();

    // instance of google sheets API

    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    });


    const spreadsheetId = '11NqWwCvuONUB_bjN3QlisupRCDSKFS7bT8RkbIADA7M';

    // get metadata about the spreadsheet

    const metaData = await googleSheets.spreadsheets.get({
        auth,

        spreadsheetId,

    });

    // read rows from spreadsheets

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Respuestas',
    });

    // write rows to spreadsheets

    await googleSheets.spreadsheets.values.append({
        auth,

        spreadsheetId,

        range: 'Respuestas',

        valueInputOption: 'USER_ENTERED',

        resource: {
            values: [
                [nick, code, team, location, phone, email]
            ],
        },
    });

    res.send('Successfully sent');

});

app.listen(1337, (req, res) => console.log('running on port 1337'));