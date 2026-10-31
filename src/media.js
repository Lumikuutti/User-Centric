// MOCKDATA
const mediaItems = [
  {
    media_id: 9632,
    filename: 'ffd8.jpg',
    filesize: 887574,
    title: 'Favorite drink',
    description: '',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
  },
  {
    media_id: 9626,
    filename: 'dbbd.jpg',
    filesize: 60703,
    title: 'Miika',
    description: 'My Photo',
    user_id: 3671,
    media_type: 'image/jpeg',
    created_at: '2023-10-13T12:14:26.000Z',
  },
  {
    media_id: 9625,
    filename: '2f9b.jpg',
    filesize: 30635,
    title: 'Aksux',
    description: 'friends',
    user_id: 260,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T20:03:08.000Z',
  },
  {
    media_id: 9592,
    filename: 'f504.jpg',
    filesize: 48975,
    title: 'Desert',
    description: '',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
  },
  {
    media_id: 9590,
    filename: '60ac.jpg',
    filesize: 23829,
    title: 'Basement',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

const getAllMediaItems = (limit) => {
  if (limit) {
    // TODO: fix
    return mediaItems.slice(0, limit);
  }
  return mediaItems;
};

const getMediaItemById = (id) => {
  const itemFound = mediaItems.find((item) => id == item.media_id);
  return itemFound;
};

const addMediaItem = (item) => {
  item.media_id = mediaItems[0].media_id + 1;
  mediaItems.unshift(item);
};

const modifyMediaItem = (id, modifiedItem) => {
  const itemIndex = mediaItems.findIndex((item) => id == item.media_id);
  if (itemIndex > -1) {
    mediaItems[itemIndex] = {...mediaItems[itemIndex], ...modifiedItem};
    return mediaItems[itemIndex];
  }
  return false;
};

/**
 * Deletes media item from mock data array
 *
 * @param {number} id - id of the media item
 * @returns {boolean} - operation success
 */
const deleteMediaItem = (id) => {
  const itemIndex = mediaItems.findIndex((item) => id == item.media_id);
  if (itemIndex > -1) {
    mediaItems.splice(itemIndex, 1);
    return true;
  }
  return false;
};

export {
  addMediaItem,
  getAllMediaItems,
  getMediaItemById,
  modifyMediaItem,
  deleteMediaItem,
};
