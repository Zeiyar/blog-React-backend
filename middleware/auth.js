const jwt = require("jsonwebtoken");

function auth (req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({message : "You need to connect before you do such a thing"});

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
        if (err) return res.status(400).json({message : "Invalid token, please reconnect"});
        req.user = decoded
        next();
    });
}

module.exports = auth;