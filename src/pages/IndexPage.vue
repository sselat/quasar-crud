<template>
  <q-page padding>
    <q-table
      title="Artigos"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top-right>
      <q-space/>
      <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }"></q-btn>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn icon="edit" color="primary" dense @click="handleEditPost(props.row.id)"/>
        <q-btn icon="delete" color="negative" dense @click="handleDeletePost(props.row.id)"/>
      </q-td>
    </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const { list, remove } = postsService()
    const rows = ref([])
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'center' },
      { name: 'title', field: 'title', label: 'Título', sortable: true, align: 'center' },
      { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'center' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'center' }
    ]

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        rows.value = await list()
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: 'Deseja remover essa linha?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com sucesso!', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar', icon: 'clear', color: 'negative' })
      }
    }

    const handleEditPost = async (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    return {
      rows,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>
