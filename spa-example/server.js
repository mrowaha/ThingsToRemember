const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const exp = require('constants');

dotenv.config({path: "./.env"})
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const app = express();

app.use(express.static(path.resolve(__dirname, 'src', 'static'), {extensions: ["js"]}));

app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
})

if(require.main){
    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server running at http://${HOSTNAME}:${PORT}`);
    })
}