import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Header', {
  props: {
    appName: {
      type: String,
    },
    mainPageUrl: {
      type: String,
      default: '#'
    },
    inputPlaceholder: {
      type: String,
    },
    inputValue: {
      type: String,
    },
    inputButton: {
      type: String,
      default: 'Search'
    }
  },
  data: function () {
    return {
      modelValue: this.inputValue
    }
  },
  methods: {
    onButtonClick(event) {
      this.$emit('onButtonClick', event, this.modelValue || null)
    }
  },
  template: template
})