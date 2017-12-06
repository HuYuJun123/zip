<template>
  <ul class="fun">
    <li @click="funS(2)">
      <Icon type="trash-a"></Icon>
    </li>
    <li @click="funS(3)">
      <Icon type="pricetags"></Icon>
    </li>
    <li class="funSpecial">
      <Icon type="share"></Icon><Icon type="ios-arrow-down"></Icon>
      <ul  class="funDown">
        <li @click="funS(41)"><Icon type="android-phone-portrait"></Icon></li>
        <li @click="funS(42)"><Icon type="chatbubbles"></Icon></li>
        <li @click="funS(43)"><Icon type="chatbox-working"></Icon></li>
        <li @click="funS(44)"><Icon type="social-whatsapp"></Icon></li>
      </ul>
    </li>
    <li @click="funS(5)">
      <Icon type="ios-eye"></Icon>
    </li>
    <li @click="funS(6)">
      <Icon type="ios-bell"></Icon>
    </li>
    <li>
      <button class="btn" :data-clipboard-text="par.url" style="background: none;border: 0;color: #666;cursor: pointer">
        <Icon type="link"></Icon>
      </button>
    </li>
  </ul>
</template>
<script>
  import Clipboard from 'clipboard';
  export default{
    name: 'Fun',
    props:['par'],
    data(){
      return {
          copy:'copy ok'
      }
    },
    computed: {},
    methods: {
        funS:function (type) {
          this.$emit("funSome",type,this.par)
        },
    },
    mounted: function () {
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
