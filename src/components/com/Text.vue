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
          <Icon type="ios-bell" v-if="!data.sensitive"></Icon>
          <Icon type="ios-bell-outline" v-else></Icon>
          <span v-if="!data.sensitive">标敏</span>
          <span v-else>取消</span>
        </li>
      </ul>
      <div class="textLabel" :style="data.sensitive?'border-top-color: #e43542':'border-top-color: green' ">
        <span class="bRed" v-show="data.sensitive">敏感</span>
        <span class="bYellow" v-show="!data.sensitive">非敏感</span>
      </div>
      <div class="breadcrumb">
        <router-link :to="{path:v.path}" v-for="(v,i) in info" :key="i">{{v.name}} <span style="padding: 0 5px"
                                                                                         v-show="i+1<info.length">></span>
        </router-link>
      </div>
      <!--正则去掉span标签-->
      <h1>{{data.title.replace(/<([^]*?)>/g, '')}}</h1>
      <div class="textMain">
        <p class="textInfo">
          <span>时间：</span>
          <span>{{data.create_date?data.create_date.split('T').join(' '):data.spider_time.split('T').join(' ')}}</span>
          <span style="margin-left:30px ">来源：</span>
          <span>{{data.sourceName}}</span>
          <a :href="data.url" class="textA" target="_blank">查看原文</a>
          <span class="btn textA" :data-clipboard-text="data.url" @click="$Message.success('复制成功')" style="margin-right:20px;background: none;border: 0;cursor: pointer">
            复制链接
          </span>
        </p>
        <p v-show="data.keywords!==' '">
          <span style="color: #999">涉及词：</span>
          <span class="cBlue">{{data.suggest ? data.suggest[0].input.join(' ') : ''}}</span>
        </p>
        <p class="textCon">{{data.content.replace(/<([^]*?)>/g, '')}}</p>
      </div>

    </main>

  </div>
</template>
<script>
  export default{
    name: 'Text',
    data(){
      return {
        //展示数据获取组件传过来或则保存在本地的
        data: this.$route.params.data ? this.$route.params.data : JSON.parse(sessionStorage.text).data,
        info: this.$route.params.info ? this.$route.params.info : JSON.parse(sessionStorage.text).info,
      }
    },
    computed: {},
    methods: {
      fun: function (type) {
        switch (type) {
          case 1:
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/material/news/add",
              contentType: "application/json; charset=utf-8",
              data: this.data.contentId,
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  this.$Notice.success({
                    title: '添加素材成功',
                  });
                } else {
                  this.$Notice.error({
                    title: '操作失败',
                  });
                }
              }
            });
            break;
          case 4:
            let data = JSON.stringify({
              "contentId": this.data.contentId,
              "status": !this.data.sensitive
            })
            let title = '';
            if (this.data.sensitive) {
              title = '取消标敏成功'
            } else {
              title = '标敏成功'
            }
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/document/sensitive-update",
              contentType: "application/json; charset=utf-8",
              data: data,
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  this.data.sensitive = !this.data.sensitive;
                  this.$Notice.success({
                    title: title,
                  });
                } else {
                  this.$Notice.error({
                    title: '操作失败',
                  });
                }
              }
            });
            break;
        }
      }
    },
    mounted: function () {
      if (this.$route.params.data) {
//          如果有新的文本数据就将session中的数据替换
        sessionStorage.text = JSON.stringify(this.$route.params)
      }
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
    font-size: 13px;
    line-height: 55px;
    color: #999
  }

  .textCon {
    margin-top: 45px;
    font-size: 14px;
    color: #333;
    text-indent: 30px;
  }

  .breadcrumb a {
    color: #666;
    font-size: 16px;
  }

  .breadcrumb a:hover {
    color: #2db7f5;
  }
</style>
