import promisePool from '../utils/database.js';

const fetchAllMediaItems = async (limit) => {
  try {
    let result;
    if (limit) {
      result = await promisePool.query('SELECT * FROM MediaItems LIMIT ' + limit);
    } else {
      result = await promisePool.query('SELECT * FROM MediaItems');
    }
    const [rows] = result;
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMediaItemById = async (id) => {
  try {
    const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
    const params = [id];
    const result = await promisePool.execute(sql, params);
    const [rows] = result;
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addMediaItem = async (media) => {
  if (!media.description) {
    media.description = '';
  }
  const {user_id, filename, size, mimetype, title, description} = media;
  const sql = `INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const rows = await promisePool.execute(sql, params);
    return rows[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// Päivittää median otsikon ja kuvauksen tietokantaan
const modifyMediaItem = async (id, modifiedItem) => {
  const {title, description} = modifiedItem;
  const sql = 'UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ?';
  const params = [title, description, id];
  try {
    const [result] = await promisePool.execute(sql, params);
    if (result.affectedRows === 0) {
      return false;
    }
    return await findMediaItemById(id);
  } catch (e) {
    console.error('error', e.message);
    return false;
  }
};

// Poistaa median tietokannasta id:n perusteella
const deleteMediaItemById = async (id) => {
  const sql = 'DELETE FROM MediaItems WHERE media_id = ?';
  const params = [id];
  try {
    const [result] = await promisePool.execute(sql, params);
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
  addMediaItem,
  fetchAllMediaItems,
  findMediaItemById,
  modifyMediaItem,
  deleteMediaItemById,
};