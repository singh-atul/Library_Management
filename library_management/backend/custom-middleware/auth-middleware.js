
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    const tokenOnly = (bearerToken || '').split('Bearer ')[1];

    if(!tokenOnly) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: true
        });
    }

    try {
        const decoded = jwt.verify(tokenOnly, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch(e) { 
        return res.status(403).json({
            message: 'Forbidden',
            error: true
        });
    }
}