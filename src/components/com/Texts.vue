<template>
  <div class="texts">
    <main>
      <div class="breadcrumb">
        <router-link :to="{path:v.path}" v-for="(v,i) in info" :key="i">{{v.name}} <span style="padding: 0 5px"
                                                                                         v-show="i+1<info.length">></span>
        </router-link>
      </div>
      <h1>{{data.title}}</h1>
      <div class="textMain"></div>
      <p><a style="line-height: 30px;float: right" :href="data.url">查看原文</a></p>
      <p class="textCon">{{data.content}}</p>
    </main>
  </div>
</template>
<script>
  export default{
    name: 'Texts',
    data(){
      return {}
    },
    computed: {
      data: function () {
        let data = this.$route.params.data ? this.$route.params.data : JSON.parse(sessionStorage.text).data;
        return data
      },
      info: function () {
        let info = this.$route.params.info ? this.$route.params.info : JSON.parse(sessionStorage.text).info;
        return info
      }
    },
    methods: {},
    mounted: function () {
        if(this.$route.params.data) {
          sessionStorage.text = JSON.stringify(this.$route.params)
        }
    }
  }
</script>
<style scoped>
  .texts main {
    margin-top: 25px;
    background: white;
    position: relative;
    padding: 25px 20px;
  }

  .breadcrumb a {
    color: #666;
    font-size: 16px;
  }

  .breadcrumb a:hover {
    color: #2db7f5;
  }

  .texts h1 {
    text-align: center;
    line-height: 50px;
    margin-top: 30px;
  }

  .textCon {
    margin-top: 45px;
    font-size: 14px;
    color: #333;
    text-indent: 30px;
  }

  .textMain {
    border-top: 1px solid #eee;
  }
</style>
