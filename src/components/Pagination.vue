<template>
  <button class="pagination__page-button" @click.prevent="changePage"></button>
</template>
<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    props: {
      path: {
        type: String,
        required: true
      },
      pagelabel: {
        type: String,
        default: 'page'
      },
      startsIn: {
        type: Number,
        default: 1
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      changePage() {
        this.fetchData()
      },
      fetchData(){
        this.$emit('items', this.items)
      }
    }
  }
</script>