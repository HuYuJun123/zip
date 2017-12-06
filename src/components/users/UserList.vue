<template>
  <div class="userList">
    <Form :model="search" :label-width="100">
      <Row type="flex" justify="space-between">
        <i-col span="8">
          <FormItem label="匹配关键字">
            <Input v-model="search.gua" placeholder="请输入要搜索的内容..."></Input>
          </FormItem>
        </i-col>
        <i-col span="8">
          <FormItem label="状态">
            <Select v-model="search.select">
              <Option value="2">全部</Option>
              <Option value="1">正常</Option>
              <Option value="0">禁用</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="8" style="padding-right: 100px">
          <Button type="primary" style="float: right">查询</Button>
        </i-col>
      </Row>
    </Form>
    <ul class="bulletinButton">
      <li @click="loc">
        <i class="iconfont" style="color: #9cd574;margin-right: 6px;font-weight: 500;font-size: 16px">&#xe64b;</i>
        新建
      </li>
      <div style="width: 1px;height: 16px;margin-top: 12px;background: #d9d9d9"></div>
      <li @click="del">
        <i class="iconfont" style="color: #fb5151;margin-right: 6px;font-weight: 500;font-size: 16px">&#xe600;</i>
        批量删除
      </li>
    </ul>
    <Table border :columns="columns7" :data="data6" @on-selection-change="change"></Table>
    <Page :current="pageNow" :total="20" simple style=" margin: 30px auto;width: 200px;" @on-change="page"></Page>
  </div>
</template>
<script>
  export default{
    name: '',
    data(){
      return {
        pageNow: 1,
        act: [],
//        搜索的字段
        search: {
          gua: '',
          select: '2'
        },
//        定义表格的头
        columns7: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'username',
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '联系电话',
            key: 'phone'
          },
          {
            title: '状态',
            key: 'enable'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index, params.row.id)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
//        表格内容
        data6: []
      }
    },
    computed: {},
    methods: {
//        展示用户信息
      show (index) {
        this.$Modal.info({
          title: '用户信息',//弹出框的标题
          content: `姓名：${this.data6[index].name}<br>联系电话：${this.data6[index].phone}<br>邮箱：${this.data6[index].email}<br>微信号：${this.data6[index].wechat}`
        })
      },
      remove (index, id) {
        $.ajax({
          type: "POST",
          url: "http://10.100.82.221:8089/user/delete",
          contentType: "application/json; charset=utf-8",
          data: id.toString(),
          dataType: "json",
          success: (v) => {
            if (v.code === 100) {
              this.data6.splice(index, 1);
              this.$Notice.success({title: '删除成功'})
            }
          }
        })
      },
//      表格选中的id
      change(v){
        this.act = v.map(c => c.id)
      },
      del(){
          if(this.act.length){
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/user/deletemulti",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(this.act),
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  let arr=[];
                  this.data6.forEach(c=>{
                    if(!this.act.includes(c.id)){
                      arr.push(c)
                    }
                  });
                  this.data6=arr;
                  this.$Notice.success({title: '批量删除成功'})
                }
              }
            })
          }else {
            this.$Notice.error({title: '请先添加要删除的用户'})
          }

      },
//      新建用户跳转
      loc(){
        location.href = '#/users'
      },
      page: function (v) {
        this.pageNow = v;
      }
    },
    mounted: function () {
      $.ajax({
        type: "POST",
        url: "http://10.100.82.221:8089/user/list",
        contentType: "application/json; charset=utf-8",
        data: this.pageNow.toString(),
        dataType: "json",
        success: (v) => {
          if (v.code === 100) {
            this.data6 = v.obj
            this.data6.forEach(c => c.enable = c.enable ? '正常' : '禁用')
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

  .bulletinButton li {
    border: 1px solid #f8f8f8;
    padding: 0 18px;
  }

  .bulletinButton li:hover {
    cursor: pointer;
    background: #fff;
  }

</style>
