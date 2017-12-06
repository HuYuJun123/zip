<template>
  <div class="matter">
    <div
      style="padding-top:5px;margin-bottom:15px;border-bottom: 1px solid #f0f0f0;height: 50px;padding-left: 10px;position: relative">
      <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">
      </Checkbox>
      <div style="width: calc(100% - 40px);position: absolute;right: 0;top: 0;">
        <Button style="margin-left: 10px" @click="del(1)">删除选中素材</Button>
        <Button>清空素材库</Button>
        <span style="margin-left: 45px">已加入条数：</span>
        <span class="cRed">546</span>
        <span>条</span>
        <Button type="primary" style="float: right" @click="create">生成简报</Button>
      </div>

    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Checkbox :label="v.id" class="matterList" v-for="(v,i) in listCon" :key="i">
        <div class="matterList-con">
          <h1 style="font-size: 16px;color: #333">{{v.title}}</h1>
          <div style="height: 48px;width: 100%;padding: 6px 0">
            <p style="color: #999;font-size: 14px;line-height: 36px;float: left">
              <span>发布时间：</span>
              <span>{{v.create_date}}</span>
              <span style="margin-left: 50px">来源：</span>
              <span class="cBlue">{{v.media_name}}</span>
            </p>
            <div class="matterList-con-fun">
              <Button @click="del(0,v.id)">删除</Button>
              <Button @click="updates">编辑</Button>
              <Button @click="move(i,0)" :disabled="i===0?true:false">上移</Button>
              <Button @click="move(i,1)" :disabled="i===listCon.length-1?true:false">下移</Button>
            </div>
          </div>
          <p style="font-size: 14px;color: #666;padding: 16px 20px;background: #f8f8f8">
            <span>摘要：</span>
            <span>{{v.ext && v.ext != " " ? v.ext.slice(0, 80) + "..." : v.content.split("\n").join("").trim().slice(0, 80) + "..."}}</span>
          </p>
        </div>
      </Checkbox>
    </CheckboxGroup>
    <Page :current="1" :total="100" simple class="matter-page" @on-change="page"></Page>
    <Row type="flex" justify="center" :gutter="30">
      <i-col span="5">
        <Button type="info" long @click="create">生成简报</Button>
      </i-col>
      <i-col span="5">
        <Button long @click="cancel">返回</Button>
      </i-col>
    </Row>
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
              <Select v-model="con.media_name">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="space-between">
          <i-col span="12">
            <FormItem label="时间">
              <DatePicker type="date" placeholder="Select date" v-model="con.create_date"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="来源">
              <Input v-model="con.spider_name" placeholder="Enter something..."></Input>
            </FormItem>
          </i-col>
        </Row>

        <FormItem label="摘要">
          <Input v-model="con.ext" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="Enter something..."></Input>
        </FormItem>
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
    props: ['list'],
    data(){
      return {
        modal: false,
        indeterminate: true,
        checkAll: false,
        checkAllGroup: [],
        con: {
          title: '',
          ext: '',
          media_name: '',
          create_date: '',
          spider_name: '',
          content: ''
        },
        listCon: []
      }
    },
    computed: {},
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
          this.listCon.forEach(v=>{
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
        this.$emit('create', str)
      },
      cancel(){
        console.log('cancel')
      },
      page(v){
        console.log(v)
      },
      updates(){
        this.modal = true
      },
      update(){
        this.modal = false
      },
      cancel(){
        this.modal = false
      },
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
        console.log(this. checkAllGroup)
      },
      del(type, id){
        if (type) {
          this.checkAllGroup.forEach(v=>{
            let index=null;
            this.listCon.forEach((c,i)=>{
              if(c.id===v){
                index=i
              }
            })
            this.listCon.splice(index,1)
          })
          this.checkAllGroup=[]
        } else {
            let index=null;
            this.listCon.forEach((c,i)=>{
                if(c.id===id){
                    index=i
                }
            })
          this.listCon.splice(index,1)
        }
      }
    },
    mounted: function () {
      this.listCon = this.list
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
