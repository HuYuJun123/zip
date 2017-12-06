<template>
  <div class="tableFun" @click="fun">
    <i style="color: #03318b;" class="iconfont" v-show="num===1">&#xe624;</i>
    <i style="color:#e43542;" class="iconfont" v-show="num===2">&#xe627;</i>
    <i style="color: #269b15" class="iconfont" v-show="num===3">&#xe74e;</i>
    <i class="iconfont" v-show="num===4">&#xe601;</i>
    <i class="iconfont" v-show="num===5">&#xe642;</i>
  </div>
</template>
<script>
  export default{
    name: 'TableFun',
    props: ['num'],
    data(){
      return {}
    },
    methods:{
        fun(){
            this.$emit('click')
        }
    }
  }
</script>
<style scoped>
.tableFun{
  display: inline-block;
  padding:0 8px;
  font-size: 18px;
}
.tableFun i{
  font-weight: 900;
  font-size: 20px;
  cursor: pointer;
}
</style>
