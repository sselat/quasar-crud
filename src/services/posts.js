import useApi from 'src/composables/useApi'

export default function postsService () {
  const { list, post, update, remove, getById } = useApi('posts')

  return {
    list,
    post,
    update,
    getById,
    remove
  }
}
