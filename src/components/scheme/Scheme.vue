<template>
  <div class="scheme">
    <div class="schemeInfo">
      <main>
        <div class="schemeInfo-left">
          <p>这里可以添加方案</p>
          <Button type="primary" shape="circle" @click="actFun(4)">添加监测方案</Button>
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
              <options @search="searchF" :filter="filter" :list="schemeS" @preserve="preserveF"></options>
              <list-form v-show="!loading" :list="listCon" :info="textInfo" @funSome="funSomeF" @funSomeS="funSomeFS"
                         @searchFun="searchFunF"></list-form>
              <Page v-show="!loading&&listCon.length" :current="pageNow" :total="total" simple class="schemeDetails-list-page"
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
    components: {Options, ListForm, AddScheme, EditScheme, Statistics, Analyze},
    data(){
      return {
        pageNow: 1,
        total: 0,
//        数据获取中的状态
        loading: false,
        search: '',
        meanAct: null,
//        菜单栏的数据展示
        meanOption: [],
//        修改方案时的数据 当前选中的方案
        meanOptionEdit: {},
        act: 1,
        listCon: [],
//        筛选条件
        schemeS: {time: '今日', sen: '时间升序', show: '显示', he: '不合并', sourceType: ['论坛', '微博']},
        filter: sessionStorage.filter ? JSON.parse(sessionStorage.filter) : []
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
//        翻页查询数据
      page: function (v) {
        this.pageNow = v;
        let data = {page: v, queryId: this.meanAct};
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
                this.loading = false;
                this.listCon = c.obj;
                $('html,body').animate({scrollTop: 430}, 200);
              }
            }
          }
        )
      },
      actFun: function (v) {
        this.act = v
      },
//      菜单栏更改后的操作
      mean: function (v) {
        sessionStorage.schemeMean = v;
        this.meanAct = v;
        let data = v.toString();
        $.ajax({
          url: 'http://10.100.82.221:8089/programme/filter/get',
          async: false,
          type: 'POST',
          contentType: 'application/json',
          data: data,
          success: (c) => {
            if (c.code === 100) {
              let obj = {time: '', sen: '', show: '', he: '', sourceType: []};
              obj.sourceType = c.obj;
              sessionStorage.fil=JSON.stringify(obj);
              obj.sourceType = c.obj.split(',');
              this.schemeS = obj
            }
          },
          error: (s) => {
            console.log(s)
          }
        })
      },
//      添加方案
      addSucceedF: function (data) {
        this.meanOption.push(data);
        console.log(this.meanOption)
      },
//      修改方案
      edit: function (id) {
        this.meanAct = id;
        this.act = 5;
      },
//      单条数据操作
      funSomeF: function (type, par) {
        console.log(type, par, 'fu');
        switch (type) {
          //qq分享
          case 44:
            let p = {
              url: par.url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
              desc: '', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
              title: par.title.replace(/<([^]*?)>/g, ''), /*分享标题(可选)*/
              summary: '', /*分享摘要(可选)*/
              pics: '', /*分享图片(可选)*/
              flash: '', /*视频地址(可选)*/
              site: '', /*分享来源(可选) 如：QQ分享*/
              style: '202',
            };
            let s = [];
            for (let i in p) {
              s.push(i + '=' + encodeURIComponent(p[i] || ''));
            }
            location.href = 'http://connect.qq.com/widget/shareqq/index.html?' + s.join("&");
            break;
          //微信分享
          case 43:
            let wx = {
              "touser": "OPENID",
              "msgtype": "text",
              "text": {
                "content": "Hello World"
              },
              "customservice": {
                "kf_account": "test1@kftest"
              }
            };
            $.post('https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN', wx, () => {
              alert('ok')
            });
            break;
          //短信分享
          case 42:
            $.get('http://v.juhe.cn/sms/send?mobile=18334784263&tpl_value=测试');
            break;
          case 41:
          //邮件分享
          case 1:
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/material/add",
              contentType: "application/json; charset=utf-8",
              data: par.docId,
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  this.$Notice.success({
                    title: '添加成功',
                  });
                }
              }
            });
            break;
          case 3:
            let data = JSON.stringify(
              {
                "docId": par.docId,
                "docType": par.docType,
                "sensitiveStatus": par.sensitive ? 0 : 1
              })
            let title = '';
            if (par.sensitive) {
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
                  this.listCon.forEach(c => {
                    if (c.docId === par.docId) {
                      c.sensitive = !c.sensitive
                    }
                  })
                  this.$Notice.success({
                    title: title,
                  });
                }
              }
            });
            break;
        }
      },
//      批量数据操作
      funSomeFS(type, par, arr){
        let url = '';
        let title = '';
        let tag = 0;
        let data = null;
        switch (type) {
          case 2 :
            url = 'http://10.100.82.221:8089/material/addmulti';
            title = '添加成功';
            data = par;
            break;
          case 3 :
            url = 'http://10.100.82.221:8089/document/batch/sensitive';
            title = '全部标敏成功';
            tag = 1;
            data = arr;
            break;
          case 4 :
            url = 'http://10.100.82.221:8089/document/batch/nonsensitive';
            title = '全部取消标敏成功';
            tag = 2;
            data = arr;
            break;
        }
        $.ajax({
          type: "POST",
          url: url,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          dataType: "json",
          success: (v) => {
            if (v.code === 100) {
              if (tag) {
                this.listCon.forEach(c => {
                  c.sensitive = tag === 1 ? true : false;
                })
              }
              this.$Notice.success({
                title: title,
              });
            }
          }
        })
      },
      searchFunF: function (v) {
        console.log(v, "fu")
      },
//      根据筛选 查询某个方案的数据
      searchF(screen){
        this.loading = true;
        let obj = {};
        $.each(screen, (key, val) => {
          if (typeof (val) === 'object') {
            obj[key] = val.join(',')
          } else {
            obj[key] = val
          }
        });
        this.pageNow = 1;
        let data = JSON.stringify({page: 1, id: this.meanAct, filter: obj});
        $.ajax({
            url: 'http://10.100.82.221:8089/programme/filter/content/page',
            async: false,
            type: 'POST',
            contentType: 'application/json',
            data: data,
            beforeSend: () => {
              this.loading = true
            },
            success: (c) => {
              if (c.code === 100) {
                this.loading = false;
                this.listCon = c.obj;
                $('html,body').animate({scrollTop: 430}, 200);
              }
            }
          }
        )
      },
      //    保存方案的筛选
      preserveF(v){
        let obj = {};
        $.each(v, (key, val) => {
          if (typeof (val) === 'object') {
            obj[key] = val.join(',')
          } else {
            obj[key] = val
          }
        })
        let data = JSON.stringify({
          filter: obj,
          id: this.meanAct
        });
        $.ajax({
          url: 'http://10.100.82.221:8089/programme/filter/save',
          async: false,
          type: 'POST',
          contentType: 'application/json',
          data: data,
          success: (c) => {
            if (c.code === 100) {
             this.$Notice.success({title:'保存成功'})
            }
          }
        })
      },
    },
//    初始化刚开始的页面
    mounted: function () {
      if (sessionStorage.schemeMean) {
        this.meanAct = parseInt(sessionStorage.schemeMean);
        this.meanOption = JSON.parse(sessionStorage.meanOption);
        this.meanOptionEdit = JSON.parse(sessionStorage.meanOption).filter(v => v.id === this.meanAct)[0];
        this.total = 100;
        let obj=JSON.parse(sessionStorage.fil);
        obj.sourceType=obj.sourceType.split(',');
        this.schemeS=obj
        this.searchF(JSON.parse(sessionStorage.fil))

      } else {
        $.post("http://10.100.82.221:8089/programme/overview", this.formItem, (v) => {
          if (v.code === 100) {
            let data = v.obj;
            this.total = 100;
//            获取当前方案查询的第一页数据
            this.listCon = data.elastic.length ? data.elastic : [];
//            来源类型
            this.filter = data.filter;
            sessionStorage.filter = JSON.stringify(data.filter);
//            获取当前方案的数据
            this.meanAct = data.queryId;
            this.meanOption = data.programmes;
//            将方案列表保存到本地
            sessionStorage.meanOption = JSON.stringify(data.programmes);
          }
        }, "json");
      }
    },
    watch: {
      meanAct(){
//        获取选中状态的方案信息
        this.meanOptionEdit = this.meanOption.filter(v => v.id === this.meanAct)[0];
      }
    }

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
