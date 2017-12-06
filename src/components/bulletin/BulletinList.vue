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
      <router-link :to="{path:'/bulletin/matter'}">
        <li>
          <i class="iconfont" style="color: #9cd574;margin-right: 6px;font-weight: 500;font-size: 16px">&#xe64b;</i>
          新建
        </li>
      </router-link>
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
    <Modal v-model="modal1" width="80" :closable="false">
      <Preview :data="previewData" ref="preview"></Preview>
      <footer>
        <Button @click="modal1=false"
                style="width:160px;height: 40px;display: block;margin: 35px auto;color: #333;font-size: 16px"
                type="ghost">
          返回
        </Button>
      </footer>
    </Modal>
  </div>
</template>
<script>
  import Tab from "../com/TableFun.vue";
  import Tit from '../com/TableTitle.vue'
  import Preview from './Preview.vue'
  export default{
    name: 'BulletinList',
    components: {Tab, Tit, Preview},
    data(){
      return {
        modal1: false,
        previewData: {},
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
                  on: {
                    click: () => {
                      this.fun5(params.row)
                    }
                  }
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
                      this.fun4(params, 1)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 2
                  },
                  on: {
                    click: () => {
                      this.fun4(params, 2)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 3
                  },
                  on: {
                    click: () => {
                      this.fun4(params, 3)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 4
                  },
                  on: {
                    click: () => {
                      this.fun4(params, 4)
                    }
                  }
                }),
                h(Tab, {
                  props: {
                    num: 5
                  },
                  on: {
                    click: () => {
                      this.fun4(params, 5)
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
        data: [],
        pages: '1'
      }
    },
    computed: {},
    methods: {
      search: function () {
        console.log(this.formItem)
      },
      fun1(v){
        let id = JSON.stringify(v.row.id);
        $.ajax({
          type: "POST",
          url: "http://10.100.82.221:8089/briefing/delete",
          contentType: "application/json; charset=utf-8",
          data: id,
          dataType: "json",
          success: (v) => {
            if (v.code === 100) {
              let index = 0
              this.data.forEach((c, i) => {
                if (c.id == id) {
                  index = i
                }
              });
              this.data.splice(index, 1);
              this.$Notice.success({
                title: '删除成功',
              });
            }
          }
        })
      },
      //修改
      fun2(v){
        let id = v.row.id
        location.href = '#/bulletin/amend?id=' + id
      },
      fun3(v){
        console.log(v, 'sub')
      },
      //列表的操作
      fun4(datas, type){
//        console.log(datas, type);
        switch (type) {
          case 3:
            //生成excel表单
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/briefing/detail",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(datas.row.id),
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  let data = v.obj;
                  let obj = {};
                  obj.guide = data.guide;
                  obj.opioion = data.opioion;
                  obj.mointor = data.mointor;
                  obj.show = data.show;
                  obj.table = data.news;
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
                  obj.excel = datas.row.title
                  this.previewData = obj;
                }
              }
            });
            break;
          case 2:
              //生成pdf
            location.href = '#/pdf?id=' + datas.row.id + '&title=' + datas.row.title;break;
//            $.ajax({
//              type: "POST",
//              url: "http://10.100.82.221:8089/briefing/detail",
//              contentType: "application/json; charset=utf-8",
//              data: JSON.stringify(datas.row.id),
//              dataType: "json",
//              success: (v) => {
//                if (v.code === 100) {
//                  let data = v.obj;
//                  let obj = {};
//                  obj.guide = data.guide;
//                  obj.opioion = data.opioion;
//                  obj.mointor = data.mointor;
//                  obj.show = data.show;
//                  obj.table = data.news;
//                  obj.pie = data.sourceChart.map(v => {
//                    return {value: v.count, name: v.name}
//                  });
//                  obj.columnar = data.mediaChart.map(v => {
//                    return {value: v.count, name: v.name}
//                  });
//                  obj.annular = data.sensitiveChart.map(v => {
//                    if (v.name === '1') {
//                      return {value: v.count, name: '敏感'}
//                    } else {
//                      return {value: v.count, name: '非敏感'}
//                    }
//                  }).reverse();
//                  obj.pdf=datas.row.title
//                  this.previewData = obj;
//                }
//              }
//            });
          case 1:
              //生成word
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/briefing/detail",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(datas.row.id),
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  let data = v.obj;
                  let obj = {};
                  obj.guide = data.guide;
                  obj.opioion = data.opioion;
                  obj.mointor = data.mointor;
                  obj.show = data.show;
                  obj.table = data.news;
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
                  obj.word = datas.row.title
                  this.previewData = obj;
                }
              }
            });
            break;
        }
      },
      //点击标题预览
      fun5(data){
        let id = JSON.stringify(data.id);
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
              obj.guide = data.guide;
              obj.opioion = data.opioion;
              obj.mointor = data.mointor;
              obj.show = data.showPosition.split(',');
              obj.table = data.news;
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
              this.previewData = obj;
            }
          }
        })
      },
      table(v){
        console.log(v)
      },
      page(v){
        this.pages = v.toString()
      },
    },
    mounted: function () {
      $.ajax({
        type: "POST",
        url: "http://10.100.82.221:8089/briefing/list",
        contentType: "application/json; charset=utf-8",
        data: this.pages,
        dataType: "json",
        success: (v) => {
          if (v.code === 100) {
            let arr = []
            v.obj.forEach(c => {
              let now = new Date(c.createTime);
              let time = now.toLocaleDateString().split('/').join('-') + '  ' + now.getHours() + ':' + (now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes());
              arr.push({name: c.templet, time: time, id: c.id, title: c.header, sensitive: false})
            })
            this.data = arr
          }
        }
      })
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

  .bulletinButton > a {
    line-height: 40px;
    font-size: 14px;
    color: #333;
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
