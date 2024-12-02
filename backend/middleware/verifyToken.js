const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Get the token from the cookies

    if (!token) {
        return res.status(403).json({ message: "Access Denied. No Token Provided." });
    }

    try {
        const decoded = jwt.verify(token, "JWT_secret_key"); // Verify the token
        req.user = decoded; // Attach the decoded token data to `req.user`
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid Token." });
    }
}

export default verifyToken
