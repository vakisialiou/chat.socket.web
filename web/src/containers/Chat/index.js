import './style.scss'
import Vue from 'vue'
import template from './template.html'
import objectPath from 'object-path'

import '@containers/LayoutMain'
import '@components/LayoutHeader'
import '@components/RoomCreateForm'
import '@components/RoomConversation'
import '@components/RoomConversationForm'

import { mapGetters, mapState } from 'vuex'

export default Vue.component('Chat', {
  data: function () {
    return {
      screen: null,
      searchModal: { show: false, msg: '', confirm: false },
      lastOpenedScreen: null,
      createRoomName: null,
      selectedRoom: null,
      sideBarMenuItems: [
        {
          group: 1,
          showAddButton: true,
          name: 'Rooms',
          items: []
        },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('chat/init').then(() => {
      Vue.set(this.sideBarMenuItems[0], 'items', this.rooms)
    })
  },
  computed: {
    ...mapState({
      rooms(state) {
        return state.chat.rooms
      },
      messages(state) {
        return state.chat.messages
      },
    }),
    title() {
      return this.selectedRoom ? this.selectedRoom.name : null
    },
    conversation() {
      if (!this.selectedRoom) {
        return []
      }

      if (this.selectedRoom.group === 1) {
        return objectPath.get(this.messages, this.selectedRoom.publicKey, [])
      }

      return []
    }
  },
  methods: {
    onButtonSearchClick(event, value) {

    },
    onClickSideBarMenuItem(event, value) {
      this.selectedRoom = value
      this.openScreen('dialog-room')
    },
    onClickRemoveSideBarMenuItem(event, data) {
      if (this.selectedRoom && this.selectedRoom.publicKey === data.publicKey) {
        this.selectedRoom = null
        this.prevScreen()
      }
      this.$store.dispatch('chat/removeRoom', data)
    },
    onAddSideBarMenuItem() {
      this.openScreen('create-room')
    },

    sendMessage(event, message) {
      if (!this.selectedRoom || !message) {
        return
      }
      if (this.selectedRoom.group === 1) {
        this.$store.dispatch('chat/addMessage', { room: this.selectedRoom, message })
      }
    },

    onCreateRoom(event, data) {
      if (!data.roomName) {
        return
      }
      this.$store.dispatch('chat/createRoom', data)
      this.prevScreen()
    },

    openScreen(screen) {
      if (this.screen === screen) {
        return
      }
      this.lastOpenedScreen = this.screen
      this.screen = screen
    },

    isScreenOpened(screen) {
      return this.screen === screen
    },

    prevScreen() {
      this.screen = this.lastOpenedScreen
    }
  },
  template: template
})