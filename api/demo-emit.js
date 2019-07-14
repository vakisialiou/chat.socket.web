import emitter from 'socket.io-emitter'

const io = emitter({ host: 'localhost', port: 6379 })

const msg = `WebSocket Bot ${new Date().toDateString()}`
const data = {
  roomId: 49,
  userId: 122,
  publicKey: '51f539aa-e8b5-4ad5-8384-1396c134dd44',
  message: msg
}
io.of('/chat')
  .in('51f539aa-e8b5-4ad5-8384-1396c134dd44')
  .emit('add-message', data)
console.log(msg)