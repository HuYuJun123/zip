<template>
  <div class="scheme">
    <div class="schemeInfo">
      <main>
        <div class="schemeInfo-left">
          <p>这里可以添加方案</p>
          <Button type="primary" shape="circle" @click="actFun(7)">添加监测方案</Button>
        </div>
        <img src="../../assets/idea.png" class="schemeInfo-right" alt="">
      </main>
    </div>
    <div class="schemeDetails">
      <main>
        <Row>
          <i-col span="5" class="schemeDetails-classify">
            <div class="schemeDetails-classify-input">
              <Input v-model="search" placeholder="舆情方案"></Input>
            </div>
            <Menu theme="light" :active-name="meanAct" width="100%" class="schemeDetails-classify-mean"
                  @on-select="mean">
              <MenuItem :name="v.id" v-for="v in meanOption" :key="v.id"
                        :class="meanAct===v.id?'ivu-menu-item-active schemeMean ':'schemeMean'">
                <span>{{v.name}}</span>
                <div class="schemeMeanEdit" @click.stop="edit(v.id)">
                  <Icon type="edit"></Icon>
                </div>
              </MenuItem>
            </Menu>
          </i-col>
          <i-col span="19" class="schemeDetails-list">
            <ul class="schemeDetails-list-nav">
              <li :class="act===1?'active':''" @click="actFun(1)">信息列表</li>
              <li :class="act===2?'active':''" @click="actFun(2)">统计分析图</li>
              <li :class="act===3?'active':''" @click="actFun(3)">预警设置</li>
              <li :class="act===4?'active':''" @click="actFun(4)">添加方案</li>
              <li :class="act===5?'active':''" @click="actFun(5)">编辑方案</li>
            </ul>
            <div class="schemeDetails-list-option" v-show="act===1">
              <options @search="searchF"></options>
              <list-form v-show="!loading" :list="listCon" :info="textInfo" @funSome="funSomeF"
                         @searchFun="searchFunF"></list-form>
              <Page v-show="!loading" :current="pageNow" :total="100" simple class="schemeDetails-list-page"
                    @on-change="page"></Page>
              <img v-show="loading" src="../../assets/loading.gif" alt="" style="display: block;margin: 0 auto">
            </div>
            <Analyze v-show="act===2"></Analyze>
            <Statistics v-show="act===3"></Statistics>
            <add-scheme @addSucceed="addSucceedF" v-show="act===4"></add-scheme>
            <edit-scheme :list="meanOptionEdit" v-show="act===5"></edit-scheme>
          </i-col>
        </Row>
      </main>
    </div>
  </div>
</template>
<script>
  import Options from '../com/Option.vue';
  import ListForm from '../com/ListForm.vue';
  import AddScheme from './AddScheme.vue';
  import EditScheme from './EditScheme.vue';
  import Statistics from './Statistics.vue';
  import Analyze from './Analyze.vue';
  export default{
    name: 'Scheme',
    components: {Options, ListForm, AddScheme, EditScheme,Statistics,Analyze},
    data(){
      return {
        pageNow: 1,
        loading: false,
        search: '',
        meanAct: 6,
        meanOption: [
          {id: 1, name: '测试方案1'},
          {id: 2, name: '测试方案2'}
        ],
        meanOptionEdit: {},
        act: 1,
        listCon: [
          {
            title: "这是<span class='cRed'>测试</span>标题1",
            ext: '这是测试在要在要这是测试在要在要这是测试在要在要这是测试在要在要',
            url: 'https://www.baidu.com/',
            keywords: "测试1,测试2",
            create_date: '2017-9-22',
            media_name: '测试来源1',
            content: '这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容1111111'
          },
          {
            title: "这是<span class='cRed'>测试</span>标题2",
            ext: '',
            url: 'http://www.sina.com.cn/',
            keywords: "测试1,测试2",
            create_date: '2017-9-22',
            media_name: '测试来源2',
            content: '这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容2222'
          },
          {
            title: "这是<span class='cRed'>测试</span>标题3",
            ext: '这是测试在要在要这是测试在要在要这是测试在要在要这是测试在要在要',
            url: 'https://www.toutiao.com/',
            keywords: "测试1,测试2",
            create_date: '2017-9-22',
            media_name: '测试来源3',
            content: '这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容这是测试的内容33333333'
          },
        ]
      }
    },
    computed: {
      options: function () {
        let obj = {}
        this.meanOption.forEach(v => {
          if (v.id === this.meanAct) {
            obj = v
          }
        })
        return obj
      },
      textInfo: function () {
        let arr = [];
        arr.push({path: this.$route.path, name: '舆情监测'});
        arr.push({path: '', name: this.meanOptionEdit.name});
        return arr
      }
    },
    methods: {
      page: function (v) {
        this.pageNow = v;
        let data = {page: v, queryId: this.meanAct};
//        $.post("http://10.100.82.221:8089/programme/content/page", data, (c => {
//          if (c.code === 100) {
//            this.listCon = c.obj
//            $('html,body').animate({scrollTop:430 }, 500);
//          }
//        }), 'json')
        $.ajax({
            url: 'http://10.100.82.221:8089/programme/content/page',
            async: false,
            type: 'POST',
            data: data,
            beforeSend: () => {
              this.loading = true
            },
            success: (c) => {
              if (c.code === 100) {
                this.loading = false
                this.listCon = c.obj
                $('html,body').animate({scrollTop: 430}, 200);
              }
            }
          }
        )
      },
      actFun: function (v) {
        this.act = v
      },
      mean: function (v) {
        this.meanAct = v
        this.meanOptionEdit = this.meanOption.filter(c => c.id === v)[0];
      },
      addSucceedF: function (data) {
        this.meanOption.push(data);
        console.log(this.meanOption)
      },
      edit: function (id) {
        this.meanAct = id;
        this.act = 5;
        this.meanOptionEdit = this.meanOption.filter(v => v.id === id)[0];
      },
      funSomeF: function (type, par) {
        console.log(type, par, 'fu');
        switch (type) {
          case 44:
            let p = {
              url: par.url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
              desc: '', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
              title: '', /*分享标题(可选)*/
              summary: '', /*分享摘要(可选)*/
              pics: '', /*分享图片(可选)*/
              flash: '', /*视频地址(可选)*/
              site: '', /*分享来源(可选) 如：QQ分享*/
              style: '202',
            };
            let s = [];
            for (var i in p) {
              s.push(i + '=' + encodeURIComponent(p[i] || ''));
            }
            ;
            location.href = 'http://connect.qq.com/widget/shareqq/index.html?' + s.join("&");
            break;
        }
      },
      searchFunF: function (v) {
        console.log(v, "fu")
      },
      searchF(screen){
        let data = {queryId: this.meanAct, screen: screen}
        $.post("http://10.100.82.221:8089/programme/content/search", data, (v) => {
          if (v.code === 100) {
            this.pageNow = 1;
            this.listCon = v.obj;
          }
        }, "json");
      }
    },
    mounted: function () {
      $.post("http://10.100.82.221:8089/programme/overview", this.formItem, (v) => {
        if (v.code === 100) {
          let data = v.obj;
          this.listCon = data.elastic = [] ? this.listCon : data.elastic;
          this.meanAct = data.queryId;
          this.meanOption = data.programmes;
          this.meanOptionEdit = data.programmes.filter(v => v.id === data.queryId)[0];
          console.log(this.meanOption)
        }
      }, "json");
    },
    watch: {}

  }
</script>
<style scoped>
  .scheme {
    padding-bottom: 100px;
    background: #f8f8f8;
  }

  .schemeInfo {
    width: 100%;
    height: 170px;
    background: rgb(248, 248, 248);
    padding-bottom: 60px;
  }

  .schemeInfo-left {
    float: left;
  }

  .schemeInfo-left p {
    line-height: 55px;
    color: #999;
    font-size: 14px;
  }

  .schemeInfo-left button {
    width: 160px;
    height: 40px;
  }

  .schemeInfo-right {
    height: 100%;
    width: auto;
    display: block;
    float: right;
    margin-right: 20px;
  }

  .schemeDetails {
    width: 100%;
    height: auto;
  }

  .schemeDetails .ivu-row {
    top: -60px;
    border: 1px solid #eee;
    background: white;
  }

  .schemeDetails-list {
    background: white;
    border-left: 1px solid #eee;
  }

  .schemeDetails-list-nav {
    padding: 15px 30px;
    height: 60px;
    line-height: 45px;
    width: 100%;
    font-size: 14px;
    box-shadow: 0 1px 1px 0 #ddd;
    background: #f8f8f8;
  }

  .schemeDetails-list-nav li {
    float: left;
    padding: 0 15px;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
  }

  .schemeDetails-list-nav li.active {
    background: white;
    border: 1px solid rgba(200, 200, 200, 0.5);
    border-bottom: 1px solid #fff;
    color: #03b5f7;
  }

  .schemeDetails-list-page {
    margin: 30px auto;
    width: 200px;
  }

  .schemeDetails-classify {
    padding: 17px 15px;
    background: #fff;
  }

  .schemeDetails-classify-input {
    width: 100%;
    height: 37px;
  }

  .schemeDetails-classify-mean {
    padding-top: 10px;
  }

  .schemeDetails-classify-mean li {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 10px;
    border-radius: 3px;
    margin-top: 10px;
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: white;
    background: #5184b8;
    border-right: 0;
  }

   .schemeDetails-list-option {
    padding: 0 30px;
    margin-top: 20px;
  }

  .schemeMean:hover .schemeMeanEdit {
    opacity: 1;
  }

  .schemeMeanEdit {
    float: right;
    line-height: 16px;
    opacity: 0;
    transition: all 0.5s;
    margin-top: 8px;
    font-size: 12px;
  }

  .schemeMeanEdit:hover {
    color: black;
    transform: scale(1.2);
  }
</style>
