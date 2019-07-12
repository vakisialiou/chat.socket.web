import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@components/SideBarMenuItem'

export default Vue.component('SideBarMenu', {
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: function () {
    return {
      menuItems: this.items,
      activeItem: null
    }
  },
  methods: {
    onClick(event, item) {
      this.activeItem = item
      this.$emit('click', event, item)
    },
    onRemove(event, item) {
      this.$emit('remove', event, item)
    },
    onAdd(event, item) {
      this.$emit('add', event, item)
    }
  },
  template: template
})