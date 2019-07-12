import './style.scss'
import Vue from 'vue'
import template from './template.html'
import moment from 'moment'

export default Vue.component('RoomConversation', {
  props: {
    date: {
      type: Date,
    },
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: function () {
    return {

    }
  },
  computed: {
    conversationDate() {
      return moment(this.date).format('LL');
    }
  },
  methods: {
    time(date) {
      return moment(date).format('LT');
    },
  },
  template: template
})