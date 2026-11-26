import {
  addUser,
  deleteUserById,
  fetchAllUsers,
  findUserById,
  modifyUser,
} from './user-model.js';

const getUsers = async (req, res) => {
  const users = await fetchAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({error: 404, message: 'User not found'});
  }
};

const postUser = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({error: 400, message: 'Username, password or email missing.'});
  }
  const user_id = await addUser(req.body);
  if (user_id.error) {
    return res.status(500).json(user_id);
  }
  res.status(201).json({message: 'New user added', user_id});
};

const putUser = async (req, res) => {
  const updatedUser = await modifyUser(req.params.id, req.body);
  if (!updatedUser) {
    return res.status(404).json({error: 404, message: 'User not found'});
  }
  res.json({message: 'User updated', updatedUser});
};

const deleteUser = async (req, res) => {
  const success = await deleteUserById(req.params.id);
  if (!success) {
    return res.status(404).json({error: 404, message: 'User not found'});
  }
  res.json({message: 'User deleted'});
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser
};