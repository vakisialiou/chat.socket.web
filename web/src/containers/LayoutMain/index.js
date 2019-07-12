import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@components/Header'
import '@components/SideBarMenu'
import '@components/LayoutContent'

export default Vue.component('LayoutMain', {
  props: {
    sideBarMenuItems: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    onClickSideBarMenuItem(event, value) {
      this.$emit('onClickSideBarMenuItem', event, value)
    },
    onClickRemoveSideBarMenuItem(event, value) {
      this.$emit('onClickRemoveSideBarMenuItem', event, value)
    },
    onAddSideBarMenuItem(event, value) {
      this.$emit('onAddSideBarMenuItem', event, value)
    },
    onButtonSearchClick(event, value) {
      this.$emit('onButtonSearchClick', event, value)
    }
  },
  template: template
})