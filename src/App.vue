<template>
  <div id="app">
    <headers v-show="url!=='/'&url!=='/pdf'"></headers>
    <BackTop :height="300" :bottom="200">
      <div class="top">
        <Icon type="ios-arrow-up"></Icon>
      </div>
    </BackTop>
    <router-view/>
  </div>
</template>

<script>
  import Headers from './components/com/Header.vue'
  export default {
    name: 'app',
    components: {Headers},
    data(){
      return {
        url: this.$route.path
      }
    },
    methods: {},
    mounted: function () {
    },
    watch: {
      $route: function () {
        this.url = this.$route.path
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  body, html, #app {
    width: 100%;
    height: 100%;
    background: #f8f8f8;
  }

  #app > div {
    padding-top: 70px;
  }

  main {
    max-width: 1206px;
    margin: 0 auto;
    height: 100%;
    padding: 0 20px;
  }

  .top {
    position: fixed;
    right: 20px;
    bottom: 100px;
    width: 40px;
    height: 40px;
    background: #eee;
    border: 1px solid #e9e7e4;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    transition: all 0.5s;
  }

  .ivu-back-top i {
    color: #999;
  }

  .top:hover {
    cursor: pointer;
    background: #2db7f5;
  }

  .top:hover i {
    color: white;
  }

  .checkLabel .ivu-checkbox {
    display: none !important;
  }

  .listForm-labelSel .ivu-checkbox + span, .listForm-labelSel .ivu-checkbox-wrapper + span {
    display: none;
  }

  .editScheme label + .ivu-form-item-content, .addScheme label + .ivu-form-item-content {
    margin-left: 150px !important;
  }

  .what-yes .ivu-form-item-label {
    padding-left: 15px !important;
  }

  .editScheme .ivu-form .ivu-form-item-label, .addScheme .ivu-form .ivu-form-item-label {
    color: #333;
    font-size: 14px;
  }

  .editScheme textarea.ivu-input, .addScheme textarea.ivu-input {
    min-height: 100px !important;
  }

  .ivu-radio-group {
    color: #999;
  }

  .cBlue {
    color: #026fcc;
  }

  .cRed {
    color: #fb1d1d;
  }

  .mLeft {
    margin-left: 15px;
  }

  .ivu-page-simple .ivu-page-simple-pager input {
    width: 31px;
  }

  .ivu-icon-ios-help {
    color: #0370f7;
  }

  .schemeDetails-classify-input .ivu-input {
    height: 37px;
  }

  .ivu-menu-item-group-title {
    height: 0 !important;
  }

  .ivu-modal-header {
    border-bottom: 0;
  }

  .ivu-modal-footer {
    display: none;
  }

  .create .ivu-form .ivu-form-item-label {
    color: #999;
    font-size: 14px;
  }

  .BulletinList .ivu-table:after {
    width: 0;
  }

  .BulletinList .ivu-table-wrapper {
    border: 0;
  }

  .BulletinList .ivu-table th {
    background: #ddeefc;
  }

  .BulletinList .ivu-table td, .ivu-table th {
    border-bottom: 0;
  }

  .statistics .ivu-radio, .statistics .ivu-checkbox {
    display: none;
  }

  .statistics .ivu-radio-wrapper, .statistics .ivu-checkbox-wrapper {
    padding: 0 12px;
    background: #eee;
    color: #8e8e8e;
    height: 26px;
    font-size: 14px;
    line-height: 26px;
    border-radius: 2px;
  }

  .statistics .ivu-radio-wrapper-checked, .statistics .ivu-checkbox-wrapper-checked {
    background: #d4e9ff;
    color: #2d8cf0;
  }

  .statistics .statistics-fs .ivu-checkbox-wrapper {
    width: 100px;
    height: 70px;
    padding: 0;
    background: #fff;
    border: 1px solid #e7e7e7;
    font-size: 24px;
    line-height: 70px;
    text-align: center;
  }

  .statistics .statistics-fs .ivu-checkbox-wrapper-checked {
    border-color: #2d8cf0 !important;
  }

  .statistics .statistics-fs .ivu-checkbox-wrapper-checked .dui {
    display: block !important;
  }

  .amend .amendCon-title .ivu-input-wrapper .ivu-input {
    text-align: center;
    height: 35px;
    font-size: 14px;
    color: #666;
    line-height: 35px;
  }

  .amend .amendConOne-title .ivu-input-wrapper .ivu-input {
    font-size: 16px;
    color: #333;
  }

  .amend .amendConOne textarea.ivu-input {
    font-size: 12px;
    color: #666;
    text-indent: 25px;
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 10px;
    border-radius: 3px;
    margin-top: 10px;
  }
</style>
