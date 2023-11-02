const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// token is passed in the header section with the auth field 
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            // we decoded the information from the token and then user(jisne login kiya h) from decoded info and the req user(jiski current info dekhni h) will be equal to the decoded user
            req.user = decoded.user;
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("User is not autherized or token is missing");
        }
    }
});

module.exports = validateToken;