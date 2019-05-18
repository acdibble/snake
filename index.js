const express = require('express');

const app = express();

app.use(express.static('dist'));

app.use('/assets', express.static('assets'));

app.listen(process.env.PORT || 3000);
