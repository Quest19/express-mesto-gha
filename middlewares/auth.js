const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/UnauthorisedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorisedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorisedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
