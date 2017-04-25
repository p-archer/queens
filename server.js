const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.static(__dirname + '/src/'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(morgan('dev'));

app.listen(3000, () => {
	console.log('server started');
});
