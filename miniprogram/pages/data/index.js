import * as echarts from '../../ec-canvas/echarts.js';
let app = getApp();
import {
  option
} from '../../utils/echarts-option';
import {
  sum
} from '../../utils/array';
let http = getApp().http;
let x = [],
  y = [];
function initChart(canvas, width, height) {
  console.log("进来");
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  console.log("执行", x, y);
  chart.setOption(option(x, y),true,true);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: '',
    incomeAll: 0,
    percent: 0,
    hasLoad: true,
    flag:false,
    columns: Array.from({
      length: 50
    }, (item, index) => {
      return new Date().getFullYear() - index
    }),
    incomeyear: new Date().getFullYear(),
    showpicker: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  showPopup() {
    this.setData({
      showpicker: true
    });
  },

  onClose() {
    this.setData({
      showpicker: false
    });
  },
  onConfirm(event) {
    const {
      value
    } = event.detail;
    this.setData({
      showpicker: false,
      incomeyear: value,
      ec:''
    },()=>{
      this.init(value);
    })
  },

  onCancel() {
    this.setData({
      showpicker: false
    })
  },
  selectyear() {
    this.setData({
      showpicker: true
    })
  },
  init(year){
    wx.showLoading({
      title: '加载中',
    })
    http('updatemoney', {
      year
    }, 'getmoney').then(res => {
     
      var data = res.result.data;
      x = data.map(function (item) {
        return item.month;
      });
      y = data.map(function (item) {
        return item.value
      });
      
      this.setData({
        ec: {
          onInit: initChart
        },
        flag:true,
        hasLoad: false,
        incomeAll: sum(option(x, y).series[0].data) * 1000,
        percent: option(x, y).series[0].data.length <= 6 ? 100 : option(x, y).series[0].data.length * 20
      }, () => {
        console.log(this.data);
        wx.hideLoading();
      });
    });
  },
  onLoad: function(options) {
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    });
    if (!app.getUserinfo()) {
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }
    else {
      wx.hideLoading();
      this.init(new Date().getFullYear());
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})