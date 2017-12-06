<template>
  <div class="text">
    <main>
      <ul class="textFun">
        <li style="background: #38a0fb" @click="fun(1)">
          <Icon type="pricetags"></Icon>
          <span>添加</span></li>
        <li style="background: #44c2a7" @click="fun(2)">
          <Icon type="share"></Icon>
          <span>分享</span></li>
        <li style="background: #43b9e4" @click="fun(3)">
          <Icon type="trash-a"></Icon>
          <span>删除</span>
        </li>
        <li style="background: #fc6d69" @click="fun(4)">
          <Icon type="ios-bell" v-show="tag"></Icon>
          <Icon type="ios-bell-outline" v-show="!tag"></Icon>
          <span>标敏</span></li>
      </ul>
      <div class="textLabel" :style="tag?'border-top-color: #e43542':'border-top-color: green' ">
        <span class="bRed" v-show="tag">敏感</span>
        <span class="bYellow" v-show="!tag">非敏感</span>
      </div>
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="v.path" v-for="(v,i) in info" :key="i">{{v.name}}</BreadcrumbItem>
      </Breadcrumb>
      <h1 v-html="data.title"></h1>
      <div class="textMain">
        <p class="textInfo">
          <span>时间：</span>
          <span>{{data.create_date}}</span>
          <span style="margin-left:30px ">来源：</span>
          <span>{{data.media_name}}</span>
          <a :href="data.url" class="textA">查看原文</a>
          <a class="textA" style="margin-right: 25px">复制链接</a>
        </p>
        <p>
          <span style="color: #999">涉及词：</span>
          <span class="cBlue">{{data.keywords.split(',').join(' ')}}</span>
        </p>
        <p class="textCon">{{data.content}}</p>
      </div>

    </main>

  </div>
</template>
<script>
  export default{
    name: 'Text',
    data(){
      return {
        data: this.$route.params.data,
        info: this.$route.params.info,
        tag: true,
      }
    },
    computed: {},
    methods: {
      fun: function (v) {
        switch (v) {
          case 4:
            this.tag = !this.tag;
            break;
        }
      }
    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .text main {
    margin-top: 25px;
    background: white;
    position: relative;
    padding: 25px 20px;
  }

  .textFun {
    position: absolute;
    left: -53px;
    top: 25px;
  }

  .textFun li {
    width: 33px;
    height: 33px;
    margin-bottom: 12px;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 33px;
    cursor: pointer;
  }

  .textFun li i {
    display: block;
    font-size: 18px;
    line-height: 33px;
  }

  .textFun li span {
    display: none;
    font-size: 8px;
  }

  .textFun li:hover i {
    display: none;
    animation: opt 1s;
  }

  .textFun li:hover span {
    display: block;
    animation: opt 1s;
  }

  @keyframes opt {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .textLabel {
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-top: 65px solid;
    border-left: 65px solid transparent;
  }

  .textLabel span {
    display: block;
    position: absolute;
    transform: rotate(45deg);
    left: -65px;
    top: -65px;
    width: 90px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    color: white;
  }

  .text h1 {
    text-align: center;
    line-height: 90px;
    margin-top: 30px;
  }

  .textMain {
    border-top: 1px solid #eee;
  }

  .textA {
    float: right;
    line-height: 55px;
    color: #026fcc;
  }

  .textInfo {
    line-height: 55px;
    color: #999
  }

  .textCon {
    margin-top: 45px;
  }
</style>
