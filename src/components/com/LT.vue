<template>
  <div class="lt" style="color: #999">
    <div v-show="n===1">
      <p>{{l}}</p>
      <p>{{t}}</p>
    </div>
    <div v-show="n===2">
      <p v-if="s" style="color:#ff0000">敏感</p>
      <p v-else>非敏感</p>
    </div>
    <div v-show="n===3" @click="fun" style="cursor: pointer">
      <p style="color: #0265c2">编辑</p>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Lt',
    props: ['l', 't', 'n', 's'],
    data(){
      return {}
    },
    computed: {},
    methods: {
      fun(){
        this.$emit('click')
      }
    },
    mounted: function () {

    }

  }
</script>
<style scoped>

</style>
