<template>
  <div class="create">
    <main style=" background: white;
    margin-top: 25px;
        padding: 20px 40px 50px;;
    border: 1px solid #ededed;">
      <h1>生成简报</h1>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="createForm">
        <FormItem label="简报标题:" prop="header">
          <Input v-model="formValidate.header" placeholder="请输入简报标题" style="width: 70%;height: 34px"></Input>
        </FormItem>
        <FormItem label="简报期数:" prop="number">
          <Input v-model="formValidate.number" placeholder="请输入简报期数" style="width: 30%;height: 34px"></Input>
        </FormItem>
        <FormItem label="简报标头:" prop="name" style="color: #999">
          <Input v-model="formValidate.name" placeholder="请输入简报标头" style="width: 70%;height: 34px"></Input>
        </FormItem>
      </Form>
      <h1>简报模版</h1>
      <div
        style="box-shadow: 0 0 2px 2px #eee;padding: 25px 34px 60px;border-radius: 5px;position: relative;overflow: hidden;">
        <!--<div  class="createMod-san" :style="tag?'border-top-color: #e43542':'border-top-color: green'">-->
        <!--<span v-show="tag">敏感</span>-->
        <!--<span v-show="!tag">非敏感</span>-->
        <!--</div>-->
        <div style=" width: 100%;height: 4px;background: #e43542;position: absolute;left: 0;top: 130px;"></div>
        <h2 style=" font-size: 24px;text-align: center;color: #e53542;line-height: 48px">
          {{formValidate.header ? formValidate.header : '简报标题'}}</h2>
        <p style="text-align: center;line-height: 23px;font-size: 14px;color: #666">
          第（<span>{{formValidate.number ? formValidate.number : 0}}</span>）期</p>
        <p style="text-align: center;margin-bottom: 50px;line-height: 23px;font-size: 14px;color: #666">
          <span>{{formValidate.name ? formValidate.name : '简报标头'}}</span>
          <span style="margin-left: 20px">{{time ? time : '2017-09-22'}}</span>
        </p>
        <h6 style="margin-bottom: 20px;font-size: 16px;color: #333">一、简报描述</h6>
        <p style="font-size: 14px;color: #666;text-indent: 30px">
          简报是传递某方面信息的简短的内部小报。是具有汇报性、交流性和指导性特点的简短、灵活、快捷的书面形式。简报又称“动态”、“简讯”、“要情”、“摘报”、“工作通讯”、“情况反映”、“情况交流”、“内部参考”等。也可以说，简报就是简要的调查报告，简要的情况报告，简要的工作报告，简要的消息报道等。它具有简、精、快、新、实、活和连续性等特点。</p>
      </div>
      <Row type="flex" justify="center" class="code-row-bg" className="createButton">
        <i-col span="6">
          <Button type="primary" @click="creates('formValidate')">生成简报</Button>
        </i-col>
        <i-col span="6">
          <Button type="primary" @click="preview">简报预览</Button>
        </i-col>
        <i-col span="6">
          <router-link :to="{path:'/bulletin/matter'}">
            <Button type="ghost">返回</Button>
          </router-link>
        </i-col>
      </Row>
      <Modal v-model="modal1" width="80" :closable="false">
        <Preview :data="previewData"></Preview>
        <footer>
          <Button @click="modal1=false"
                  style="width:160px;height: 40px;display: block;margin: 35px auto;color: #333;font-size: 16px"
                  type="ghost">
            返回
          </Button>
        </footer>
      </Modal>
    </main>
  </div>

</template>
<script>
  import Preview from './Preview.vue'
  export default{
    name: 'Create',
    components: {Preview},
    data(){
      const validateNames = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('选项不能为空'));
        } else {
          callback();
        }
      };
      const validateNum = (rule, value, callback) => {
          let reg=/^[0-9]*$/;
        if (value === '') {
          callback(new Error('选项不能为空'));
        } else if(!reg.test(value)){
          callback(new Error('该选项请填写数字'));
        }else {
          callback();
        }
      };
      return {
        modal1: false,
        tag: true,
        time: '',
        formValidate: {
          header: '',
          number: '',
          name: '',
        },
        ruleValidate: {
          header: [{validator: validateNames, trigger: 'blur'}],
          number: [{validator: validateNum, trigger: 'blur'}],
          name: [{validator: validateNames, trigger: 'blur'}],
        },
        previewData: {table: '', pie: ''},
      }
    },
    methods: {
      creates(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let data = JSON.stringify(this.formValidate);
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/briefing/generate",
              contentType: "application/json; charset=utf-8",
              data: data,
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  location.href = '#/bulletin';
                  this.$Notice.success({
                    title: '生成简报成功',
                  });
                }
              }
            })
          } else {
            this.$Notice.error({
              title: '请先完善信息',
            });
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      preview(){
        $.ajax({
          type: "POST",
          url: "http://10.100.82.221:8089/briefing/preview",
          contentType: "application/json; charset=utf-8",
          data: this.page,
          dataType: "json",
          success: (v) => {
            if (v.code === 100) {
              this.modal1 = true;
              let data = v.obj;
              let obj = {};
              obj.table = data.material;
              obj.pie = data.sourceChart.map(v =>{return {value: v.count, name: v.name}});
              obj.columnar = data.mediaChart.map(v =>{return {value: v.count, name: v.name}});
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
      create(){
      }
    },
    mounted: function () {
      let now = new Date();
      let time = now.getHours() + ':' + (now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes());
      let str = now.toLocaleDateString().split('/').join('-') + '  ' + time;
      this.time = str
    }

  }
</script>
<style scoped>
  .create {
    background: #f8f8f8;
  }

  .create h1 {
    width: 100%;
    line-height: 37px;
    padding-left: 17px;
    color: #333333;
    font-size: 16px;
    background: #f9f9f9;
    margin-bottom: 37px;
  }

  .createForm {
    padding-bottom: 33px;
  }

  .createMod-san {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border-top: 65px solid;
    border-right: 65px solid transparent;
  }

  .createMod-san span {
    display: block;
    position: absolute;
    transform: rotate(-45deg);
    left: -25px;
    top: -65px;
    width: 90px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    color: white;
  }

  .createButton {
    margin-top: 60px;
  }

  .createButton button {
    width: 160px;
    height: 37px;
    font-size: 16px;
  }
</style>
