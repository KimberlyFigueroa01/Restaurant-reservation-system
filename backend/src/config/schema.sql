-- Run this script once against your PlanetScale database to create the schema.
-- PlanetScale does not support foreign key constraints (they are parsed but not enforced).

CREATE TABLE IF NOT EXISTS users (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120)        NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255)        NOT NULL,
  role        ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS restaurants (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120)        NOT NULL,
  address     VARCHAR(255)        NOT NULL,
  phone       VARCHAR(30),
  description TEXT,
  capacity    INT UNSIGNED        NOT NULL DEFAULT 50,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id         INT UNSIGNED        NOT NULL,
  restaurant_id   INT UNSIGNED        NOT NULL,
  reservation_date DATE               NOT NULL,
  reservation_time TIME               NOT NULL,
  party_size      TINYINT UNSIGNED    NOT NULL,
  status          ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
