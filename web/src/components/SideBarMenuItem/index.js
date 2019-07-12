import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('SideBarMenuItem', {
  props: {
    group: {
      type: [String, Number],
      required: true
    },
    publicKey: {
      type: [String, Number],
      required: true
    },
    extraParams: {
      type: Object,
    },
    name: {
      type: String,
    },
    activeItem: {
      type: Object,
    },
    allowedRemove: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    htmlClass() {
      return {
        active: this.activeItem && this.activeItem.group === this.group && this.activeItem.publicKey === this.publicKey
      }
    },
    item() {
      return {
        name: this.name,
        group: this.group,
        publicKey: this.publicKey,
        extraParams: this.extraParams
      }
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event, this.item)
    },

    onRemove(event) {
      this.$emit('remove', event, this.item)
    }
  },
  template: template
})