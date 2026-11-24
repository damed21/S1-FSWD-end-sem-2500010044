const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            message: "Access denied. Please login."
        });
    }

    try {

        const actualToken = token.replace("Bearer ", "");

        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;