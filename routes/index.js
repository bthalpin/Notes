const express = require('express');
const app = express();
const apiRoutes = require('./api/apiRoutes');
const htmlRoutes = require('./html/htmlRoutes');

// Endpoint: /
app.use('/api',apiRoutes)
app.use('/notes',htmlRoutes)


module.exports = app;