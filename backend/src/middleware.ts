export default function Middleware(req, res, next) {
    if (!req.get("content-type")) {
        req.headers["content-type"] = "application/json";
    }

    if (!req.headers.authorization ||
        req.headers.authorization !== "Bearer todo_token"
    ) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
}
