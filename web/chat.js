import io from 'socket.io-client'
import uuid from 'uuid/v4'
import Storage from '@lib/Storage'
import queryString from 'query-string'
import objectPath from 'object-path'
import moment from 'moment'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import './src/scss/custom.scss'
Vue.use(BootstrapVue)

import store from './src/store'
import './src/containers/Chat'

new Vue({
  store,
  el: '#app-container',
  template: `<Chat/>`
})

// let UUID = Storage.getStorageItem('uuid')
// if (!UUID) {
//   UUID = uuid();
//   Storage.setStorageItem('uuid', UUID)
// }
//
// let rooms = Storage.decodeStorageItem('rooms') || []
//
// const app = document.getElementById('app-container')
//
// const inputCreateRoom = inputElement()
// app.appendChild(inputCreateRoom)
//
// const btnCreateRoom = buttonElement('Create room')
// app.appendChild(btnCreateRoom)
//
// const selectRoom = selectListElement(rooms)
// app.appendChild(selectRoom)
//
// const query = queryString.parse(window.location.search)
// const port = objectPath.get(query, 'socketPort', 5111)
// const socket = io.connect(`http://localhost:${port}/chat-demo`)
//
// socket.on('connect', (data) => {
//
//   btnCreateRoom.addEventListener('click', () => {
//     const roomName = inputCreateRoom.value
//     if (roomName) {
//       addRoom(roomName, selectRoom)
//       inputCreateRoom.value = null
//     }
//   })
//   // socket.emit('create-room')
//
//   socket.on('disconnect', (reason) => {
//
//   })
// })
//
// function addRoom(roomName, selectField) {
//   let rooms = (Storage.decodeStorageItem('rooms') || []).push(roomName)
//   const uniqueRooms = uniqueArray(rooms)
//   Storage.encodeStorageItem('rooms', uniqueRooms)
//   selectField.innerHTML = null
//   for (const option of uniqueRooms) {
//     const optionElement = selectListOptionElement(option)
//     selectField.appendChild(optionElement)
//   }
// }
//
// function uniqueArray(array) {
//   const uniqueArray = []
//   for (const element of array) {
//     if (uniqueArray.includes(element)) {
//       continue
//     }
//     uniqueArray.push(element)
//   }
//   return uniqueArray
// }
//
// function inputElement() {
//   return document.createElement('input')
// }
//
// function buttonElement(name) {
//   const button = document.createElement('button')
//   button.innerHTML = name
//   return button
// }
//
// function selectListElement(options) {
//   const element = document.createElement('select')
//   for (const option of options) {
//     const optionElement = selectListOptionElement(option)
//     element.appendChild(optionElement)
//   }
//   return element
// }
//
// function selectListOptionElement(value) {
//   const optionElement = document.createElement('option')
//   optionElement.value = value
//   optionElement.innerHTML = value
//   return optionElement
// }