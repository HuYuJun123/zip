<template>
  <ul class="fun">
    <li @click="funS(1)">
      <Tooltip content="添加素材" placement="bottom">
        <Icon type="pricetags"></Icon>
      </Tooltip>
    </li>
    <li @click="funS(2)" class="del">
      <Tooltip content="删除" placement="bottom">
        <Icon type="trash-a"></Icon>
      </Tooltip>
    </li>
    <li class="funSpecial">
      <Icon type="share"></Icon><Icon type="ios-arrow-down"></Icon>
      <ul  class="funDown">
        <li @click="funS(41)"><Icon type="android-phone-portrait"></Icon></li>
        <li @click="funS(42)"><Icon type="chatbubbles"></Icon></li>
        <li @click="funS(43)">w</li>
        <li @click="funS(44)">Q</li>
      </ul>
    </li>
    <li @click="funS(3)">
      <Tooltip v-show="par.sensitive" content="取消标敏" placement="bottom">
        <Icon style="color: orangered" type="ios-bell"></Icon>
      </Tooltip>
      <Tooltip v-show="!par.sensitive" content="标敏" placement="bottom">
        <Icon type="ios-bell"></Icon>
      </Tooltip>
    </li>
    <li>
      <Tooltip content="点击复制链接" placement="bottom-end">
        <button class="btn" :data-clipboard-text="par.url" @click="$Message.success('复制成功')" style="background: none;border: 0;color: #666;cursor: pointer">
          <Icon type="link"></Icon>
        </button>
      </Tooltip>
    </li>
  </ul>
</template>
<script>
//  复制链接的插件
  import Clipboard from 'clipboard';
  export default{
    name: 'Fun',
    props:['par'],
    data(){
      return {

      }
    },
    computed: {},
    methods: {
        funS:function (type) {
          this.$emit("funSome",type,this.par)
        },
    },
    mounted: function () {
//        初始化复制链接插件
      const clipboard = new Clipboard('.btn');
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
