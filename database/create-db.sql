-- Reset whole database (as root user)
DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- Create database structure
CREATE TABLE Permissions (
    permissions_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_level_id INT NOT NULL UNIQUE,
    download BOOLEAN NOT NULL,
    comment BOOLEAN NOT NULL,
    edit_users BOOLEAN NOT NULL,
    delete_media BOOLEAN NOT NULL
);

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_level_id) REFERENCES Permissions(user_level_id)
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE MediaItemData (
    data_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    media_id INT NOT NULL ,
    favorites INT DEFAULT 0,
    views INT DEFAULT 0,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id) ON DELETE CASCADE
);

-- Tällä skriptillä luodaan tietokannan rakenne aina vanhan päälle.
-- Testidata toisessa tiedostossa.

-- Scriptin käyttö, mysql komentorivillä: source <tiedostpolku>
-- tiedostopolun saa (copy path - toiminolla tai raaha scripti tiedostoselaimesta komentoriville.

-- Olemassaolevan kannan export (käyttöjärjestelmän, ei mysql client) komentorivillä:
-- mysqldump -u root -pMunsalakala mediashare > kohdetiedosto.sql