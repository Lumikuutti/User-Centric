-- Insert Permissions
INSERT INTO Permissions (user_level_id, download, comment, edit_users, delete_media) 
  VALUES (1, 1, 1, 0, 1),
         (2, 1, 1, 1, 1),
         (3, 1, 0, 0, 0);

-- Insert users
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);
INSERT INTO Users VALUES (3609, 'Anon5468', 'secret345', 'x58df@example.com', 3, null);

-- Inserting multiple records at once to MediaItems
INSERT INTO MediaItems (media_id, filename, filesize, title, description, user_id, media_type) 
  VALUES (9632, 'ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
         (9626, 'dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         (9625, '2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

-- Insert MediaItemData
INSERT INTO MediaItemData (media_id, favorites, views) 
  VALUES (9632, 1, 76),
         (9626, 3, 65),
         (9625, 0, 0);

-- Add test queries here
-- Select all media items along with the username of the owner using a (inner) join:
SELECT MediaItems.media_id, MediaItems.filename, Users.username 
  FROM MediaItems 
  JOIN Users ON MediaItems.user_id = Users.user_id;

-- Select public user data
SELECT username, email FROM Users;

-- Select users permissions showing booleans as TRUE or FALSE
SELECT Users.username,
    CASE WHEN Permissions.comment = 1 THEN 'TRUE' ELSE 'FALSE' END AS comment,
    CASE WHEN Permissions.download = 1 THEN 'TRUE' ELSE 'FALSE' END AS download_media,
    CASE WHEN Permissions.edit_users = 1 THEN 'TRUE' ELSE 'FALSE' END AS edit_users,
    CASE WHEN Permissions.delete_media = 1 THEN 'TRUE' ELSE 'FALSE' END AS delete_media
    FROM Permissions
    JOIN Users ON Permissions.user_level_id = Users.user_level_id;

--Update a specific Users user level
UPDATE Users SET user_level_id = 2 WHERE user_id = 305;

--Update a specific users password
UPDATE Users 
INNER JOIN Permissions ON Permissions.user_level_id = Users.user_level_id
SET password = 'newsecret' 
WHERE user_id = 305 
AND
Permissions.edit_users = 1;

--Delete a specific media item and its data (possible this simply thanks to ON DELETE CASCADE SPECIFIED IN CREATION)
DELETE FROM MediaItems
WHERE media_id = 9632
AND
user_id in (SELECT user_id FROM Users WHERE user_level_id in (SELECT user_level_id FROM Permissions WHERE delete_media = 1));