<template>
  <div class="amend">
    <Row>
      <i-col span="5" class="amendLeft">
        <Menu theme="light" :active-name="meanAct" class="amendLeftF" @on-select="meanActF">
          <MenuGroup class="amendLeftOne">
            <div class="amendLeftOne-title">
              <Icon style="color:#ffd500;" type="ios-folder"></Icon>
              <span>舆情简报</span>
              <div class="san"></div>
            </div>
            <MenuItem name="1">
              简报概述
            </MenuItem>
            <MenuItem name="2">
              监测概述
            </MenuItem>
            <MenuItem name="3">
              来源类型分析
            </MenuItem>
            <MenuItem name="4">
              情感分析
            </MenuItem>
          </MenuGroup>
        </Menu>
      </i-col>
      <i-col span="19" class="amendRight">
        <h1>生成简报</h1>
        <div class="amendCon">
          <div class="amendCon-title">
            <Input v-model="list.title" placeholder="简报标题" style="width: 150px" class="amendCon-title1"></Input>
            <span @click="back" class="back">返回</span>
            <p style="text-align: center;margin-top: 20px;font-size: 14px;color:#666;">
              第（<Input v-model="list.num" placeholder="简报标题" style="width: 50px"></Input>）期
            </p>
            <p style="text-align: center;margin-top: 5px;font-size: 14px;color:#666;">
              <span style="margin-right: 10px">{{list.tit}}</span>
              <span>{{list.time}}</span>
            </p>
            <div class="amendCon-line"></div>
          </div>
          <div class="amendConOne">
            <div class="amendConOne-title">
              <Input v-model="list.title1" placeholder="简报概述" style="width: 170px"></Input>
              <i class="iconfont" @click="del(1)">&#xe600;</i>
            </div>
            <Input v-model="list.text1" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"
                   placeholder="Enter something..."></Input>
          </div>
          <div class="amendConOne">
            <div class="amendConOne-title">
              <Input v-model="list.title2" placeholder="简报概述" style="width: 170px"></Input>
              <i class="iconfont" @click="del(1)">&#xe600;</i>
            </div>
            <Input v-model="list.text2" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"
                   placeholder="Enter something..."></Input>
          </div>
          <div class="amendConOne">
            <div class="amendConOne-title">
              <Input v-model="list.title3" placeholder="简报概述" style="width: 170px"></Input>
              <i class="iconfont" @click="del(1)">&#xe600;</i>
            </div>
            <div style="background:#fff;padding: 35px 0;border-radius: 5px">
              <pie id="pieAmend"></pie>
            </div>
          </div>
          <div class="amendConOne">
            <div class="amendConOne-title">
              <Input v-model="list.title4" placeholder="简报概述" style="width: 170px"></Input>
              <i class="iconfont" @click="del(1)">&#xe600;</i>
            </div>
            <div style="background:#fff;padding: 35px 0;border-radius: 5px">
              <Annular id="annularAmend"></Annular>
            </div>
          </div>
          <div class="amendConOne">
            <div class="amendConOne-title">
              <Input v-model="list.title5" placeholder="简报概述" style="width: 170px"></Input>
              <i class="iconfont" @click="del(1)">&#xe600;</i>
            </div>
            <div style="background:#fff;padding: 35px 0;border-radius: 5px">
              <Columnar id="columnarAmend"></Columnar>
            </div>
          </div>
          <div class="amendConTwo">
            <div class="amendConOne-title amendConTwo-title">
              <Input v-model="list.title6" placeholder="简报概述" style="width: 170px"></Input>
              <i class="iconfont" @click="del(1)">&#xe600;</i>
            </div>
            <Table :columns="tableTitle" :data="list.table"></Table>
          </div>
          <div class="amendConTwo">
            <div class="amendConOne-title amendConTwo-title">
              <Input v-model="list.title7" placeholder="简报概述" style="width: 170px"></Input>
              <i class="iconfont" @click="del(1)">&#xe600;</i>
            </div>
            <ul>
              <li class="amendConOne-ext">
                <h2>(1)这是第一条</h2>
                <div style="border: 1px solid #f9f9f9;border-top: 0">
                  <div class="amendConOne-ext1">
                    <div>性质：非敏感</div>
                    <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">文章来源：新浪</div>
                    <div>时间：2017-09-22 20:00</div>
                  </div>
                  <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
                    <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
                    <p style="width: calc(100% - 100px);line-height: 30px">这和很好看的卡卡的</p>
                  </div>
                  <a href="" class="amendCon-url">原文地址：<span>http://www.baidu.com</span></a>
                </div>
              </li>
              <li class="amendConOne-ext">
                <h2>(1)这是第一条</h2>
                <div style="border: 1px solid #f9f9f9;border-top: 0">
                  <div class="amendConOne-ext1">
                    <div>性质：非敏感</div>
                    <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">文章来源：新浪</div>
                    <div>时间：2017-09-22 20:00</div>
                  </div>
                  <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
                    <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
                    <p style="width: calc(100% - 100px);line-height: 30px">这和很好看的卡卡的</p>
                  </div>
                  <a href="" class="amendCon-url">原文地址：<span>http://www.baidu.com</span></a>
                </div>
              </li>
              <li class="amendConOne-ext">
                <h2>(1)这是第一条</h2>
                <div style="border: 1px solid #f9f9f9;border-top: 0">
                  <div class="amendConOne-ext1">
                    <div>性质：非敏感</div>
                    <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">文章来源：新浪</div>
                    <div>时间：2017-09-22 20:00</div>
                  </div>
                  <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
                    <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
                    <p style="width: calc(100% - 100px);line-height: 30px">这和很好看的卡卡的</p>
                  </div>
                  <a href="" class="amendCon-url">原文地址：<span>http://www.baidu.com</span></a>
                </div>
              </li>
            </ul>
          </div>
          <Row type="flex" justify="center" class="code-row-bg" className="createButton">
            <i-col>
              <Button type="primary" style="width: 160px;height: 36px;margin-right: 50px">保存简报</Button>
            </i-col>
            <i-col>
              <Button type="ghost" @click="back" style="width: 160px;height: 36px">返回</Button>
            </i-col>
          </Row>
        </div>

      </i-col>
    </Row>
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
        meanAct: '1',
        tableTitle: [
          {
            type: 'index',
            width: 60,
            align: 'center',
            title: '序列',
          },
          {
            title: '标题',
            key: 'name',
            align: 'center',
            width:450
          },
          {
            title: '日期与来源',
            align: 'center',
            width:150,
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    t: params.row.time,
                    l: params.row.lai,
                    n: 1
                  },
                }),
              ])
            }
          },
          {
            title: '属性',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    s: params.row.shu,
                    n: 2,
                  },
                }),
              ])
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    f: params.row.address,
                    n:3
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
        list: {
          title: '经典简报',
          tit: '网络舆情',
          time: '2017-09-22',
          num: 1,
          text1: '这是内容1',
          text2: '这是内容2',
          title1: '简报简述',
          title2: '监测概述',
          title3: '事件来源分析',
          title4: '情感分析',
          title5: '统计分析',
          title6: '主要舆情',
          title7: '舆情导读',
          table: [
              {
            name: '这是标题1这是标题1这是标题1这是标题1这是标题1',
            time: '2016-10-03 19:22',
            lai: '新浪',
            shu: '非敏感',
            address: '编辑'
          },
            {
              name: '这是标题2 这是标题2',
              time: '2016-10-03 19:22',
              lai: '新浪',
              shu: '敏感',
              address: '编辑'
            },
            {
              name: '这是标题3这是标题3这是标题3这是标题3',
              time: '2016-10-03 19:22',
              lai: '新浪',
              shu: '非敏感',
              address: '编辑'
            },
          ]
        }
      }
    },
    computed: {},
    methods: {
      meanActF(v){
        this.meanAct = v
      },
      back(){
        this.$emit('back')
      },
      del(v){
        console.log(v)
      },
      funF(v){
          console.log(v)
      }
    },
    mounted: function () {

    }

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

  .amendLeftOne li {
    color: #333;
  }

  .amendLeftOne li {
    color: #333;
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #5184b8;
    color: white;
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

  .amendCon-title span.back {
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
  }

  .amendConTwo {
    margin-bottom: 27px;
    position: relative;
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

  .amendConOne-ext h2 {
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
