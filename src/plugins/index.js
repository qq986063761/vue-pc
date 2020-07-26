import CommentInput from '../components/Comment/CommentInput'

export default {
  install(Vue, opts) {
    Vue.component(CommentInput.name, CommentInput)
  }
}