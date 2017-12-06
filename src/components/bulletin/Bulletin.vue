<template>
  <div class="bulletin">
    <main>
      <Row>
        <i-col span="5" class="bulletinLeft">
          <Menu theme="light" :active-name="meanAct" class="bulletinLeftF" @on-select="meanActF">
            <MenuGroup class="bulletinLeftOne">
              <div class="bulletinLeftOne-title">
                <Icon style="color:#ffd500;" type="ios-folder"></Icon>
                <span>舆情简报</span>
                <div class="san"></div>
              </div>
              <router-link :to="{name:'BulletinList'}">
                <MenuItem name="1">简报列表 </MenuItem>
              </router-link>
              <router-link :to="{name:'Matter'}">
                <MenuItem name="2">素材管理 </MenuItem>
              </router-link>
            </MenuGroup>
            <MenuGroup class="bulletinLeftOne">
              <div class="bulletinLeftOne-title">
                <Icon style="color:#ffd500;" type="ios-folder"></Icon>
                <span>舆情观察</span>
                <div class="san"></div>
              </div>
              <MenuItem name="7">
                舆情观察
              </MenuItem>
            </MenuGroup>
          </Menu>
        </i-col>
        <i-col span="19" class="bulletinRight">
          <router-view></router-view>
        </i-col>
      </Row>
    </main>
  </div>
</template>
<script>
  export default{
    name: 'Bulletin',
    data(){
      return {
        modal1: false,
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
  .bulletin main {
    background: white;
    margin-top: 25px;
    padding: 0 20px;
    border: 1px solid #ededed;
  }

  .bulletinLeft {
    padding: 33px 15px 33px 0;
  }

  .bulletinLeftF {
    width: 100% !important;
  }

  .bulletinLeftOne {
    background: #f8f8f8;
    width: 100% !important;
    position: relative;
    padding-top: 32px;
    margin-bottom: 45px;
  }

  .bulletinLeftOne-title {
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

  .bulletinLeftOne-title .san {
    width: 0;
    height: 0;
    border-bottom: 16px solid #34495e;
    border-right: 16px solid transparent;
    position: absolute;
    right: -15px;
    top: 0;
  }

  .bulletinLeftOne li {
    color: #333;
  }

  .bulletinRight {
    border-left: 1px solid #ededed;
    padding: 17px 0 100px 30px;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    color: #333;
    border-right: 0;
  }
  .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background:#5184b8 ;
    color: white;
  }
  .router-link-exact-active li{
    background: #5184b8;
    color: white!important;
    border-right: 0;
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0 !important;
  }
</style>
