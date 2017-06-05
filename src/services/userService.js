import BaseService from './baseService';

class UserService extends BaseService {
  constructor() {
    super();
  }

  create(user) {
    this._query = `INSERT INTO users (nickname, email, fullname, about) 
    VALUES (\'${user.nickname}\', \'${user.email}\', \'${user.fullname}\', \'${user.about}\');`;

    return this._dataBase.none(this._query);
  }

  update(user) {
    this._query = `UPDATE users SET 
    fullname = COALESCE(${user.fullname ? `'${user.fullname}'` : 'NULL'}, fullname), 
    email = COALESCE(${user.email ? `'${user.email}'` : 'NULL'}, email),
    about = COALESCE(${user.about ? `'${user.about}'` : 'NULL'}, about) 
    WHERE LOWER(nickname) = LOWER(\'${user.nickname}\')`;

    return this._dataBase.oneOrNone(this._query);
  }

  getUser(nickname, email) {
    this._query = `SELECT * FROM users WHERE LOWER(nickname) = LOWER(\'${nickname}\') OR 
    LOWER(email) = LOWER(\'${email}\');`;

    return this._dataBase.many(this._query);
  }

  getUserByNickname(nickname) {
    this._query = `SELECT * FROM users WHERE LOWER(nickname) = LOWER(\'${nickname}\');`;

    return this._dataBase.one(this._query);
  }

  getUserByEmail(email) {
    this._query = `SELECT * FROM users WHERE LOWER(email) = LOWER(\'${email}\');`;

    return this._dataBase.none(this._query);
  }

  getNickname(nickname) {
    this._query = `SELECT u.nickname FROM users u WHERE lower(nickname) = lower('${nickname}');`;

    return this._dataBase.one(this._query);
  }
}

const userService = new UserService();
export default userService;
