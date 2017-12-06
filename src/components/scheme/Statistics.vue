<template>
  <div class="statistics">
    <Form :model="list" :label-width="80">
      <FormItem label="预警开关：">
        <i-switch v-model="list.switch" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <h1>预警条件设置</h1>
      <FormItem label="相似文章：">
        <RadioGroup v-model="list.he">
          <Radio label="0">合并</Radio>
          <Radio label="1">不合并</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="预警来源：">
        <Checkbox
          :indeterminate="indeterminate1"
          :value="checkAll1"
          @click.prevent.native="all1">全部
        </Checkbox>
        <CheckboxGroup v-model="list.group1" @on-change="change1" style="display: inline-block">
          <Checkbox label="1">微博</Checkbox>
          <Checkbox label="2">网站</Checkbox>
          <Checkbox label="3">论坛</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="相似文章：">
        <RadioGroup v-model="list.he">
          <Radio label="0">合并</Radio>
          <Radio label="1">不合并</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="预警来源：">
        <Checkbox
          :indeterminate="indeterminate1"
          :value="checkAll1"
          @click.prevent.native="all1">全部
        </Checkbox>
        <CheckboxGroup v-model="list.group1" @on-change="change1" style="display: inline-block">
          <Checkbox label="1">微博</Checkbox>
          <Checkbox label="2">网站</Checkbox>
          <Checkbox label="3">论坛</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <h1>预警方式设置</h1>
      <FormItem label="预警方式：">
        <CheckboxGroup v-model="list.fs" class="statistics-fs">
          <Checkbox label="1" style="position: relative">
            <Icon type="ios-browsers-outline"></Icon>
            <div class="dui"><span>✔</span></div>
          </Checkbox>
          <Checkbox label="2"  style="position: relative">
            <Icon type="ios-email-outline"></Icon>
            <div class="dui"><span>✔</span></div>
          </Checkbox>
          <Checkbox label="3" style="position: relative">
            <Icon type="iphone"></Icon>
            <div class="dui"><span>✔</span></div>
          </Checkbox>
          <Checkbox label="4" style="position: relative">
            <Icon type="ios-book-outline"></Icon>
            <div class="dui"><span>✔</span></div>
          </Checkbox>
          <Checkbox label="5" style="position: relative">
            <Icon type="ios-chatbubble-outline"></Icon>
            <div class="dui"><span>✔</span></div>
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
      <h1>预警时间设置</h1>
      <FormItem label="接收时间">
        <Row type="flex" justify="start">
          <i-col>
          <FormItem prop="date">
            <TimePicker type="time" placeholder="Select time" v-model="list.timeS"></TimePicker>
          </FormItem>
          </i-col>
          <i-col span="2" style="text-align: center">~</i-col>
          <i-col >
          <FormItem prop="time">
            <TimePicker type="time" placeholder="Select time" v-model="list.timeE"></TimePicker>
          </FormItem>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="预警间隔：">
        <RadioGroup v-model="list.jgc">
          <Radio label="0">实时预警</Radio>
          <Radio label="1">定时预警</Radio>
        </RadioGroup>
        <Slider v-model="list.jg" style="width:80%;margin-top: 55px" :max="60" show-input></Slider>
        <ul style="width: calc(80% - 100px);height: 20px;display: flex;justify-content: space-between;font-size: 16px;color: #c5c5c5">
          <li>0</li>
          <li>10</li>
          <li>20</li>
          <li>30</li>
          <li>40</li>
          <li>50</li>
          <li>60</li>
        </ul>
      </FormItem>
      <FormItem label="预警间隔：">
        <RadioGroup v-model="list.zm">
          <Radio label="0">周末预警</Radio>
          <Radio label="1">周末不预警</Radio>
        </RadioGroup>
      </FormItem>
      <h1>预警词</h1>
      <FormItem label="">
      <Input v-model="list.ci" placeholder="支持三组词，每组用空格隔开" style="width: 80%"></Input>
      </FormItem>
    </Form>
    <div style="display: flex;justify-content: center;margin-top: 80px">
      <Button style="width: 160px;height: 37px;margin-right: 37px">存草稿</Button>
      <Button style="width: 160px;height: 37px" type="info" @click="sub">保存</Button>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Statistics',
    data(){
      return {
        indeterminate1: true,
        checkAll1: false,
        list: {
          switch: true,
          he: '1',
          group1: [],
          fs: [],
          timeE:'',
          timeS:'',
          jgc:'1',
          zm:'0',
          jg:25,
          ci:''
        }

      }
    },
    computed: {},
    methods: {
      all1 () {
        if (this.indeterminate1) {
          this.checkAll1 = false;
        } else {
          this.checkAll1 = !this.checkAll1;
        }
        this.indeterminate1 = false;

        if (this.checkAll1) {
          this.list.group1 = ['1', '2', '3'];
        } else {
          this.list.group1 = [];
        }
      },
      change1 (data) {
        if (data.length === 3) {
          this.indeterminate1 = false;
          this.checkAll1 = true;
        } else if (data.length > 0) {
          this.indeterminate1 = true;
          this.checkAll1 = false;
        } else {
          this.indeterminate1 = false;
          this.checkAll1 = false;
        }
      },
      sub(){
          console.log(this.list)
      }
    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .statistics {
    font-size: 14px;
    color: #333;
    padding: 40px 30px;
    background: #fff;
  }

  .statistics h1 {
    width: 100%;
    line-height: 37px;
    padding-left: 17px;
    color: #333333;
    font-size: 16px;
    margin-bottom: 24px;
    background: #f8f8f8;
  }

  .statistics-fs .dui {
    width: 0;
    height: 0;
    border-bottom: 21px solid #2d8cf0;
    border-left: 21px solid transparent;
    position: absolute;
    right: 1px;
    bottom: 1px;
    display: none;
  }
  .statistics-fs .dui span{
    width: 21px;
    height: 21px;
    display: block;
    position: absolute;
    line-height: 21px;
    text-align: center;
    font-size: 12px;
    right: -4px;
    top:4px;
    color: white;
  }
</style>
