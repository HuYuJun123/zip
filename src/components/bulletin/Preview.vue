<template>
    <ul class="preview">
        <li>
          <h1>一、本期导读</h1>
          <p>舆情是“舆论情况”的简称，是指在一定的社会空间内，围绕中介性社会事件的发生、发展和变化，作为主体的民众对作为客体的社会管理者、企业、个人及其他各类组织及其政治、社会、道德等方面的取向产生和持有的社会态度。它是较多群众关于社会中各种现象、问题所表达的信念、态度、意见和情绪等等表现的总和。</p>
        </li>
      <li>
        <h1>二、处置建议</h1>
        <p>舆情是“舆论情况”的简称，是指在一定的社会空间内，围绕中介性社会事件的发生、发展和变化，作为主体的民众对作为客体的社会管理者、企业、个人及其他各类组织及其政治、社会、道德等方面的取向产生和持有的社会态度。</p>
      </li>
      <li>
        <h1>三、监测总览</h1>
        <h2>（一）监测概述</h2>
        <p style="margin: 20px 0">舆情是“舆论情况”的简称，是指在一定的社会空间内，围绕中介性社会事件的发生、发展和变化，作为主体的民众对作为客体的社会管理者、企</p>
        <h2>（二）信息来源统计</h2>
        <Annular id="annularView"></Annular>
        <h2>（三）信息情感分布</h2>
        <Columnar id="ColumnarView"></Columnar>
        <h2>（四）媒体来源明细</h2>
        <Pie id="PieView"></Pie>
      </li>
      <li>
        <h1>四、主要舆情</h1>
        <Table :columns="tableTitle" :data="table"></Table>
      </li>
      <li>
        <h1>五、舆情导读</h1>
        <ul>
          <li class="amendConOne-ext">
            <h2>(1)这是第一条</h2>
            <div style="border: 1px solid #f9f9f9;border-top: 0">
              <div class="amendConOne-ext1">
                <div>性质：非敏感</div>
                <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">文章来源：新浪</div>
                <div>时间：2017-09-22 20:00</div>
              </div>
              <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
                <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
                <p style="width: calc(100% - 100px);line-height: 30px">这和很好看的卡卡的</p>
              </div>
              <a href="" class="amendCon-url">原文地址：<span>http://www.baidu.com</span></a>
            </div>
          </li>
          <li class="amendConOne-ext">
            <h2>(1)这是第一条</h2>
            <div style="border: 1px solid #f9f9f9;border-top: 0">
              <div class="amendConOne-ext1">
                <div>性质：非敏感</div>
                <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">文章来源：新浪</div>
                <div>时间：2017-09-22 20:00</div>
              </div>
              <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
                <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
                <p style="width: calc(100% - 100px);line-height: 30px">这和很好看的卡卡的</p>
              </div>
              <a href="" class="amendCon-url">原文地址：<span>http://www.baidu.com</span></a>
            </div>
          </li>
          <li class="amendConOne-ext">
            <h2>(1)这是第一条</h2>
            <div style="border: 1px solid #f9f9f9;border-top: 0">
              <div class="amendConOne-ext1">
                <div>性质：非敏感</div>
                <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">文章来源：新浪</div>
                <div>时间：2017-09-22 20:00</div>
              </div>
              <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
                <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
                <p style="width: calc(100% - 100px);line-height: 30px">这和很好看的卡卡的</p>
              </div>
              <a href="" class="amendCon-url">原文地址：<span>http://www.baidu.com</span></a>
            </div>
          </li>
        </ul>
      </li>
    </ul>
</template>
<script>
  import BrokenLine from '../echarts/BrokenLine.vue'
  import Pie from '../echarts/Pie.vue'
  import Annular from '../echarts/Annular.vue'
  import Columnar from '../echarts/Columnar.vue'
  import Lt from '../com/LT.vue'
    export default{
        name: 'Preview',
      components: {BrokenLine, Pie, Annular, Columnar,Lt},
        data(){
            return {
              tableTitle: [
                {
                  type: 'index',
                  width: 60,
                  align: 'center',
                  title: '序列',
                },
                {
                  title: '标题',
                  key: 'name',
                  align: 'center',
                  width:450
                },
                {
                  title: '日期与来源',
                  align: 'center',
                  width:150,
                  render: (h, params) => {
                    return h('div', [
                      h(Lt, {
                        props: {
                          t: params.row.time,
                          l: params.row.lai,
                          n: 1
                        },
                      }),
                    ])
                  }
                },
                {
                  title: '属性',
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h(Lt, {
                        props: {
                          s: params.row.shu,
                          n: 2,
                        },
                      }),
                    ])
                  }
                },
                ],
              table: [
                {
                  name: '这是标题1这是标题1这是标题1这是标题1这是标题1',
                  time: '2016-10-03 19:22',
                  lai: '新浪',
                  shu: '非敏感',
                },
                {
                  name: '这是标题2 这是标题2',
                  time: '2016-10-03 19:22',
                  lai: '新浪',
                  shu: '敏感',
                },
                {
                  name: '这是标题3这是标题3这是标题3这是标题3',
                  time: '2016-10-03 19:22',
                  lai: '新浪',
                  shu: '非敏感',
                },
              ]
            }
        },
        computed: {},
        methods: {},
        mounted: function () {

        }

    }
</script>
<style scoped>
.preview{
 padding: 20px 45px;
}
.preview h1{
  font-size: 18px;
  line-height: 90px;
  color: #333;
}
.preview h2{
  font-size: 16px;
  color: #333;
}
.preview p{
  text-indent: 20px;
  font-size: 14px;
  color: #999;
}
.amendConOne-ext {
  margin-top: 15px;
}

.amendConOne-ext h2 {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}

.amendConOne-ext1 {
  display: flex;
  color: #666;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  background: #f9f9f9;
}

.amendConOne-ext1 div {
  width: 33.3333333%;
}

.amendCon-url {
  color: #0265c2;
  font-size: 14px;
  line-height: 30px;
  padding-left: 15px;
}

.amendCon-url span:hover {
  text-decoration: underline;
}
</style>
