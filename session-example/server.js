const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

//app constants
const PORT = 3000;
const username = "rowaha";
const password = "THIS_IS_OBVIOUSLY_A_REAL_PASSWORD";


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(express.static(__dirname, {index: false}));

//cookie for session has an expiration of one day
const oneDay = 1000 * 60 * 60 * 24;
app.use(session( {
    secret : "02940djownm(@)#$(@)",
    saveUninitialized : true,
    resave : false,
    cookie : {maxAge : oneDay}
}))

//routes
app.get('/', (req, res, next) => {
    if(req.session.userId){
        res.status(200).send(`Welcome User <a href="/logout"> click to logout</a>`);
    }else {
        console.log("serving index.html")
        res.sendFile('index.html', {root : __dirname});
    }
})

app.post('/user', (req, res, next) => {
    console.log("authenticating")
    console.log(req.body);
    if(req.body.username = username && req.body.password == password){
        req.session.userId = username;
        res.send(`Hey There!! Welcome ${username} <a href="/logout">click to logout</a>`)
    }else {
        res.status(403).send("Invalid username or password");
    }
})

app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
})


if(require.main){
    app.listen(PORT, () => {
        console.log(`Server is now listening on port ${PORT}`);
    })
}
