import promisePool from '../utils/database.js';

const fetchAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findUserById = async (id) => {
  try {
    const sql = 'SELECT * FROM Users WHERE user_id = ?';
    const [rows] = await promisePool.execute(sql, [id]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addUser = async (user) => {
  const {username, password, email, user_level_id} = user;
  // Jos user_level_id ei anneta, oletuksena 2 (User)
  const level = user_level_id || 2;
  const sql = `INSERT INTO Users (username, password, email, user_level_id)
               VALUES (?, ?, ?, ?)`;
  const params = [username, password, email, level];
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows.insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const modifyUser = async (id, modifiedUser) => {
  const {username, password, email} = modifiedUser;
  const sql = 'UPDATE Users SET username = ?, password = ?, email = ? WHERE user_id = ?';
  const params = [username, password, email, id];
  try {
    const [result] = await promisePool.execute(sql, params);
    if (result.affectedRows === 0) {
      return false;
    }
    return await findUserById(id);
  } catch (e) {
    console.error('error', e.message);
    return false;
  }
};

const deleteUserById = async (id) => {
  const sql = 'DELETE FROM Users WHERE user_id = ?';
  try {
    const [result] = await promisePool.execute(sql, [id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (e) {
    console.error('error', e.message);
    return false;
  }
};

export {
  fetchAllUsers,
  findUserById,
  addUser,
  modifyUser,
  deleteUserById
};