import './chat'
// import io from 'socket.io-client'
// import uuid from 'uuid/v4'
// import Storage from '@lib/Storage'
// import queryString from 'query-string'
// import objectPath from 'object-path'
// import moment from 'moment'
//
// let UUID = Storage.getStorageItem('uuid')
// if (!UUID) {
//   UUID = uuid();
//   Storage.setStorageItem('uuid', UUID)
// }
//
// let socket;
// const appContainerElement = document.getElementById('app-container')
//
// const userUUIDElement = createElement()
// userUUIDElement.innerHTML = 'UUID: ' + UUID
// appContainerElement.appendChild(userUUIDElement)
//
// const selectListElement = createSelectListElement([
//   { value: '', text: 'Not selected' },
//   { value: 'room-1', text: 'Room - 1' },
//   { value: 'room-2', text: 'Room - 2' },
// ])
// appContainerElement.appendChild(selectListElement)
//
// const roomNameElement = createElement()
// appContainerElement.appendChild(roomNameElement)
//
// const usersOnlineCountElement = createElement()
// appContainerElement.appendChild(usersOnlineCountElement)
//
// const textAreaElement = createTextAreaElement()
// appContainerElement.appendChild(textAreaElement)
//
// const buttonSendElement = createButtonElement('send')
// appContainerElement.appendChild(buttonSendElement)
//
// const historyElement = createElement()
// appContainerElement.appendChild(historyElement)
//
// selectListElement.addEventListener('change', (e) => {
//   historyElement.innerHTML = null
//   roomNameElement.innerHTML = null
//   usersOnlineCountElement.innerHTML = null
//   openRoom(e.target.value)
// })
//
// buttonSendElement.addEventListener('click', () => {
//   const message = textAreaElement.value
//   if (message && socket) {
//     socket.emit('room-message', { message, UUID, time: Date.now() })
//   }
//   textAreaElement.value = null
// })
//
// function openRoom(roomName) {
//   if (socket) {
//     socket.close()
//   }
//
//   if (roomName === '') {
//     return
//   }
//
//   roomNameElement.innerHTML = 'Chat room: ' + roomName
//
//   const query = queryString.parse(window.location.search)
//   const port = objectPath.get(query, 'socketPort', 5111)
//   socket = io.connect(`http://localhost:${port}/${roomName}`)
//
//   let users = new UserController()
//
//   socket.on('connect', (data) => {
//
//     socket.emit('create-room', { room: 'test-room' })
//
//
//     socket.emit('room-come-in', { UUID })
//
//     socket.on('room-initialize', (data) => {
//       const roomHistory = data['roomHistory']
//       historyElement.innerHTML = ''
//       for (const message of roomHistory) {
//         const historyItemElement = createElement()
//         if (message.time) {
//           historyItemElement.innerHTML = 'UUID: ' + message.UUID + ' Date: ' + moment(message.time).locale('ru').format('LLL') + ' Message: ' + message.message
//         } else {
//           historyItemElement.innerHTML = 'UUID: ' + message.UUID + ' Message: ' + message.message
//         }
//         historyElement.appendChild(historyItemElement)
//       }
//     })
//
//     socket.on('room-update', (socketId, data) => {
//       switch (data['action']) {
//         case 'add':
//           users.add(socketId, data['userDetails'])
//           break
//         case 'remove':
//           users.remove(socketId)
//           break
//       }
//
//       usersOnlineCountElement.innerHTML = 'Online:' + users.countOnline();
//     })
//
//     socket.on('room-synchronize', (senderId) => {
//       socket.emit('room-synchronize', senderId, { UUID })
//     })
//
//     socket.on('room-message', (data) => {
//       const historyItemElement = createElement()
//       if (data.time) {
//         historyItemElement.innerHTML = 'UUID: ' + data.UUID + ' Date: ' + moment(data.time).locale('ru').format('LLL') + ' Message: ' + data.message
//       } else {
//         historyItemElement.innerHTML = 'UUID: ' + data.UUID + ' Message: ' + data.message
//       }
//       historyElement.appendChild(historyItemElement)
//     })
//
//     socket.on('disconnect', (reason) => {
//       socket.emit('room-leave', { UUID })
//       socket.close()
//     })
//   })
//
//   console.log(socket)
// }
//
// function createElement() {
//   return document.createElement('div')
// }
//
// function createSelectListElement(options) {
//   const element = document.createElement('select')
//   for (const option of options) {
//     const optionElement = document.createElement('option')
//     optionElement.value = option.value
//     optionElement.innerHTML = option.text
//     element.appendChild(optionElement)
//   }
//   return element
// }
//
// function createTextAreaElement() {
//   return document.createElement('textarea')
// }
//
// function createInputElement() {
//   return document.createElement('input')
// }
//
// function createButtonElement(name) {
//   const button = document.createElement('button')
//   button.innerHTML = name
//   return button
// }
//
// class UserController {
//   constructor() {
//     this.users = {}
//   }
//
//   /**
//    *
//    * @param {String} socketId
//    * @param {Object} user
//    */
//   add(socketId, user) {
//     for (const userSocketId in this.users) {
//       if (!this.users.hasOwnProperty(userSocketId)) {
//         continue
//       }
//       if (this.users[userSocketId]['UUID'] === user['UUID']) {
//         this.remove(userSocketId);
//       }
//     }
//     this.users[socketId] = user
//   }
//
//   /**
//    *
//    * @param {String} socketId
//    */
//   remove(socketId) {
//     delete this.users[socketId];
//   }
//
//   /**
//    *
//    * @returns {number}
//    */
//   countOnline() {
//     return Object.keys(this.users).length
//   }
//
//   /**
//    *
//    * @param {String} uuid
//    * @returns {Object|?}
//    */
//   getUser(uuid) {
//     for (const userSocketId in this.users) {
//       if (!this.users.hasOwnProperty(userSocketId)) {
//         continue
//       }
//       if (this.users[userSocketId]['UUID'] === uuid) {
//         return this.users[userSocketId]
//       }
//     }
//     return null
//   }
// }