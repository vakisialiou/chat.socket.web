import { insertOrUpdate, getUserByUUID } from './../repositories/user'
import { getRooms, saveRoom, removeRoom } from './../repositories/room'
import { getMessages, saveMessage, saveConversation } from './../repositories/message'
import objectPath from 'object-path'
import uuid from 'uuid/v4'

/**
 * Generate user info.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function indexAction({ req, res, db }) {
  await insertOrUpdate(db, req.params.uuid, { publicKey: uuid() })
  const user = await getUserByUUID(db, req.params.uuid)
  const rooms = await getRooms(db)


  const messages = {}
  for (const room of rooms) {
    messages[room['publicKey']] = formatMessages(await getMessages(db, room['id']))
  }

  return res.send({ user: formatUser(user), rooms: formatRooms(rooms), messages })
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function saveMessageAction({ req, res, db }) {
  const message = objectPath.get(req, ['body', 'message'], null)
  const roomId = objectPath.get(req, ['body', 'roomId'], null)
  const userId = objectPath.get(req, ['body', 'userId'], null)
  if (!message || !roomId || !userId) {
    return res.sendStatus(400)
  }

  const messageId = await saveMessage(db, message)
  await saveConversation(db, messageId, roomId, userId)
  return res.sendStatus(200)
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function saveRoomAction({ req, res, db }) {
  const name = objectPath.get(req, ['body', 'roomName'], null)
  const userId = objectPath.get(req, ['body', 'userId'], null)
  if (!name || !userId) {
    return res.sendStatus(400)
  }
  const publicKey = uuid()
  const roomId = await saveRoom(db, name, publicKey, userId)

  return res.send(formatRoom({ id: roomId, name, publicKey, userId }))
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function removeRoomAction({ req, res, db }) {
  const roomId = objectPath.get(req, ['body', 'roomId'], null)
  if (!roomId) {
    return res.sendStatus(400)
  }

  await removeRoom(db, roomId)
  return res.sendStatus(200)
}

function formatUser(user) {
  return {
    id: user['id'],
    name: user['name'],
    publicKey: user['publicKey'],
  }
}

function formatRooms(rooms) {
  return rooms.map((room) => formatRoom(room))
}

function formatRoom(room) {
  return {
    name: room['name'],
    publicKey: room['publicKey'],
    extraParams: {
      roomId: room['id'],
      userId: room['userId'],
    }
  }
}

function formatMessages(messages) {
  return messages.map((message) => formatMessage(message))
}

function formatMessage(message) {
  return {
    date: message['createdAt'],
    message: message['text'],
    userId: message['userId'],
    userName: message['userName'],
    userPublicKey: message['userPublicKey']
  }
}