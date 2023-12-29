const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ status: false, message: "No token provided" });
        }

        jwt.verify(token, "my-secret-key", (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.status(401).send({ status: false, message: err.message });
            }

            //console.log("hii",decodedToken);
            req.name = decodedToken.name;
            console.log("Auth name:",req.name);
            req.userId = decodedToken.userId;

            next();
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "Server error in authentication", error: error.message });
    }
}

module.exports = authentication;
