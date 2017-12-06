<template>
  <div :id="id" style="width: 700px;height: 400px;margin: 0 auto;display: block"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'BrokenLine',
    props:['id','datas'],
    data () {
      return {
        charts: '',
        list:['网站','论坛','微信','微博','外媒'],
        data:[ {
          name: '网站',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
          {
            name: '论坛',
            type: 'line',
            data: [220, 182, 191,334, 290, 330, 310]
          },
          {
            name: '微信',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '微博',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '外媒',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }],
        xAxis:['周一', '周二', '周三', '周四', '周五',],
      }
    },
    methods: {
      drawPie(id){
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          //样式
          tooltip: {
            trigger: 'axis'
          },
          //表头
          legend: {
            data: this.list,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
          },
          //右上角工具条
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              saveAsImage: {},
              restore: {},
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data:this.xAxis,
              axisLabel:{
                interval:0,//横轴信息全部显示
                rotate:-30,//-30度角倾斜显示
              }
            },
          ],
          yAxis: [
            {
              type: 'value',
            }
          ],
          series:this.data

        })
      }
    },
    watch:{
      datas:function () {
        this.data=this.datas.data;
        this.list=this.datas.data.map(v=>v.name);
        this.xAxis=this.datas.xAxis;
        this.$nextTick(function () {
          this.drawPie(this.id)
        })
      }
    },
    //调用
    mounted(){
      this.$nextTick(function () {
        this.drawPie(this.id)
      })
    }
  }
</script>
<style scoped>

</style>
