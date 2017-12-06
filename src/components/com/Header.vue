<template>
  <header>
    <main>
      <img src="../../assets/logo.png" class="header-logo" alt="">
      <ul class="header-nav">
        <router-link :to="{path:'/scheme'}">
          <li>
            舆情监测
          </li>
        </router-link>
        <router-link :to="{path:'/search'}">
          <li>
            全文搜索
          </li>
        </router-link>
        <router-link :to="{path:'/bulletin'}">
          <li>
            舆情简报
          </li>
        </router-link>
        <router-link :to="{path:'/users/'}">
          <li>
            用户管理
          </li>
        </router-link>
      </ul>
      <div class="header-right">
        <div>
          北京阳光汇点
          <Icon type="arrow-down-b"></Icon>
        </div>
        <div>
          Mengxiao Li
          <Icon type="arrow-down-b"></Icon>
        </div>
      </div>
    </main>
  </header>
</template>
<script>
  export default{
    name: 'Header',
    data(){
      return {
        one: true,
        url: location.hash
      }
    },
    computed: {},
    methods: {},
    mounted: function () {

    },
    watch: {

    }

  }
</script>
<style scoped="">
  header {
    width: 100%;
    height: 70px;
    box-shadow: 0 2px 2px 0 #ddd;
    background: #3c3d45;
    position: fixed;
    z-index: 999;
  }

  header main {
    background: #3c3d45;
  }

  .header-logo {
    height: 70px;
    width: auto;
    display: flex;
    float: left;
    margin-right: 20px;
  }

  .header-nav {
    float: left;
    display: flex;
    margin-left: 20px;
    height: 70px;
  }

  .header-nav a > li {
    padding: 0 15px;
    color: #e6e6e6;
    line-height: 70px;
    font-size: 14px;
    display: block;
    width: 100%;
    height: 100%;
  }

  .header-nav .router-link-active > li{
    color: #03b5f7!important;
    border-bottom: 2px solid #03b5f7;
  }


  .header-right {
    float: right;
    color: #e6e6e6;
  }

  .header-right div {
    float: left;
    line-height: 70px;
    margin-left: 20px;
    font-size: 14px;
  }

  .header-right i {
    font-size: 10px;
    color: #999999;
  }
</style>
