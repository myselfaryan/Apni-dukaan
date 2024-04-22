const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', (req, res) => {
    console.log('Request at /ping');
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('/login', (req, res) => {
    console.log('Request at /login');
    res.sendFile(path.join(__dirname, 'public/view/login.html'));
});

router.get('/verify-otp', (req, res) => {
    console.log('Request at /verify-otp');
    res.sendFile(path.join(__dirname, 'public/view/verify-otp.html'));
});

router.get('/main', (req, res) => {
    console.log('Request at /main');
    res.sendFile(path.join(__dirname, 'public/view/main.html'));
});



module.exports = router;