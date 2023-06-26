const express = require('express');
const path = require('path');
const router = express.Router();

router.get('^/$|/user(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'user.html'));
});

module.exports = router; 