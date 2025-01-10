import express from "express";

export default function Middleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
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
