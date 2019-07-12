import './style.scss'
import Vue from 'vue'
import template from './template.html'
import moment from 'moment'

export default Vue.component('RoomConversationForm', {
  props: {

  },
  data: function () {
    return {
      message: null
    }
  },
  methods: {
    send(event) {
      this.$emit('send', event, this.message)
      this.message = null
    }
  },
  template: template
})