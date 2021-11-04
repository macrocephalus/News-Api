const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  //res.send("<h1>Главная страница</h1>");

 res.redirect(301, '/api/news');
});

module.exports = router;
