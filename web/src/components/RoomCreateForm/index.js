import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('RoomCreateForm', {
  props: {

  },
  data: function () {
    return {
      roomName: null
    }
  },
  methods: {
    clearForm() {
      this.roomName = null
    },
    onCreate(event) {
      this.$emit('create', event, { roomName: this.roomName })
      this.clearForm()
    },
    onClose(event) {
      this.$emit('close', event)
      this.clearForm()
    }
  },
  template: template
})