<template>
  <div class="BulletinList">
    <Form :model="formItem" :label-width="80">
      <Row style="padding-right: 100px;position: relative">
        <i-col span="12">
          <FormItem label="简报标题：">
            <Input v-model="formItem.name" placeholder="请输入标题"></Input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="生成时间：">
            <Row>
              <i-col span="11">
                <DatePicker type="date" placeholder="开始时间" v-model="formItem.dateS"></DatePicker>
              </i-col>
              <i-col span="2" style="text-align: center">~</i-col>
              <i-col span="11">
                <DatePicker type="date" placeholder="结束时间" v-model="formItem.dateE"></DatePicker>
              </i-col>
            </Row>
          </FormItem>
        </i-col>
        <Button type="primary" style="position: absolute;right: 0" @click="search">查询</Button>
      </Row>
    </Form>
    <ul class="bulletinButton">
      <li>
        <i class="iconfont" style="color: #9cd574;margin-right: 6px;font-weight: 500;font-size: 16px">&#xe64b;</i>
        新建
      </li>
      <div style="width: 1px;height: 16px;margin-top: 12px;background: #d9d9d9"></div>
      <li>
        <i class="iconfont" style="color: #03b5f7;margin-right: 6px;font-weight: 500;font-size: 16px">&#xe60e;</i>
        上传
      </li>
      <div style="width: 1px;height: 16px;margin-top: 12px;background: #d9d9d9"></div>
      <li>
        <i class="iconfont" style="color: #fb5151;margin-right: 6px;font-weight: 500;font-size: 16px">&#xe600;</i>
        删除
      </li>
    </ul>
    <div>
      <Table stripe ref="selection" :columns="columns" :data="data" size="large" @on-selection-change="table"></Table>
    </div>
    <Page :current="1" :total="100" simple class="bulletinList-page" @on-change="page"></Page>
  </div>
</template>
<script>
  import Tab from "../com/TableFun.vue";
  import Tit from '../com/TableTitle.vue'
  export default{
    name: 'BulletinList',
    components: {Tab, Tit},
    data(){
      return {
        formItem: {
          name: '',
          dateS: '',
          dateE: '',
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '简报名称',
            render: (h, params) => {
              return h('div', [
                h(Tit, {
                  props: {
                    title: params.row.title,
                    name: params.row.name,
                    sensitive: params.row.sensitive
                  },
                }),
              ])
            }
          },
          {
            title: '生成时间',
            key: 'time'
          },
          {
            title: '操作',
            align: 'center',
            width: 400,
            render: (h, params) => {
              return h('div', [
                h(Tab, {
                  props: {
                    num: 1
                  },
                  on: {
                    click: () => {
                      this.fun4(params)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 2
                  },
                  on: {
                    click: () => {
                      this.fun4(params)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 3
                  },
                  on: {
                    click: () => {
                      this.fun4(params)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 4
                  },
                  on: {
                    click: () => {
                      this.fun4(params)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 5
                  },
                  on: {
                    click: () => {
                      this.fun4(params)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.fun1(params)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'text',
                  },
                  on: {
                    click: () => {
                      this.fun2(params)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'text',
                  },
                  on: {
                    click: () => {
                      this.fun3(params)
                    }
                  }
                }, '发布'),
              ]);
            }
          }
        ],
        data: [
          {
            name: '模版1',
            time: '2016-10-03',
            title: '简报方案1',
            sensitive: true
          },
          {
            name: '模版2',
            time: '2016-10-01',
            title: '简报方案2',
            sensitive: false
          },
          {
            name: '模版3',
            time: '2016-10-02',
            title: '简报方案3',
            sensitive: true
          },
          {
            name: '模版4',
            time: '2016-10-04',
            title: '简报方案4',
            sensitive: false
          }
        ],
      }
    },
    computed: {},
    methods: {
      search: function () {
        console.log(this.formItem)
      },
      fun1(v){
        console.log(v, 'del')
      },
      fun2(v){
        this.$emit('amend',v)
      },
      fun3(v){
        console.log(v, 'sub')
      },
      fun4(v){
        console.log(v, 'tab')
      },
      table(v){
        console.log(v)
      },
      page(v){
        console.log(v)
      },

    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .bulletinButton {
    display: flex;
    width: 100%;
    height: 40px;
    background: #f8f8f8;
    line-height: 40px;
    font-size: 14px;
    color: #333;
    border-right: 2px solid #fff
  }

  .bulletinButton li {
    border: 1px solid #f8f8f8;
    padding: 0 18px;
  }

  .bulletinButton li:hover {
    cursor: pointer;
    background: #fff;
  }

  .bulletinList-page {
    margin: 30px auto;
    width: 200px;
  }


</style>
