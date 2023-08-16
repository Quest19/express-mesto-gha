const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/UnauthorisedError');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorisedError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      throw new UnauthorisedError('Необходима авторизация');
    }

    req.user = payload; // записываем пейлоуд в объект запроса

    next(); // пропускаем запрос дальше
  } catch (err) {
    return next(err); // отправляем ошибку в обработчик ошибок
  }
};
