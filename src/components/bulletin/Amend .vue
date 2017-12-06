<template>
  <div class="amend">
    <main style=" background: white;
    margin-top: 25px;
    padding: 0 20px;
    border: 1px solid #ededed;">
      <Row>
        <i-col span="5" class="amendLeft">
          <Affix :offset-top="100">
            <Menu theme="light" :active-name="meanAct" class="amendLeftF" @on-select="meanActF">
              <MenuGroup class="amendLeftOne">
                <div class="amendLeftOne-title">
                  <Icon style="color:#ffd500;" type="ios-folder"></Icon>
                  <span>舆情简报</span>
                  <div class="san"></div>
                </div>
                <MenuItem name="1">
                  简报概述
                  <div class="moduleAdd" @click.stop="moduleAdd(1)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
                <MenuItem name="2">
                  处置建议
                  <div class="moduleAdd" @click.stop="moduleAdd(2)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
                <MenuItem name="3">
                  监测总揽
                  <div class="moduleAdd" @click.stop="moduleAdd(3)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
                <MenuItem name="4">
                  媒体来源分析
                  <div class="moduleAdd" @click.stop="moduleAdd(4)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
                <MenuItem name="5">
                  新闻来源分析
                  <div class="moduleAdd" @click.stop="moduleAdd(5)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
                <MenuItem name="6">
                  情感分析
                  <div class="moduleAdd" @click.stop="moduleAdd(6)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
                <MenuItem name="7">
                  主要舆情
                  <div class="moduleAdd" @click.stop="moduleAdd(7)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
                <MenuItem name="8">
                  舆情导读
                  <div class="moduleAdd" @click.stop="moduleAdd(8)">
                    <Icon type="plus-round"></Icon>
                  </div>
                </MenuItem>
              </MenuGroup>
            </Menu>
          </Affix>
        </i-col>
        <i-col span="19" class="amendRight">
          <h1>修改简报</h1>
          <div class="amendCon">
            <div class="amendCon-title">
              <Input v-model="list.base.header" placeholder="简报标题" style="width: 150px" class="amendCon-title1"></Input>
              <router-link :to="{path:'/bulletin'}" class="back">返回</router-link>
              <p style="text-align: center;margin-top: 20px;font-size: 14px;color:#666;">
                第（<Input v-model="list.base.number" placeholder="0" style="width: 50px"></Input>）期
              </p>
              <p style="text-align: center;margin-top: 5px;font-size: 14px;color:#666;">
                <span style="margin-right: 10px">{{list.base.name}}</span>
                <span>{{list.base.number}}</span>
              </p>
              <div class="amendCon-line"></div>
            </div>
            <a ref='lc1' name="lc1"></a>   <!--楼层跳转的描点-->
            <div class="amendConOne" v-show="show.s1">
              <div class="amendConOne-title">
                <!--<Input v-model="list.title1" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>{{obj.s1?obj.s1:''}}丶简报概述</h2>
                <i class="iconfont" @click="del(1)">&#xe600;</i>
              </div>
              <Input v-model="list.guide" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"
                     placeholder="Enter something..."></Input>
            </div>
            <a ref='lc2' name="lc2"></a>
            <div class="amendConOne" v-show="show.s2">
              <div class="amendConOne-title">
                <!--<Input v-model="list.title2" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>{{obj.s2?obj.s2:''}}丶处置建议</h2>
                <i class="iconfont" @click="del(2)">&#xe600;</i>
              </div>
              <Input v-model="list.opioion" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"
                     placeholder="Enter something..."></Input>
            </div>
            <a ref='lc3' name="lc3"></a>
            <div class="amendConOne" v-show="obj.s0">
              <h2>{{obj.s0?obj.s0:''}}丶监测总揽</h2>
            </div>
            <div class="amendConOne" v-show="show.s3">
              <div class="amendConOne-title" v-show="obj.s0">
                <!--<Input v-model="list.title2" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>({{obj.s3?obj.s3:''}})丶监测概述</h2>
                <i class="iconfont" @click="del(3)">&#xe600;</i>
              </div>
              <Input v-model="list.mointor" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"
                     placeholder="Enter something..."></Input>
            </div>
            <a ref='lc4' name="lc4"></a>
            <div class="amendConOne" v-show="show.s4">
              <div class="amendConOne-title">
                <!--<Input v-model="list.title3" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>（{{obj.s4?obj.s4:''}}）丶媒体来源分析</h2>
                <i class="iconfont" @click="del(4)">&#xe600;</i>
              </div>
              <div style="background:#fff;padding: 35px 0;border-radius: 5px">
                <pie id="pieAmend" :datas="list.pie"></pie>
              </div>
            </div>
            <a ref='lc5' name="lc5"></a>
            <div class="amendConOne" v-show="show.s5">
              <div class="amendConOne-title">
                <!--<Input v-model="list.title4" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>（{{obj.s5?obj.s5:''}}）丶新闻来源分析</h2>
                <i class="iconfont" @click="del(5)">&#xe600;</i>
              </div>
              <div style="background:#fff;padding: 35px 0;border-radius: 5px">
                <Annular id="annularAmend" :datas="list.annular"></Annular>
              </div>
            </div>
            <a ref='lc6' name="lc6"></a>
            <div class="amendConOne" v-show="show.s6">
              <div class="amendConOne-title">
                <!--<Input v-model="list.title5" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>（{{obj.s6?obj.s6:''}}）丶情感分析</h2>
                <i class="iconfont" @click="del(6)">&#xe600;</i>
              </div>
              <div style="background:#fff;padding: 35px 0;border-radius: 5px">
                <Columnar id="columnarAmend" :datas="list.columnar"></Columnar>
              </div>
            </div>
            <a ref='lc7' name="lc7"></a>
            <div class="amendConTwo" v-show="show.s7">
              <div class="amendConOne-title amendConTwo-title">
                <!--<Input v-model="list.title6" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>{{obj.s7?obj.s7:''}}丶主要舆情</h2>
                <i class="iconfont" @click="del(7)">&#xe600;</i>
              </div>
              <Table :columns="tableTitle" :data="list.table"></Table>
            </div>
            <a ref='lc8' name="lc8"></a>
            <div class="amendConTwo" v-show="show.s8">
              <div class="amendConOne-title amendConTwo-title">
                <!--<Input v-model="list.title7" placeholder="简报概述" style="width: 170px"></Input>-->
                <h2>{{obj.s8?obj.s8:''}}丶舆情导读</h2>
                <i class="iconfont" @click="del(8)">&#xe600;</i>
              </div>
              <ul>
                <li class="amendConOne-ext" v-for="(v,i) in list.table">
                  <h3>({{i + 1}}){{v.title}}</h3>
                  <div style="border: 1px solid #f9f9f9;border-top: 0">
                    <div class="amendConOne-ext1">
                      <div>性质：<span v-if="v.sensitiveStatus">敏感</span><span v-else>非敏感</span></div>
                      <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">
                        文章来源：{{v.mediaName}}
                      </div>
                      <div>时间：{{v.createDate.split('T').join('  ')}}</div>
                    </div>
                    <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
                      <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
                      <p style="width: calc(100% - 100px);line-height: 30px">
                        {{v.content.trim().substring(0, 100)}}...</p>
                    </div>
                    <a :href="v.url" class="amendCon-url">原文地址：<span>{{v.url}}</span></a>
                  </div>
                </li>
              </ul>
            </div>
            <Row type="flex" justify="center" class="code-row-bg" className="createButton">
              <i-col>
                <Button type="primary" style="width: 160px;height: 36px;margin-right: 50px" @click="sub">保存简报</Button>
              </i-col>
              <i-col>
                <router-link :to="{path:'/bulletin'}">
                  <Button type="ghost" style="width: 160px;height: 36px"> 返回</Button>
                </router-link>
              </i-col>
            </Row>
          </div>
        </i-col>
      </Row>
    </main>
  </div>

</template>
<script>
  import BrokenLine from '../echarts/BrokenLine.vue'
  import Pie from '../echarts/Pie.vue'
  import Annular from '../echarts/Annular.vue'
  import Columnar from '../echarts/Columnar.vue'
  import Lt from '../com/LT.vue'
  export default{
    name: 'Amend',
    components: {BrokenLine, Pie, Annular, Columnar, Lt},
    data(){
      return {
//          序列号
        obj: {},
//        滚动事件的滚动条高度
        scroll: '',
        meanAct: '1',
//        表格的设置头
        tableTitle: [
          {
            type: 'index',
            width: 60,
            align: 'center',
            title: '序列',
          },
          {
            title: '标题',
            key: 'title',
            align: 'center',
          },
          {
            title: '日期与来源',
            align: 'center',
            width: 170,
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    t: params.row.createDate ? params.row.createDate.split('T').join(' ') : params.row.spiderTime.split('T').join(' '),
                    l: params.row.mediaName,
                    n: 1
                  },
                }),
              ])
            }
          },
          {
            title: '属性',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    s: params.row.sensitiveStatus,
                    n: 2,
                  },
                }),
              ])
            }
          },
          {
            title: '操作',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    n: 3
                  },
                  on: {
                    click: () => {
                      this.funF(params)
                    }
                  }
                }),
              ])
            }
          }],
        list: {base: {header: ''}}  //防止报错，初始化的列表
      }
    },
    computed: {
      //转化显示的模块的数据 让数据好管理
      show: function () {
        let obj = {s1: false, s2: false, s3: false, s4: false, s5: false, s6: false, s7: false, s8: false};
        if (this.list.showPosition) {
          this.list.showPosition.forEach(v => {
            obj['s' + v] = true
          });
//          调佣函数 生成模块动态序列号
          this.getSerial(this.list.showPosition);
        }
        return obj
      }
    },
    methods: {
      //菜单选中、楼层跳转、利用a标签
      meanActF(v){
        this.meanAct = v;
        let height = 0;
        let show = parseInt(v);
        if (this.list.showPosition.includes(show)) {
          height = this.$refs['lc' + v].offsetTop;
          $('html,body').animate({scrollTop: height + 100}, 500);
        } else {
          this.$Notice.open({title: '该模块暂未添加'})
        }
      },
      funF(v){
        console.log(v, '编辑')
      },
      //添加模块
      moduleAdd(v){
        if (!this.list.showPosition.includes(v)) {
          this.list.showPosition.push(v)
          this.$Notice.success({title: '添加成功'})
        } else {
          this.$Notice.error({title: '模块已存在'})
        }
      },
      //删除模块
      del(v){
        let index = [];
        this.list.showPosition.forEach((c, i) => {
          if (c === v) {
            index.unshift(i)
          }
        });
        index.forEach(c => {
          this.list.showPosition.splice(c, 1)
        })
        this.$Notice.success({title: '删除成功'})
      },
      //修改提交
      sub(){
        let data = {};
        data.base = this.list.base;
        data.id = this.list.id;
        data.guide = this.list.guide;
        data.opioion = this.list.opioion;
        data.mointor = this.list.mointor;
        data.showPosition = this.list.showPosition.join(',');
        $.ajax({
          type: "POST",
          url: "http://10.100.82.221:8089/briefing/update",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          dataType: "json",
          success: (v) => {
            this.$Notice.success({
              title: '保存成功',
            });
          }
        })
      },
      //滚动事件  楼层控制
      menu() {
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.$refs.lc1 && this.list.showPosition) {      //避免该页面还没有渲染就执行
          this.list.showPosition.sort().forEach(c => {    //先让显示的数组排序
            let num = this.$refs['lc' + c].offsetTop - this.scroll;  //判断什么时候到达对应楼层
            if (num < 0) {
              this.meanAct = c.toString()
            }
          })
        }
      },
      //生成动态序列号  和data中的obj相连
      getSerial(data){
        let arr = ['占位', '一', '二', '三', '四', '五', '六', '七', '八'];
        let obj = {};
        let numB = 0;
        let numS = 0;
        data.sort().forEach(c => {
          if (c < 3) {
            obj['s' + c] = ++numB
          } else if (2 < c && c < 7) {
            if (!numS) {
              numB++
              obj.s0 = 3
            }
            obj['s' + c] = ++numS
          } else if (c > 6) {
            obj['s' + c] = ++numB
          }
        });
        this.obj = {
          s0: arr[obj.s0],
          s1: arr[obj.s1],
          s2: arr[obj.s2],
          s3: arr[obj.s3],
          s4: arr[obj.s4],
          s5: arr[obj.s5],
          s6: arr[obj.s6],
          s7: arr[obj.s7],
          s8: arr[obj.s8]
        }
      }
    },
    mounted: function () {
      //监测滚轮
      window.addEventListener('scroll', this.menu);
      let id = JSON.stringify(this.$route.query.id);
      $.ajax({
        type: "POST",
        url: "http://10.100.82.221:8089/briefing/detail",
        contentType: "application/json; charset=utf-8",
        data: id,
        dataType: "json",
        success: (v) => {
          if (v.code === 100) {
            this.modal1 = true;
            let data = v.obj;
            let obj = {};
            obj.id = data.id;
            obj.base = data.base;
            obj.guide = data.guide;
            obj.opioion = data.opioion;
            obj.mointor = data.mointor;
            obj.showPosition = data.showPosition.split(',').map(c => parseInt(c));//显示模块的数组
            obj.table = data.news;
            //三个图表的数据
            obj.pie = data.sourceChart.map(v => {
              return {value: v.count, name: v.name}
            });
            obj.columnar = data.mediaChart.map(v => {
              return {value: v.count, name: v.name}
            });
            obj.annular = data.sensitiveChart.map(v => {
              if (v.name === '1') {
                return {value: v.count, name: '敏感'}
              } else {
                return {value: v.count, name: '非敏感'}
              }
            }).reverse();
            this.list = obj;
          }
        },
        error: () => {
          location.href = '#/bulletin'
          this.$Notice.error({title: '网络连接错误'})
        }
      })
    },
  }
</script>
<style scoped>
  .amendLeft {
    padding: 33px 15px 33px 0;
  }

  .amendLeftF {
    width: 100% !important;
  }

  .amendLeftOne {
    background: #f8f8f8;
    width: 100% !important;
    position: relative;
    padding-top: 32px;
    margin-bottom: 45px;
  }

  .amendLeftOne-title {
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

  .amendLeftOne-title .san {
    width: 0;
    height: 0;
    border-bottom: 16px solid #34495e;
    border-right: 16px solid transparent;
    position: absolute;
    right: -15px;
    top: 0;
  }

  .amendLeftOne li:hover .moduleAdd {
    opacity: 1;
  }

  .moduleAdd {
    float: right;
    line-height: 32px;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .amendLeftOne li {
    color: #333;
  }

  .amendLeftOne li {
    color: #333;
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #5184b8;
    color: white;
    border-right: 0;
  }

  .amendRight {
    border-left: 1px solid #ededed;
    padding: 17px 0 100px 30px;
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0 !important;
  }

  .amendRight h1 {
    width: 100%;
    line-height: 37px;
    padding-left: 17px;
    color: #333333;
    font-size: 16px;
    background: #f9f9f9;
    margin-bottom: 37px
  }

  .amendRight h2 {
    font-size: 16px;
    color: #333;
    line-height: 30px;
    padding-left: 10px;
    display: block;
    width: 200px;
    height: 30px;
    margin-bottom: 17px;
    font-weight: 100;
    background: white;
    border: 1px solid #dddee1;
    border-radius: 4px;
  }

  .amendCon {
    box-shadow: 0 0 2px 2px #eee;
    padding: 25px 34px 60px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }

  .amendCon-title1 {
    display: block;
    margin: 0 auto;
  }

  .amendCon-title {
    position: relative;
    margin-bottom: 35px;
  }

  .amendCon-title a.back {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    color: #0265c2;
    cursor: pointer;
  }

  .amendCon-line {
    width: calc(100% + 70px);
    height: 4px;
    background: #e43542;
    position: absolute;
    left: -35px;
    top: 130px;
  }

  .amendConOne {
    background: #f9f9f9;
    padding: 10px 15px;
    margin-bottom: 27px;
    position: relative;
    animation: op 0.5s;
  }

  .amendConTwo {
    margin-bottom: 27px;
    position: relative;
    animation: op 0.5s;
  }

  @keyframes op {
    from {
      opacity: 0;
      transform: scale(0.2)
    }
    to {
      opacity: 1;
      transform: scale(1)
    }
  }

  .amendConOne-title {
    margin-bottom: 15px;
  }

  .amendConTwo-title {
    padding: 10px 15px;
    background: #f9f9f9;
  }

  .amendConOne-title .iconfont {
    cursor: pointer;
    color: #3c88cf;
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  .amendConOne-ext {
    margin-top: 15px;
  }

  .amendConOne-ext h3 {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }

  .amendConOne-ext1 {
    display: flex;
    color: #666;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    background: #f9f9f9;
  }

  .amendConOne-ext1 div {
    width: 33.3333333%;
  }

  .amendCon-url {
    color: #0265c2;
    font-size: 14px;
    line-height: 30px;
    padding-left: 15px;
  }

  .amendCon-url span:hover {
    text-decoration: underline;
  }

  .createButton {
    margin-top: 60px;
  }
</style>
