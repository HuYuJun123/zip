<template>
  <div class="bulletin">
    <main>
      <Row v-show="bulletin===1">
        <i-col span="5" class="bulletinLeft">
          <Menu theme="light" :active-name="meanAct" class="bulletinLeftF" @on-select="meanActF">
            <MenuGroup class="bulletinLeftOne">
              <div class="bulletinLeftOne-title">
                <Icon style="color:#ffd500;" type="ios-folder"></Icon>
                <span>舆情简报</span>
                <div class="san"></div>
              </div>
              <MenuItem name="1">
                简报列表
              </MenuItem>
              <MenuItem name="2">
                素材管理
              </MenuItem>
              <MenuItem name="3">
                模版管理
              </MenuItem>
              <MenuItem name="4">
                旧版管理
              </MenuItem>
            </MenuGroup>
            <MenuGroup class="bulletinLeftOne">
              <div class="bulletinLeftOne-title">
                <Icon style="color:#ffd500;" type="ios-folder"></Icon>
                <span>收藏夹</span>
                <div class="san"></div>
              </div>
              <MenuItem name="5">
                默认文件夹
              </MenuItem>
              <MenuItem name="6">
                我最喜欢
              </MenuItem>
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
          <bulletin-list v-show="meanAct==='1'" @amend="amendF"></bulletin-list>
          <Matter v-show="meanAct==='2'" @create="createF" :list="listCon"></Matter>
          <h1 v-show="meanAct!='2'&meanAct!='1'">模版正在建设</h1>
        </i-col>
      </Row>
      <Create v-show="bulletin===2" :data="create" @back="backF" @preview="previewF"></Create>
      <Amend v-show="bulletin===3" @back="backF2"></Amend>
    </main>
    <Modal v-model="modal1" width="80" :closable="false">
      <Preview></Preview>
      <footer>
        <Button @click="modal1=false" style="width:160px;height: 40px;display: block;margin: 35px auto;color: #333;font-size: 16px" type="ghost">
          返回
        </Button>
      </footer>
    </Modal>

  </div>
</template>
<script>
  import BulletinList from './BulletinList.vue';
  import Matter from './Matter.vue';
  import Create from './Create.vue';
  import Amend from './Amend .vue';
  import Preview from './Preview.vue'
  export default{
    name: 'Bulletin',
    components: {BulletinList, Matter, Create, Amend, Preview},
    data(){
      return {
        modal1: false,
        meanAct: '1',
        bulletin: 1,
        create: {time: ''},
        listCon: [
          {
            id: 1,
            title: "这是测试标题1",
            ext: '这是测试在要在要这是测试在要在要这是测试在要在要这是测试在要在要',
            url: 'https://www.baidu.com/',
            keywords: "测试1,测试2",
            create_date: '2017-9-22',
            media_name: '测试来源1',
            content: '这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容1111111'
          },
          {
            id: 2,
            title: "这是测试标题2",
            ext: '',
            url: 'http://www.sina.com.cn/',
            keywords: "测试1,测试2",
            create_date: '2017-9-23',
            media_name: '测试来源2',
            content: '这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容2222'
          },
          {
            id: 3,
            title: "这是测试标题3",
            ext: '这是测试在要在要这是测试在要在要这是测试在要在要这是测试在要在要',
            url: 'https://www.toutiao.com/',
            keywords: "测试1,测试2",
            create_date: '2017-9-24',
            media_name: '测试来源3',
            content: '这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容33333333'
          },
        ]
      }
    },
    computed: {},
    methods: {
      meanActF(v){
        this.meanAct = v
      },
      createF(time){
        this.meanAct = '1';
        this.bulletin = 2;
        this.create.time = time
      },
      backF(){
        this.bulletin = 1;
        this.meanAct = '2'
      },
      backF2(){
        this.bulletin = 1;
        this.meanAct = '1'
      },
      amendF(v){
        this.bulletin = 3
        console.log(v)
      },
      previewF(){
        this.modal1 = true
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

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #5184b8;
    color: white;
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0 !important;
  }
</style>
