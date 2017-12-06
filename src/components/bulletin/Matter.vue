<template>
  <div class="matter">
    <div v-show="wait===1">
      <div v-show="listCon.length">
        <div
          style="padding-top:5px;margin-bottom:15px;border-bottom: 1px solid #f0f0f0;height: 50px;padding-left: 10px;position: relative">
          <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">
          </Checkbox>
          <div style="width: calc(100% - 40px);position: absolute;right: 0;top: 0;">
            <Button style="margin-left: 10px" @click="dels">删除选中素材</Button>
            <Button @click="clean">清空素材库</Button>
            <span style="margin-left: 45px">已加入条数：</span>
            <span class="cRed">{{total}}</span>
            <span>条</span>
            <Button type="primary" style="float: right" @click="create">生成简报</Button>
          </div>

        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox :label="v.id" class="matterList" v-for="(v,i) in listCon" :key="v.id">
            <div class="matterList-con">
              <router-link :to="{name:'Texts',params:{data:v,info:textInfo}}"><h1 style="font-size: 16px;color: #333">
                {{v.title}}</h1></router-link>
              <div style="height: 48px;width: 100%;padding: 6px 0">
                <p style="color: #999;font-size: 14px;line-height: 36px;float: left">
                  <span>发布时间：</span>
                  <span>{{v.createDate}}</span>
                  <span style="margin-left: 50px">来源：</span>
                  <span class="cBlue">{{v.mediaName}}</span>
                </p>
                <div class="matterList-con-fun">
                  <Button @click="del(v.id)">删除</Button>
                  <Button @click="updates(v)">编辑</Button>
                  <Button @click="move(i,0)" :disabled="i===0?true:false">上移</Button>
                  <Button @click="move(i,1)" :disabled="i===listCon.length-1?true:false">下移</Button>
                </div>
              </div>
              <p style="color: #999;font-size: 14px;line-height: 36px">
                <span>新闻来源：</span>
                <span>{{v.sourceName}}</span>
              </p>
              <p style="font-size: 14px;color: #666;padding: 16px 20px;background: #f8f8f8">
                <span>摘要：</span>
                <span>{{v.ext && v.ext != " " ? v.ext.slice(0, 80) + "..." : v.content.split("\n").join("").trim().slice(0, 80) + "..."}}</span>
              </p>
            </div>
          </Checkbox>
        </CheckboxGroup>
        <Page :current="1" :total="total" simple class="matter-page" :page-size="10" @on-change="pages"></Page>
        <Row type="flex" justify="center" :gutter="30">
          <i-col span="5">
            <Button type="info" long @click="create">生成简报</Button>
          </i-col>
          <i-col span="5">
            <Button long @click="cancel">返回</Button>
          </i-col>
        </Row>
      </div>
      <div v-show="!listCon.length" style="background: #f8f8f8">
        <div style="float: left">
          <h1>素材库暂无素材</h1>
          <p>
            <span>请去</span>
            ‘
            <router-link :to="{name:'Scheme'}">舆情监测</router-link>
            ’或
            ‘
            <router-link :to="{name:'Search'}">全文搜索</router-link>
            ’
            <span>添加素材把！</span>
          </p>
        </div>
        <img style="float: right;width: 40%;height: auto" src="../../assets/k.png" alt="">
      </div>
    </div>
    <div v-show="wait===0">
      <h1 style="text-align: center;padding-top: 50px">素材载入中</h1>
      <img src="../../assets/loading.gif" alt="" style="display: block;margin: 0 auto;height: 100px">
    </div>
    <h1 v-show="wait===2">网络出错</h1>
    <Modal title="编辑" v-model="modal" className="bulletinList-model">
      <Form :model="con" :label-width="80">
        <Row type="flex" justify="space-between">
          <i-col span="12">
            <FormItem label="标题">
              <Input v-model="con.title" placeholder="Enter something..."></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="类型">
              <Select v-model="con.sensitiveStatus">
                <Option value="1">敏感</Option>
                <Option value="0">非敏感</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="space-between">
          <i-col span="12">
            <FormItem label="时间">
              <DatePicker type="date" disabled  placeholder="Select date" v-model="con.createDate"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="来源">
              <Input v-model="con.mediaName" disabled  placeholder="Enter something..."></Input>
            </FormItem>
          </i-col>
        </Row>
        <!--<FormItem label="摘要">-->
          <!--<Input v-model="con.ext" type="textarea" :autosize="{minRows: 2,maxRows: 5}"-->
                 <!--placeholder="Enter something..."></Input>-->
        <!--</FormItem>-->
        <FormItem label="正文">
          <Input v-model="con.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <Row type="flex" justify="space-around">
          <i-col span="5" push="2">
            <Button type="primary" @click="update" style="width: 120px;height: 32px">修改</Button>
          </i-col>
          <i-col span="5" pull="2">
            <Button type="ghost" style="width: 120px;height: 32px" @click="cancel">取消</Button>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default{
    name: 'Matter',
    data(){
      return {
        modal: false,
        page: '1',
        total: 50,
        indeterminate: true,
        checkAll: false,
        checkAllGroup: [],
        con: {
          title: '',
          ext: '',
          mediaName: '',
          createDate: '',
          spiderName: '',
          content: '',
          sensitiveStatus:"0"
        },
        listCon: [],
        wait: 0
      }
    },
    computed: {
      textInfo: function () {
        let arr = [];
        arr.push({path: this.$route.path, name: '舆情简报'});
        arr.push({path: '', name: "素材展示"});
        return arr
      },
    },
    methods: {
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          let arr = [];
          this.listCon.forEach(v => {
            arr.push(v.id)
          })
          this.checkAllGroup = arr;
        } else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        if (data.length === this.listCon.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      create(){
        let now = new Date();
        let time = now.getHours() + ':' + (now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes());
        let str = now.toLocaleDateString().split('/').join('-') + '  ' + time;
        location.href = '#/bulletin/matter/create'
      },
      cancel(){
        console.log('cancel')
      },
      pages(v){
        let page = v.toString();
        this.page = page
        $.ajax({
          type: "POST",
          url: "http://10.100.82.221:8089/material/news/list",
          contentType: "application/json; charset=utf-8",
          data: page,
          dataType: "json",
          success: (v) => {
            if (v.code === 100) {
              this.listCon = v.obj.list;
              this.total = v.obj.count
              $('html,body').animate({scrollTop: 50}, 500);
            } else {
              this.listCon = this.list;
            }
          }
        })
      },
      updates(v){
        this.con = v;
        this.con.sensitiveStatus=this.con.sensitiveStatus.toString();
        this.modal = true;
      },
      update(){
        let data = JSON.stringify({
          content:this.con.content,
          id: this.con.id,
          sensitiveStatus: parseInt(this.con.sensitiveStatus),
          title: this.con.title
        });
        $.ajax({
          type: "POST",
          url: "http://10.100.82.221:8089/material/update",
          contentType: "application/json; charset=utf-8",
          data: data,
          dataType: "json",
          success: (v) => {
            if (v.code === 100) {
              this.$Notice.success({
                title: '修改成功',
              });
            } else {
              this.$Notice.error({
                title: '修改失败',
              });
            }
            this.modal = false;
          },
          error:()=>{
            this.$Notice.error({
              title: '网络错误，请稍候再试',
            });
        }
        })
      },
      cancel(){
        this.modal = false
      },
//      素材位置移动
      move(index, type){
        let arr = this.listCon;
        let obj = arr.slice(index, index + 1)[0];
        arr.splice(index, 1);
        if (type) {
          arr.splice(index + 1, 0, obj)
        } else {
          arr.splice(index - 1, 0, obj)
        }
        this.listCon = arr
        console.log(this.checkAllGroup)
      },
//      批量删除
      dels(){
        if (this.checkAllGroup.length) {
          $.ajax({
            type: "POST",
            url: "http://10.100.82.221:8089/material/deletemulti",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.checkAllGroup),
            dataType: "json",
            success: (v) => {
              if (v.code === 100) {
                this.$Notice.success({
                  title: '批量删除成功',
                });
                $.ajax({
                  type: "POST",
                  url: "http://10.100.82.221:8089/material/list",
                  contentType: "application/json; charset=utf-8",
                  data: this.page,
                  dataType: "json",
                  success: (v) => {
                    if (v.code === 100) {
                      this.listCon = v.obj.list;
                      this.total = v.obj.count;
                      this.checkAllGroup = []
                    }
                  }
                })
              }
            }
          })
        }else {
            this.$Notice.info({title:'请先选择要删除的素材'})
        }
      },
//      单条删除
      del(id){
        $.ajax({
          type: "POST",
          url: "http://10.100.82.221:8089/material/delete",
          contentType: "application/json; charset=utf-8",
          data: id.toString(),
          dataType: "json",
          success: (v) => {
            if (v.code === 100) {
              this.$Notice.success({
                title: '删除成功',
              });
              $.ajax({
                type: "POST",
                url: "http://10.100.82.221:8089/material/list",
                contentType: "application/json; charset=utf-8",
                data: this.page,
                dataType: "json",
                success: (v) => {
                  if (v.code === 100) {
                    this.listCon = v.obj.list;
                    this.total = v.obj.count
                  }
                }
              })
            }
          }
        })
      },
//      清空素材库
      clean(){
        $.post('http://10.100.82.221:8089/material/clean', (v) => {
          if (v.code === 100) {
            this.listCon = []
          }
        })
      }
    },
    created: function () {
      let page = '1';
      $.ajax({
        type: "POST",
        url: "http://10.100.82.221:8089/material/list",
        contentType: "application/json; charset=utf-8",
        data: page,
        dataType: "json",
        success: (v) => {
          if (v.code === 100) {
            this.wait = 1;
            this.listCon = v.obj.list;
            this.total = v.obj.count
          } else if (v.code === 200) {
            this.wait = 1;
            this.listCon = [];
          }
        },
        error: () => {
          this.wait = 2;
        }
      })
    }
  }
</script>
<style scoped>
  .matterList {
    display: block;
    background: #fcfcfc;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    -webkit-box-shadow: 0 2px 2px 1px #eee;
    box-shadow: 0 2px 2px 1px #eee;
    border: 1px solid #f2f9fd;
  }

  .matterList-con {
    display: inline-grid;
    position: relative;
    padding-left: 10px;
    width: calc(100% - 40px);
  }

  .matterList-con-fun {
    float: right;
    display: none;
  }

  .matterList:hover .matterList-con-fun {
    display: block;
  }

  .matterList:hover {
    background: #f2f9fd;
  }

  .matter-page {
    margin: 30px auto;
    width: 200px;
  }
</style>
