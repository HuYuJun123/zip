<template>
  <ul class="fun">
    <li @click="funS(2)">
      <Tooltip content="添加素材" placement="bottom">
        <Icon type="pricetags"></Icon>
      </Tooltip>
    </li>
    <li @click="funS(3)">
      <Tooltip content="全部标敏" placement="bottom">
        <Icon type="ios-bell"></Icon>
      </Tooltip>
    </li>
    <li @click="funS(4)">
      <Tooltip content="全部取消标敏" placement="bottom">
        <Icon type="ios-bell-outline"></Icon>
      </Tooltip>
    </li>
    <li @click="funS(1)">
      <Tooltip content="批量删除" placement="bottom">
        <Icon type="trash-a"></Icon>
      </Tooltip>
    </li>
  </ul>
</template>
<script>
  export default{
    name: 'Fun',
    data(){
      return {

      }
    },
    computed: {},
    methods: {
      funS:function (type) {
        this.$emit("funSome",type)
      },
    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .fun>li {
    float: left;
    background: #ededed;
    border: 1px solid #ededed;
    margin-left: 5px;
    width: 30px;
    height: 30px;
    font-size: 16px;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: #666666;
  }
  .fun>li:hover{
    background: #eee;
    color: #fb7e03;
    border: 1px solid #ddd;
  }
  .fun .funSpecial{
    width: 40px;
  }
  .fun .funSpecial>i:nth-of-type(2){
    margin-left: 5px;
  }
  .funSpecial:hover .funDown{
    display: block;
    animation: share 0.5s;
  }
  .funDown{
    background: white;
    position: relative;
    z-index: 999;
    display: none;
    overflow: hidden;
    color: #666;
  }
  .funDown li:hover{
    color:#fb7e03;
  }
  @keyframes share {
    from{
      opacity: 0;
      height: 0;
    }
    to{
      opacity: 1;
      height: 120px;
    }
  }
  .btn:hover{
    color: #fb7e03!important;
  }
  .btn:focus{
    outline: none;
  }
</style>
