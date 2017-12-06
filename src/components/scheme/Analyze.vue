<template>
  <div class="analyze">
    <div style="margin:0 20px 40px">
      <div style="display: inline-block">
        <span>时间范围：</span>
      </div>
      <RadioGroup v-model="time" type="button" style="display: inline-block">
        <Radio label="今日"></Radio>
        <Radio label="24小时"></Radio>
        <Radio label="2天"></Radio>
        <Radio label="7天"></Radio>
        <Radio :label="optionCustom">
          <input type="text" class="customTime" placeholder="自定义" @focus="customFocus" @blur="custom"
                 v-model="optionCustom">
        </Radio>
      </RadioGroup>
    </div>
    <h1>关系走势图</h1>
    <BrokenLine id="brokenLine"></BrokenLine>
    <h1>关系走势图</h1>
    <pie id="pie"></pie>
    <h1>关系走势图</h1>
    <Annular id="annular"></Annular>
    <h1>关系走势图</h1>
    <columnar id="columnar"></columnar>
  </div>
</template>
<script>
  import BrokenLine from '../echarts/BrokenLine.vue'
  import Pie from '../echarts/Pie.vue'
  import Annular from '../echarts/Annular.vue'
  import Columnar from '../echarts/Columnar.vue'
  export default{
    name: 'Analyze',
    components: {BrokenLine,Pie,Annular,Columnar},
    data(){
      return {
        time: '',
        optionCustom: ''
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
