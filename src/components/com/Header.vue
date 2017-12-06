<template>
  <header>
    <main>
      <img src="../../assets/logo.png" class="header-logo" alt="">
      <ul class="header-nav">
        <li :class="act===1?'active':''" @click="actF(1)">
          <a href="#/">舆情监测</a>
        </li>
        <li :class="act===2?'active':''" @click="actF(2)">
          <a href="#/h">全文搜索</a>
        </li>
        <li :class="act===3?'active':''" @click="actF(3)">
          <a href="#/bulletin">舆情简报</a>
        </li>
        <li :class="act===4?'active':''" @click="actF(4)">
          <a href="#/users">用户管理</a>
        </li>
        <li :class="act===5?'active':''" @click="actF(5)">
          <Dropdown>
            <a href="/">系统设置
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem>北京烤鸭</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
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
        act: 1
      }
    },
    computed: {},
    methods: {
      actF: function (v) {
        this.act = v
      }
    },
    mounted: function () {

    },
    watch: {}

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

  .header-nav > li {
    padding: 0 15px;
  }

  .header-nav > li.active a {
    color: #03b5f7;
  }

  .header-nav > li.active {
    border-bottom: 2px solid #03b5f7;
  }

  .header-nav a {
    color: #e6e6e6;
    line-height: 70px;
    font-size: 14px;
    display: block;
    width: 100%;
    height: 100%;
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
