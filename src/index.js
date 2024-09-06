const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {db} = require('./model/dbConnnection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//read
app.get('/api/readData', (req,res) =>{
    const sqlQuery = "SELECT * FROM user";

    db.query(sqlQuery, (err, result) =>{
        if (err){
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

app.get('/api/readUser/:user_email', (req, res) =>{
    const userEmail = req.params.user_email;

    const sqlQuery = "SELECT * FROM user WHERE user_email = ?";
    db.query(sqlQuery, userEmail, (err, result) =>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

// ####

// create
app.post('/api/createUser', (req, res) => {
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;

    const sqlQuery = "INSERT INTO user (user_name, user_email, user_password) VALUE (?, ?, ?)";
    db.query(sqlQuery, [userName, userEmail, userPassword], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});
// ####

// update
app.put('/api/updateUser', (req, res) =>{
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;

    const sqlQuery = "UPDATE user SET user_name = ?, user_password = ? WHERE user_email = ?";
    db.query(sqlQuery, [userName, userPassword, userEmail], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});
// ####

// delete
app.delete('/api/deleteUser', (req, res) => {
    const userId = req.body.user_id;

    const sqlQuery = "DELETE FROM user WHERE user_id = ?";
    db.query(sqlQuery, userId, (err, result) =>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});
// ####


app.listen(3001, () => {
    console.log("Server berhasil berjalan pada port 3001!");
});