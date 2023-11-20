const jwt = require("jsonwebtoken");
// const { promisify } = require('util')
const jwt_key = process.env.APP_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: "Token não informado" });

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).send({ error: "Erro no token" });

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test(bearer))
    return res.status(401).send({ error: "Token malformatado" });

  jwt.verify(token, jwt_key, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token inválido" });

    req.userId = decoded.id;

    return next();
  });
};
