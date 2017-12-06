<template>
  <div class="userAdd">
    <h1>添加用户</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="用户账号" prop="username">
        <Input v-model="formValidate.username" placeholder="请输入你的账号" style="width: 50%"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="formValidate.password" style="width: 30%"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="passwordCheck">
        <Input type="password" v-model="formValidate.passwordCheck" style="width: 30%"></Input>
      </FormItem>
      <FormItem label="开启绿色通道" prop="green">
        <RadioGroup v-model="formValidate.green">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="姓名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入你的名字" style="width: 40%"></Input>
      </FormItem>
      <FormItem label="联系邮箱" prop="email">
        <AutoComplete
          v-model="formValidate.email"
          @on-search="handleSearch2"
          placeholder="input here"
          style="width:60%">
          <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
        </AutoComplete>
      </FormItem>
      <FormItem label="联系手机" prop="phone">
        <Input v-model="formValidate.phone" placeholder="请输入你的手机号" style="width: 60%"></Input>
      </FormItem>
      <FormItem label="微信号" prop="wechat">
        <Input v-model="formValidate.wechat" placeholder="请输入你的微信号" style="width: 60%"></Input>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')" style="width: 160px;height: 36px">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="width: 160px;height: 36px;margin-left: 100px">
          取消
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default{
    name: 'UserAdd',
    data () {
//        表单验证规则
      const validateusername = (rule, value, callback) => {
        let reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,15}$/;
        if (value === '') {
          callback(new Error('请输入你的用户名'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入以字母开头，字母与数字组合6位-16位的英文字母组合的用户名!'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]{8,18}$/;
        if (value === '') {
          callback(new Error('请输入你的密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入8-18位的数字,字母组合!'));
        } else {
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formValidate.password) {
          callback(new Error('两次密码不一致!'));
        } else {
          callback();
        }
      };
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入你的姓名'));
        } else {
          callback();
        }
      };
      const validateMail = (rule, value, callback) => {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (value === '') {
          callback(new Error('请输入你的邮箱'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱格式!'));
        } else {
          callback();
        }
      };
      const validatePhone = (rule, value, callback) => {
        let reg = /^((13[0-9])|(17[0-9])|(14[5|7])|(15([0-9]))|(18[0-9]))\d{8}$/;
        if (value === '') {
          callback(new Error('请输入你的手机号'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号!'));
        } else {
          callback();
        }
      };
      const validatewechat = (rule, value, callback) => {
        //微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
        let reg = /^[a-zA-Z0-9]([-_a-zA-Z0-9]{5,19})+$/;
        if (value === '') {
          callback(new Error('请输入你的微信号'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的微信号!'));
        } else {
          callback();
        }
      };
      return {
        data2: [],
//        表单数据绑定
        formValidate: {
          username: 'hyj123',
          password: '11111111',
          passwordCheck: '11111111',
          name: '测试',
          email: '18334784263@163.com',
          phone: '13212345678',
          wechat: '13212345678',
          green: '1',
          remark: '加油 奋斗'
        },
//        将表单数据指向对应的表单验证
        ruleValidate: {
          username: [{validator: validateusername, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          passwordCheck: [{validator: validatePassCheck, trigger: 'blur'}],
          name: [{validator: validateName, trigger: 'blur'}],
          email: [{validator: validateMail, trigger: 'change'}],
          phone: [{validator: validatePhone, trigger: 'blur'}],
          wechat: [{validator: validatewechat, trigger: 'blur'}],
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {    //判断表单是否通过验证
          if (valid) {
              let data=JSON.stringify(this.formValidate)
            $.ajax({
              type: "POST",
              url: "http://10.100.82.221:8089/user/add",
              contentType: "application/json; charset=utf-8",
              data: data,
              dataType: "json",
              success: (v) => {
                if (v.code === 100) {
                  this.$Notice.success({
                    title: '用户添加成功',
                  });
                }
              }
            })
          } else {
            this.$Notice.error({title:'请完善信息'});
          }
        })
      },
//      将表单数据还原
      handleReset (name) {
        this.$refs[name].resetFields();
    },
//        邮箱自动补全
      handleSearch2 (value) {
        this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
          value + '@qq.com',
          value + '@sina.com',
          value + '@163.com',
          value + '@samsundot.com',
        ];
      }
    },
    computed: {},
    mounted: function () {

    }

  }
</script>
<style scoped>
  .userAdd h1 {
    width: 100%;
    line-height: 37px;
    padding-left: 17px;
    i-color: #333333;
    font-size: 16px;
    background: #f9f9f9;
    margin-bottom: 37px;
  }
</style>
