const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const token = req.header['x-auth-token'];
	if (!token) return res.send('Missing token');

	try {
		const verification = jwt.verify(token, config.get('jwtPrivateKey'));
		next();
	} catch (err) {
		return res.status(400).send('Invalid token');
	}

	
}
