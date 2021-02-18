import CommentInput from '../components/Comment/Input'

import drClick from '../directives/dr-click'

export default {
  install(Vue, opts) {
    Vue.component(CommentInput.name, CommentInput)
    Vue.directive('dr-click', drClick)
  }
}