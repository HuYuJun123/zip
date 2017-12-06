<template>
  <div class="create">
    <h1>生成简报</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="createForm">
      <FormItem label="简报标题:" prop="name">
        <Input v-model="formValidate.title" placeholder="请输入简报标题" style="width: 70%;height: 34px"></Input>
      </FormItem>
      <FormItem label="简报期数:" prop="name">
        <Input v-model="formValidate.num" placeholder="请输入简报期数" style="width: 30%;height: 34px"></Input>
      </FormItem>
      <FormItem label="简报标头:" prop="name" style="color: #999">
        <Input v-model="formValidate.hea" placeholder="请输入简报标头" style="width: 70%;height: 34px"></Input>
      </FormItem>
      <FormItem label="选择模版:" prop="mod">
        <Select v-model="formValidate.mod" placeholder="请选择简报模版" style="width: 50%;height: 34px">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
    </Form>
    <h1>简报模版</h1>
    <div class="createMod">
      <div class="createMod-san" :style="tag?'border-top-color: #e43542':'border-top-color: green'">
        <span v-show="tag">敏感</span>
        <span v-show="!tag">非敏感</span>
      </div>
      <h2 style=" font-size: 24px;text-align: center;color: #e53542;line-height: 48px">
        {{formValidate.title ? formValidate.title : '简报标题'}}</h2>
      <p style="text-align: center;line-height: 23px;font-size: 14px;color: #666">
        第（<span>{{formValidate.num ? formValidate.num : 0}}</span>）期</p>
      <p style="text-align: center;margin-bottom: 50px;line-height: 23px;font-size: 14px;color: #666">
        <span>{{formValidate.hea ? formValidate.hea : '简报标头'}}</span>
        <span
          style="margin-left: 20px">{{data.time ? data.time : '2017-09-22'}}</span>
      </p>
      <div class="createMod-line"></div>
      <h6 style="margin-bottom: 20px;font-size: 16px;color: #333">一、简报描述</h6>
      <p style="font-size: 14px;color: #666;text-indent: 30px">
        简报是传递某方面信息的简短的内部小报。是具有汇报性、交流性和指导性特点的简短、灵活、快捷的书面形式。简报又称“动态”、“简讯”、“要情”、“摘报”、“工作通讯”、“情况反映”、“情况交流”、“内部参考”等。也可以说，简报就是简要的调查报告，简要的情况报告，简要的工作报告，简要的消息报道等。它具有简、精、快、新、实、活和连续性等特点。</p>
    </div>
    <Row type="flex" justify="center" class="code-row-bg" className="createButton">
      <i-col span="6">
        <Button type="primary">生成简报</Button>
      </i-col>
      <i-col span="6">
        <Button type="primary" @click="preview">简报预览</Button>
      </i-col>
      <i-col span="6">
        <Button type="ghost" @click="back">返回</Button>
      </i-col>
    </Row>
  </div>

</template>
<script>
  export default{
    name: 'Create',
    props: ['data'],
    data(){
      return {
        tag: true,
        formValidate: {
          title: '',
          num: '',
          mod: '',
          hea: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '选项不能为空', trigger: 'blur'}
          ],
          mod: [
            {required: true, message: '请选择一个简报模版', trigger: 'change'}
          ],
        }
      }
    },
    computed: {},
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      back(){
          this.$emit('back')
      },
      preview(){
          this.$emit('preview')
      }
    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .create{
    background: white;
    margin-top: 25px;
    padding: 0 20px 50px;
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

  .createMod {
    box-shadow: 0 0 2px 2px #eee;
    padding: 25px 34px 60px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
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

  .createMod-line {
    width: 100%;
    height: 4px;
    background: #e43542;
    position: absolute;
    left: 0;
    top: 130px;
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
