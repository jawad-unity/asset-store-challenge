import jwt from 'jsonwebtoken';

export default function middleware(req, res, next) {
    if (!req.get("content-type")) {
        req.headers["content-type"] = "application/json";
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({
                message: "Invalid authorization format. Use 'Bearer <token>'"
            });
        }

        const jwtSecret = 'jawad-asset-store-challenge-secret';
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable not set');
        }

        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired"
            });
        }
        // Handle other errors
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            message: "Internal server error during authentication"
        });
    }
}