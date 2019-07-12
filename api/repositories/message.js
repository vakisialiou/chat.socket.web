/**
 *
 * @param {MySQL} db
 * @param {number} roomId
 * @returns {Promise}
 */
export const getMessages = (db, roomId) => {
  return db.query(`
    SELECT m.*, u.id as userId
      FROM conversation as c
           INNER JOIN message as m ON m.id = c.messageId
           INNER JOIN user as u ON u.id = c.userId
     WHERE roomId = ?
     ORDER BY m.createdAt
  `, [roomId])
}

/**
 *
 * @param {MySQL} db
 * @param {String} text
 * @returns {Promise}
 */
export const saveMessage = (db, text) => {
  return db.query(`INSERT INTO message (text) VALUES (?)`, [ text ])
    .then((results) => results.insertId)
}

/**
 *
 * @param {MySQL} db
 * @param {number} messageId
 * @param {number} roomId
 * @param {number} userId
 * @returns {Promise}
 */
export const saveConversation = (db, messageId, roomId, userId) => {
  return db.query(`INSERT INTO conversation (messageId, roomId, userId) VALUES (?, ?, ?)`, [ messageId, roomId, userId ])
    .then((results) => results.insertId)
}