<template>
  <div class="analyze">
    <div style="margin:0 20px 40px">
      <div style="display: inline-block">
        <span>时间范围：</span>
      </div>
      <RadioGroup v-model="time" type="button" style="display: inline-block">
        <Radio label="今日"></Radio>
        <Radio label="一周"></Radio>
        <Radio label="一月"></Radio>
        <Radio label="一季度"></Radio>
        <Radio label="一年"></Radio>
        <!--<Radio :label="optionCustom">-->
          <!--<input type="text" class="customTime" placeholder="自定义" @focus="customFocus" @blur="custom"-->
                 <!--v-model="optionCustom">-->
        <!--</Radio>-->
      </RadioGroup>
    </div>
    <h1>关系走势图</h1>
    <BrokenLine id="brokenLine" :datas="brokenLine"></BrokenLine>
  </div>
</template>
<script>
  import BrokenLine from '../echarts/BrokenLine.vue'
  export default{
    name: 'Analyze',
    components: {BrokenLine},
    data(){
      return {
        time: '',
        optionCustom: '',
        brokenLine: {
          data: [{
            name: '网站',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          }], xAxis: ['周一', '周二'], list: ['网站']
        }
      }
    },
    computed: {},
    methods: {
      customFocus: function () {
        this.time = this.optionCustom;
      },
      custom: function () {
        this.time = this.optionCustom;
      },
//      测试统计分析图的数组
      getnum:function (num) {
        let arr=[];
        for (let i=0;i<num;i++){
            arr.push(Math.ceil(Math.random()*500))
        }
        return arr
      }
    },
    watch: {
//        测试统计分析图
      time: function () {
        switch (this.time) {
          case '今日':
            this.brokenLine = {
              data: [
                {
                  name: '今日网站',
                  type: 'line',
                  data: this.getnum(5)
                },
                {
                  name: '今日论坛',
                  type: 'line',
                  data: this.getnum(5)
                },
                {
                  name: '今日微信',
                  type: 'line',
                  data: this.getnum(5)
                },
                {
                  name: '今日微博',
                  type: 'line',
                  data:this.getnum(5)
                },
                {
                  name: '今日外媒',
                  type: 'line',
                  data:this.getnum(5)
                }],
              xAxis: ['8:00-12:00', '13:00-15:00', '15:00-17:00', '17:00-20:00', '20:00-22:00',],
            };
            break;
          case '一周':
            this.brokenLine = {
              data: [
                {
                  name: '一周网站',
                  type: 'line',
                  data: this.getnum(7)
                },
                {
                  name: '一周论坛',
                  type: 'line',
                  data:  this.getnum(7)
                },
                {
                  name: '一周微信',
                  type: 'line',
                  data:  this.getnum(7)
                },
                {
                  name: '一周微博',
                  type: 'line',
                  data:  this.getnum(7)
                },
                {
                  name: '一周外媒',
                  type: 'line',
                  data:  this.getnum(7)
                }],
              xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            };
            break;
          case '一月':
            this.brokenLine = {
              data: [
                {
                  name: '一月网站',
                  type: 'line',
                  data:  this.getnum(30)
                },
                {
                  name: '一月论坛',
                  type: 'line',
                  data: this.getnum(30)
                },
                {
                  name: '一月微信',
                  type: 'line',
                  data: this.getnum(30)
                },
                {
                  name: '一月微博',
                  type: 'line',
                  data: this.getnum(30)
                },
                {
                  name: '一月外媒',
                  type: 'line',
                  data:this.getnum(30)
                }],
              xAxis: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
            };
            break;
          case '一季度':
            this.brokenLine = {
              data: [
                {
                  name: '季度网站',
                  type: 'line',
                  data: this.getnum(4)
                },
                {
                  name: '季度论坛',
                  type: 'line',
                  data: this.getnum(4)
                },
                {
                  name: '季度微信',
                  type: 'line',
                  data: this.getnum(4)
                },
                {
                  name: '季度微博',
                  type: 'line',
                  data: this.getnum(4)
                },
                {
                  name: '季度外媒',
                  type: 'line',
                  data: this.getnum(4)
                }],
              xAxis: ['春季', '夏季', '秋季', '冬季'],
            };
            break;
          case '一年':
            this.brokenLine = {
              data: [
                {
                  name: '年网站',
                  type: 'line',
                  data: this.getnum(12)
                },
                {
                  name: '年论坛',
                  type: 'line',
                  data: this.getnum(12)
                },
                {
                  name: '年微信',
                  type: 'line',
                  data: this.getnum(12)
                },
                {
                  name: '年微博',
                  type: 'line',
                  data: this.getnum(12)
                },
                {
                  name: '年外媒',
                  type: 'line',
                  data: this.getnum(12)
                }],
              xAxis: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            };
            break;
        }
      }
    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .analyze {
    font-size: 14px;
    color: #333;
    padding: 40px 30px;
    background: #fff;
  }

  .analyze h1 {
    width: 100%;
    line-height: 37px;
    padding-left: 17px;
    color: #333333;
    font-size: 16px;
    margin-bottom: 24px;
    background: #f8f8f8;
  }

  .customTime {
    width: 100px !important;
    height: 20px !important;
    opacity: 1 !important;
    border: 0;
  }

  .analyze .ivu-radio-group-button .ivu-radio-wrapper {
    border: 0;
  }

  .analyze .ivu-radio-group-button .ivu-radio-wrapper-checked {
    box-shadow: 0 0 0 0 #000;
    color: #fb7e03;
  }

  .analyze .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
    box-shadow: 0 0 0 0 #000;
    color: #fb7e03;
  }

  .analyze .ivu-radio-group-button .ivu-radio-wrapper:hover {
    color: #fb7e03;
  }

  .analyze .ivu-radio-wrapper-checked .customTime {
    color: #fb7e03;
  }
</style>
