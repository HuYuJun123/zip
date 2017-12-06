<template>
  <ul class="option">
    <!--<li v-show="toggle" class="optionOne">-->
      <!--<div class="optionOne-title">-->
        <!--<span>时间范围：</span>-->
      <!--</div>-->
      <!--<RadioGroup v-model="options.time" type="button">-->
        <!--<Radio label="今日"></Radio>-->
        <!--<Radio label="24小时"></Radio>-->
        <!--<Radio label="2天"></Radio>-->
        <!--<Radio label="7天"></Radio>-->
        <!--<Radio label="1个月"></Radio>-->
      <!--</RadioGroup>-->
    <!--</li>-->
    <!--<li v-show="toggle" class="optionOne">-->
      <!--<div class="optionOne-title">-->
        <!--<Tooltip placement="bottom-start" class="optionOne-what">-->
          <!--<Icon type="ios-help"></Icon>-->
          <!--<div slot="content" class="optionOne-what-text">-->
            <!--<p>显示多行信息</p>-->
            <!--<p><i>可以自定义样式</i></p>-->
          <!--</div>-->
        <!--</Tooltip>-->
        <!--<span>文章排序：</span>-->
      <!--</div>-->
      <!--<RadioGroup v-model="options.sen" type="button">-->
        <!--<Radio label="相似度"></Radio>-->
        <!--<Radio label="时间降序"></Radio>-->
        <!--<Radio label="时间升序"></Radio>-->
        <!--<Radio label="相似文章"></Radio>-->
        <!--<Radio label="采集顺序"></Radio>-->
      <!--</RadioGroup>-->
    <!--</li>-->
    <!--<li v-show="toggle" class="optionOne">-->
      <!--<div class="optionOne-title">-->
        <!--<Tooltip placement="bottom-start" class="optionOne-what">-->
          <!--<Icon type="ios-help"></Icon>-->
          <!--<div slot="content" class="optionOne-what-text">-->
            <!--<p>显示多行信息</p>-->
            <!--<p><i>可以自定义样式</i></p>-->
          <!--</div>-->
        <!--</Tooltip>-->
        <!--<span>转发微博：</span>-->
      <!--</div>-->
      <!--<RadioGroup v-model="options.show" type="button">-->
        <!--<Radio label="显示"></Radio>-->
        <!--<Radio label="不显示"></Radio>-->
      <!--</RadioGroup>-->
    <!--</li>-->
    <!--<li v-show="toggle" class="optionOne">-->
      <!--<div class="optionOne-title">-->
        <!--<Tooltip placement="bottom-start" class="optionOne-what">-->
          <!--<Icon type="ios-help"></Icon>-->
          <!--<div slot="content" class="optionOne-what-text">-->
            <!--<p>显示多行信息</p>-->
            <!--<p><i>可以自定义样式</i></p>-->
          <!--</div>-->
        <!--</Tooltip>-->
        <!--<span>相似文章：</span>-->
      <!--</div>-->
      <!--<RadioGroup v-model="options.he" type="button">-->
        <!--<Radio label="合并"></Radio>-->
        <!--<Radio label="不合并"></Radio>-->
      <!--</RadioGroup>-->
    <!--</li>-->
    <li v-show="toggle" class="optionOne">
      <div class="optionOne-title">
        <span>来源类型(多选):</span>
      </div>
      <CheckboxGroup v-model="options.sourceType" @on-change='optionsChange' class="checkLabel">
        <Checkbox :label="v" v-for="(v,i) in filter" :key="i"></Checkbox>
      </CheckboxGroup>
    </li>
    <Row v-show="toggle" class="optionOne-button" type="flex" justify="center" :gutter="30">
      <i-col span="5">
        <Button type="info" long @click="search">查询</Button>
      </i-col>
      <i-col span="5">
        <Button long @click="preserve">保存</Button>
      </i-col>
    </Row>
    <div class="optionUp" @click="toggleFun">
      <span>基础筛选</span>
      <Icon type="ios-arrow-up" v-show="toggle"></Icon>
      <Icon type="ios-arrow-down" v-show="!toggle"></Icon>
    </div>
    <li v-show="!toggle" style="cursor: pointer" @click="toggleFun">展开查看更多选项</li>
  </ul>
</template>
<script>
  export default{
    name: '',
    props: ['list', 'filter'],
    data(){
      return {
        options: {time: '', sen: '', show: '', he: '', sourceType: []},
        toggle: true,
        indeterminate: true,
        checkAll: false,
      }
    },
    computed: {
    },
    methods: {
      toggleFun: function () {
        this.toggle = !this.toggle;
      },
      preserve: function () {
        this.$emit('preserve', this.options)
      },
      search: function () {
        this.$emit('search', this.options)
      },
//      判定是否全选
      optionsChange: function (v) {
        if (v[v.length - 1] === '全部') {
          this.options.sourceType = ['全部']
        } else if (v[0] === '全部') {
          this.options.sourceType.shift()
        }
      }

    },
    mounted: function () {
    },
    watch: {
      list(){
        this.options = this.list;
      },
    }

  }
</script>
<style scoped>
  .option {
    width: 100%;
    line-height: 30px;
    font-size: 14px;
    color: #444;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    position: relative;
  }

  .optionOne {
    padding-left: 120px;
    position: relative;
  }

  .optionOne-title {
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 15px;
  }

  .optionOne-title > div {
    position: absolute;
    left: 0;
    top: 0;
  }

  .optionOne-title-what {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 30px;
  }

  .optionOne-what-text {
    width: 100px;
  }

  .optionOne-button {
    padding: 10px 0;
  }

  .optionOne-button button {
    width: 160px;
    height: 36px;
  }

  .optionUp {
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
  }

  .option .ivu-radio-group-button .ivu-radio-wrapper:first-child {
    border-left: 0;
  }

  .option .ivu-radio-group-button .ivu-radio-wrapper {
    border: 0;
  }

  .option .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #fb7e03;
    box-shadow: 0 0 0 0 #000;
  }

  .option .ivu-radio-group-button .ivu-radio-wrapper:hover {
    color: #fb7e03;
  }

  .checkLabel {
    padding-left: 16px;
  }

  .checkLabel .ivu-checkbox-wrapper-checked {
    color: #fb7e03 !important;
  }

  .checkLabel label:hover {
    color: #fb7e03 !important;
  }

</style>
