
/**
 *
 * @param {MySQL} db
 * @returns {Promise}
 */
export const getRooms = (db) => {
  return db.query(`SELECT * FROM room WHERE isDeleted = 0`)
}

/**
 *
 * @param {MySQL} db
 * @param {string} key
 * @returns {Promise}
 */
export const getRoomByPublicKey = (db, key) => {
  return db.findOne(`SELECT * FROM room WHERE publicKey = ? AND isDeleted = 0`, [key])
}

/**
 *
 * @param {MySQL} db
 * @param {String} name
 * @param {String} publicKey
 * @param {number} userId
 * @returns {Promise}
 */
export const saveRoom = (db, name, publicKey, userId) => {
  return db.query(`INSERT INTO room (name, publicKey, userId) VALUES (?, ?, ?)`, [ name, publicKey, userId ])
    .then((results) => results.insertId)
}

/**
 *
 * @param {MySQL} db
 * @param {number} roomId
 * @returns {Promise}
 */
export const removeRoom = (db, roomId) => {
  return db.query(`UPDATE room SET isDeleted = 1 WHERE id = ?`, [ roomId ])
}