import Ajax from '@lib/Ajax'
import Storage from '@lib/Storage'
import uuid from 'uuid/v4'
import io from 'socket.io-client'
import objectPath from 'object-path'
import queryString from 'query-string'

let socket

export default {
  namespaced: true,
  state: {
    rooms: [],
    user: {},
    messages: {},
    unreadMessages: {},
  },
  getters: {
    uuid: () => {
      let UUID = Storage.getStorageItem('uuid')
      if (!UUID) {
        UUID = uuid()
        Storage.setStorageItem('uuid', UUID)
      }
      return UUID
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setRooms(state, rooms) {
      state.rooms = rooms.map((room) => formatRoom(room, state.user))
    },
    setMessages(state, messages) {
      state.messages = messages
    },
    addMessage(state, data) {
      const publicKey = data.publicKey
      const messages = state.messages.hasOwnProperty(publicKey) ?  state.messages[publicKey] : [];
      messages.push({ date: data.date, message: data.message, userId: data.userId })
      state.messages = { ...state.messages, [publicKey]: messages }
    },
    addRoom(state, data) {
      const rooms = state.rooms
      rooms.push(formatRoom(data, state.user))
      state.rooms = rooms
    },
    removeRoom(state, data) {
      const removeRoomId = objectPath.get(data, 'roomId', null)
      const rooms = state.rooms
      for (let i = 0; i < rooms.length; i++) {
        const roomId = objectPath.get(rooms, [i, 'extraParams', 'roomId'], null)
        if (roomId === removeRoomId) {
          rooms.splice(i, 1)
          break
        }
      }
      state.rooms = rooms
    }
  },
  actions: {
    async init({ commit, getters }) {
      const res = await Ajax.get(`chat/init/${getters.uuid}`)
      commit('setUser', res.user)
      commit('setRooms', res.rooms)
      commit('setMessages', res.messages)


      const query = queryString.parse(window.location.search)
      const port = objectPath.get(query, 'socketPort', 5001)
      socket = io.connect(`http://localhost:${port}/chat`)
      const rooms = res.rooms.map((item) => item.publicKey)

      socket.on('connect', () => {
        socket.emit('initialization', { rooms })

        socket.on('add-message', (data) => {
          commit('addMessage', data)
        })

        socket.on('add-room', (data) => {
          socket.emit('join-room', data.publicKey)
          commit('addRoom', data)
        })

        socket.on('remove-room', (data) => {
          commit('removeRoom', data)
        })
      })
    },

    async addMessage({ state }, data) {
      const roomId = objectPath.get(data, ['room', 'extraParams', 'roomId'], null)
      const publicKey = objectPath.get(data, ['room', 'publicKey'], null)
      const message = objectPath.get(data, ['message'], null)
      const userId = objectPath.get(state, ['user', 'id'], null)
      socket.emit('send-message', { publicKey, roomId, message, userId })
    },

    async createRoom({ state }, data) {
      const userId = objectPath.get(state, ['user', 'id'], null)
      socket.emit('create-room', { roomName: data.roomName, userId })
    },

    async removeRoom({ state }, data) {
      const userId = objectPath.get(state, ['user', 'id'], null)
      const roomId = objectPath.get(data, ['extraParams', 'roomId'], null)
      const publicKey = objectPath.get(data, 'publicKey', null)
      socket.emit('remove-room', { roomId, userId, publicKey })
    }
  }
}

function formatRoom(room, user) {
  room.allowedRemove = room.extraParams.userId === user.id
  return room
}