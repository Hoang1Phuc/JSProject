var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const express = require('express');
const router = express.Router();

// Import routes cho các mô-đun khác
const productRoutes = require('./products');
const categoryRoutes = require('./category'); // Thêm dòng này để sử dụng category routes

// Sử dụng các route
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes); // Thêm dòng này để sử dụng category routes


module.exports = router;
