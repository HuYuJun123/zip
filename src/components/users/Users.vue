<template>
  <div class="users">
    <main>
      <Row>
        <i-col span="5" class="usersLeft">
          <Menu theme="light" :active-name="meanAct" class="usersLeftF" @on-select="meanActF">
            <MenuGroup class="usersLeftOne">
              <div class="usersLeftOne-title">
                <Icon style="color:#ffd500;" type="ios-folder"></Icon>
                <span>舆情简报</span>
                <div class="san"></div>
              </div>
              <router-link :to="{name:'UserAdd'}">
                <MenuItem name="1">用户添加</MenuItem>
              </router-link>
              <router-link :to="{name:'UserList'}">
                <MenuItem name="2">用户列表</MenuItem>
              </router-link>
              <!--<router-link :to="{name:'UserEdit'}">-->
                <!--<MenuItem name="2">用户编辑</MenuItem>-->
              <!--</router-link>-->
            </MenuGroup>
          </Menu>
        </i-col>
        <i-col span="19" class="usersRight">
          <router-view></router-view>
          <!--<add v-show="meanAct==='1'"></add>-->
          <!--<list v-show="meanAct==='2'"></list>-->
        </i-col>
      </Row>
    </main>
  </div>
</template>
<script>
  export default{
    name: 'Users',
    data(){
      return {
        meanAct: '1',
      }
    },
    computed: {},
    methods: {
      meanActF(v){
        this.meanAct = v
      },
    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .users main {
    background: white;
    margin-top: 25px;
    padding: 0 20px;
    border: 1px solid #ededed;
  }

  .usersLeft {
    padding: 33px 15px;
  }

  .usersLeftF {
    width: 100% !important;
  }

  .usersLeftOne {
    background: #f8f8f8;
    width: 100% !important;
    position: relative;
    padding-top: 32px;
    margin-bottom: 45px;
    min-height: 200px;
  }

  .usersLeftOne-title {
    height: 32px;
    padding: 0 17px;
    position: absolute;
    left: 5px;
    top: -16px;
    background: #34495e;
    line-height: 32px;
    color: white;
    border-radius: 2px;
  }

  .usersLeftOne-title .san {
    width: 0;
    height: 0;
    border-bottom: 16px solid #34495e;
    border-right: 16px solid transparent;
    position: absolute;
    right: -15px;
    top: 0;
  }

  .usersLeftOne li {
    color: #333;
  }

  .usersRight {
    border-left: 1px solid #ededed;
    padding: 17px 0 100px 30px;
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #333;
    border: 0;
  }
  .usersLeftOne .router-link-exact-active li{
    background: #5184b8;
    color: white!important;
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0 !important;
  }
</style>
