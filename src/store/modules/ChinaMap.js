import axios from 'axios'
const state = {
  geoCoordMap: {
    '上海': [121.4648, 31.2891],
    '广东': [113.8953, 22.901],
    '山西': [111.4783, 36.1615],
    '新疆': [85.9236, 40.5883],
    '河北': [115.0488, 39.0948],
    '甘肃': [103.5901, 36.3043],
    '内蒙古': [110.3467, 41.4899],
    '北京': [116.4551, 40.2539],
    '北海': [109.314, 21.6211],
    '江苏': [119.6062, 32.9208],
    '广西': [108.479, 23.1152],
    '江西': [116.0046, 28.6633],
    '福建': [118.1689, 24.6478],
    '合肥': [117.29, 32.0581],
    '陕西': [108.4131, 34.8706],
    '黑龙江': [127.9688, 47.368],
    '辽宁': [122.2229, 38.6409],
    '天津': [117.4219, 39.4189],
    '安徽': [117.0123, 32.2121],
    '四川': [103.9526, 30.7617],
    '西藏': [91.1865, 30.1465],
    '云南': [102.9199, 25.4663],
    '浙江': [120.5313, 29.1773],
    '湖南': [111.5327, 27.0319],
    '湖北': [112.3896, 30.6628],
    '山东': [117.1582, 36.8701],
    '海南': [110.3893, 19.8516],
    '青海': [96.8038, 36.2207],
    '贵州': [106.6992, 26.7682],
    '河南': [113.4668, 34.1234],
    '重庆': [107.7539, 30.1904],
    '宁夏': [106.3586, 36.8775],
    '吉林': [125.8154, 43.6584],
    '香港': [115.1215, 22.1235],
    '澳门': [112.1211, 22.2111],
    '台北': [120.1111, 23.2435]
  },
  showCityNumber: 5,
  isLoading: true,
  data: [
    [{'name': '河南', 'value': 105}, {'name': '广西'}],
    [{'name': '山东', 'value': 90}, {'name': '广西'}],
    [{'name': '江西', 'value': 80}, {'name': '广西'}],
    [{'name': '广东', 'value': 70}, {'name': '广西'}],
    [{'name': '宁夏', 'value': 40}, {'name': '广西'}],
    [{'name': '内蒙古', 'value': 10}, {'name': '广西'}],
    [{'name': '重庆', 'value': 20}, {'name': '广西'}],
    [{'name': '广西', 'value': 20}, {'name': '重庆'}],
    [{'name': '广西', 'value': 40}, {'name': '北京'}]
  ]
}

const getters = {}

const actions = {
  fetchHeatChinaRealData ({state, commit}, chartsObj) {
    axios.get('bigscreen/getProvinceIntercept')
      .then((res) => {
        let privincedata = res.data
        let data = state.data
        let convertData = ((state, data) => {
          let res = []
          for (let i = 0; i < data.length; i++) {
            let dataItem = data[i]
            let fromCoord = state.geoCoordMap[dataItem[0].name]
            let toCoord = state.geoCoordMap[dataItem[1].name]
            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                numValue: dataItem[0].value,
                coords: [fromCoord, toCoord]
              })
            }
          }
          return res
        })(state, data)

        let LineColor = ['#ff3333', 'orange', 'lime', 'aqua']
        let series = [];
        [['广西', data]].forEach(function (item, i) {
          series.push({
            // 设置飞行线
            name: item[1],
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 1.7,
              color: '#fff',
              shadowBlur: 0,
              symbolSize: 0
            },
            lineStyle: {
              normal: {
                color: function (params) {
                  let num = params.data.numValue
                  if (num > 100) {
                    return LineColor[0]
                  } else if (num > 50) {
                    return LineColor[1]
                  } else if (num > 25) {
                    return LineColor[2]
                  } else {
                    return LineColor[3]
                  }
                },
                width: 1,
                curveness: 0.2
              }
            },
            data: convertData

          },
            // 设置轨迹线
          {
            name: item[0],
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              symbolSize: 10
            },
            lineStyle: {
              normal: {
                color: function (params) {
                  let num = params.data.numValue
                  if (num > 100) {
                    return LineColor[0]
                  } else if (num > 50) {
                    return LineColor[1]
                  } else if (num > 25) {
                    return LineColor[2]
                  } else {
                    return LineColor[3]
                  }
                },
                width: 0.2,
                opacity: 0.4,
                curveness: 0.2
              }
            },
            data: convertData
          },
          {
            // 起点设置点
            name: item[0],
            type: 'effectScatter',
            zlevel: 2,
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: function (params) {
                  var res = params.value[2]
                  return res
                }

              }
            },
            symbolSize: function (val) {
              return val[2] / 10
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let num = params.value[2]
                  if (num > 100) {
                    return LineColor[0]
                  } else if (num > 50) {
                    return LineColor[1]
                  } else if (num > 25) {
                    return LineColor[2]
                  } else {
                    return LineColor[3]
                  }
                }
              }

            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[0].name,
                value: state.geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
              }
            })
          },
          {
            name: '拦截来电总数',
            type: 'map',
            geoIndex: 0,
            data: privincedata
          })
        })

        if (state.isLoading) {
          chartsObj.hideLoading()
          commit('closeLoading')
        }

        chartsObj.setOption({
          series: series
        })
      })
  }
}

const mutations = {
  closeLoading (state) {
    state.isLoading = false
  },
  openLoading (state) {
    state.isLoading = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
