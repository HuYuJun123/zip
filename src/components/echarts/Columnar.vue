<template>
  <div :id="id" style="width: 700px;height: 400px;margin: 0 auto;display: block"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'Columnar',
    props: ['id', 'datas'],
    data () {
      return {
        charts: '',
        list: [1, 2, 3, 4, 5],
        data: ['测试1', '测试2', '测试3', '测试4', '测试5']
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
              data: this.data,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,//横轴信息全部显示
                rotate: 30,//30度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
            }
          ],
          series: [
            {
              name: '数量',
              type: 'bar',
              barWidth: '60%',
              data: this.list,
              itemStyle: {
                normal: {
                  color: (params)=> {
                    let arr = [];
                    for (let i = 0; i <= this.data.length; i++) {
                      let str = 'rgb(';
                      str+=Math.floor(Math.random() * 255)+',';
                      str+=Math.floor(Math.random() * 50)+100+',';
                      str+=Math.floor(Math.random() * 50)+100+')';
                      arr.push(str)
                    }
                    let colorList = arr;
                    return colorList[params.dataIndex];
                  }
                },
              }
            }
          ]
        })
      }
    },
    watch: {
      datas: function () {
        this.list = this.datas.map(v => v.value);
        this.data = this.datas.map(v => v.name);
        this.$nextTick(function () {
          this.drawPie(this.id)
        })
      }
    },
    mounted(){
    }
  }
</script>
<style scoped>

</style>
