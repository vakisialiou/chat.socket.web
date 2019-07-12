import {
  indexAction, saveMessageAction, saveRoomAction, removeRoomAction
} from '../controllers/chat-controller'

export default [
  {
    method: 'GET',
    path: '/chat/init/:uuid',
    action: indexAction
  },
  {
    method: 'PUT',
    path: '/chat/message/save',
    action: saveMessageAction
  },
  {
    method: 'PUT',
    path: '/chat/room/save',
    action: saveRoomAction
  },
  {
    method: 'DELETE',
    path: '/chat/room/remove',
    action: removeRoomAction
  },
]