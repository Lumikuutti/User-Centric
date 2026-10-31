// MOCKDATA
const users = [
  {
    user_id: 260,
    username: 'VCHar',
    password: '********',
    email: 'vchar@example.com',
    user_level_id: 1,
    created_at: '2020-09-12T06:56:41.000Z',
  },
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
  {
    user_id: 3609,
    username: 'Anon5468',
    password: '********',
    email: 'x58df@example.com',
    user_level_id: 3,
    created_at: '2023-04-02T05:56:41.000Z',
  },
];

const getAllUsers = (limit) => {
  if (limit) {
    return users.slice(0, limit);
  }
  return users;
};

const getUserById = (id) => {
  const userFound = users.find((item) => id == item.user_id);
  return userFound;
};

const addUser = (item) => {
  item.user_id = users[0].user_id + 1;
  users.unshift(item);
};

const modifyUser = (id, modifiedItem) => {
  const itemIndex = users.findIndex((item) => id == item.user_id);
  if (itemIndex > -1) {
    users[itemIndex] = {...users[itemIndex], ...modifiedItem};
    return users[itemIndex];
  }
  return false;
};

/**
 * Deletes media item from mock data array
 *
 * @param {number} id - id of the media item
 * @returns {boolean} - operation success
 */
const deleteUser = (id) => {
  const itemIndex = users.findIndex((item) => id == item.user_id);
  if (itemIndex > -1) {
    users.splice(itemIndex, 1);
    return true;
  }
  return false;
};

export {getAllUsers, getUserById, addUser, modifyUser, deleteUser};
