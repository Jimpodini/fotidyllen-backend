const express = require('express');
const app = express();
const config = require('config');

if (!config.get('jwtPrivateKey')) {
	throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}

const port = process.env.PORT || config.get('port');

require('./startup/routes')(app);
require('./startup/db')();

const server = app.listen(port, () => console.log(`listening on port ${port}..`));

module.exports = server;
