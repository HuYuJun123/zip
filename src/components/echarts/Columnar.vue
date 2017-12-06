<template>
  <div :id="id" style="width: 700px;height: 400px;margin: 0 auto;display: block"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'Columnar',
    props:['id'],
    data () {
      return {
        charts: '',
        list: ['微博', '网站', '论坛', '微信', '外媒'],
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunssssssssssssss'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel:{
                interval:0,//横轴信息全部显示
                rotate:30,//30度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220],
              itemStyle: {
                normal: {
                  color: function (params) {
                    let colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)','red','blue','orange','#bbb'];
                    return colorList[params.dataIndex];
                  }
                },
              }
            }
          ]

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
