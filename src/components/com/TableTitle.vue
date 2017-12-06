<template>
  <div class="tableTitle">
    <p style="color: #015cda;font-size: 16px"><span v-show="sensitive" class="sensitive">敏</span>{{title}}</p>
    <p style="color: #999;font-size: 14px">
      <span>简报模版:</span>
      <span>{{name}}</span>
    </p>
  </div>
</template>
<script>
  export default{
    name: 'ableTitle',
    props: ['title', 'name', 'sensitive']
  }
</script>
<style scoped>
  .tableTitle .sensitive {
    display: inline-block;
    background: #e43542;
    width: 17px;
    height: 17px;
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 17px;
    border-radius: 2px;
    margin-right: 6px;
  }
</style>
