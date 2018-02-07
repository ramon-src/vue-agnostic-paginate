<template>
  <div>
    <button class="pagination__prev-page-btn" 
      :disabled="disablePrevButton" 
      @click.prevent="changePage('prev')"></button>
    <span class="pagination__first-page"> {{ firstPage }} </span>
    <span class="pagination__current-page"> {{ currentPage }} </span>
    <span class="pagination__total-page"> {{ totalPages }} </span>
    <button class="pagination__next-page-btn" 
      :disabled="disableNextButton" 
      @click.prevent="changePage('next')"></button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: [],
        currentPage: this.$props.startsIn,
        totalPages: 1,
        firstPage: 1,
        disablePrevButton: 'disabled',
        disableNextButton: ''
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
    watch: {
      currentPage() {
        if(this.currentPage == 1) {
          this.disablePrevButton = 'disabled'
        }
        if(this.currentPage == this.totalPages){
          this.disableNextButton = 'disabled'
        }
        if(this.currentPage != this.firstPage && this.currentPage != this.totalPages){
          this.disablePrevButton = ''
          this.disableNextButton = ''
        }
      }
    },
    methods: {
      changePage(prevOrNext) {
        if(prevOrNext == 'prev')
          if(this.currentPage > this.firstPage && this.currentPage <= this.totalPages)
            this.currentPage--
        if(prevOrNext == 'next')
          if(this.currentPage >= this.firstPage && this.currentPage < this.totalPages)
            this.currentPage++
        this.fetchData()
      },
      fetchData(){
        this.$emit('items', [])
      }
    }
  }
</script>