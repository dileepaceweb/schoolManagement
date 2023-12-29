const authorization = async (req, res, next) => {
    try {
      const data = req.body;
      const name=data.name
      console.log("Dileep:", name);
      const rName = req.name;
      console.log("new:", rName);
    
      if (name === rName) {
        next();
      } else {
        res.status(403).send({ msg: "User not authorized" });
      }
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  };
  
  module.exports = authorization;
  