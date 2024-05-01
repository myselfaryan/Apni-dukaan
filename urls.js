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

router.get('/admin', (req, res) => {
    console.log('Request at /admin');
    res.sendFile(path.join(__dirname, 'public/view/admin_login.html'));
});
router.get('/superuser-panel', (req, res) => {
    console.log('Request at /superuser-panel');
    res.sendFile(path.join(__dirname, 'public/view/superuser-panel.html'));
});
router.get('/manager-panel', (req, res) => {
    console.log('Request at /manager-panel');
    res.sendFile(path.join(__dirname, 'public/view/manager-panel.html'));
});

router.get('/user-management', (req, res) => {
    console.log('Request at /user-management');
    res.sendFile(path.join(__dirname, 'public/view/user-management.html'));
});



module.exports = router;