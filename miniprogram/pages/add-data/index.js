// miniprogram/pages/add-data/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
let http = getApp().http;
let Value = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    incomeyear: '请选择',
    incomemonth: '请选择',
    columns: Array.from({
      length: 50
    }, (item, index) => {
      return new Date().getFullYear() - index
    }),
    columnsmon: Array.from({
      length: 12
    }, (item, index) => {
      return index + 1 + '月'
    }),
    showpicker: false,
    monthpicker: false
  },
  submit() {
    console.log(Value)
    var {
      incomeyear,
      incomemonth
    } = this.data;
    if (incomeyear === '请选择') {
      Dialog.alert({
          title: '提示',
          message: '请选择年份',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    } else if (incomemonth === '请选择') {
      Dialog({
          title: '提示',
          message: '请选择月份',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    } else if (Value == '') {
      Dialog({
          title: '提示',
          message: '请填写收入',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    } else if (Value.split(".").length > 2) {
      Dialog({
          title: '提示',
          message: '数字格式有误',
        })
        .then(() => {})
        .catch(() => {});
    } else {
      http('updatemoney',{
        month: incomemonth,
        value: Number(Value)
      },'getmoneyone').then(res => {
        console.log(res);
        if(!res.result.data.length){
          wx.showLoading({
            title: '正在提交',
          });
          http('updatemoney', {
            month: incomemonth,
            value: Number(Value),
            year: Number(incomeyear)
          }, 'addmoney').then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '提交成功',
              icon: "success"
            });
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/data/index',
              })
            }, 1500);
          });
        }
        else{
          wx.showModal({
            title: '提示',
            content: '该记录已存在',
            showCancel:false
          });
        }
      })
      /*  */
    }

  },
  input(e) {
    Value = e.detail;
  },
  selectYear() {
    this.setData({
      showpicker: true,
    })
  },
  selectMonth() {
    this.setData({
      monthpicker: true,
    })
  },
  onClose() {
    this.setData({
      showpicker: false
    });
  },
  onClosemon() {
    this.setData({
      monthpicker: false
    });
  },
  onConfirm(event) {
    const {
      value
    } = event.detail;
    this.setData({
      showpicker: false,
      incomeyear: value
    })
  },
  onConfirmmon(event) {
    const {
      value
    } = event.detail;
    this.setData({
      monthpicker: false,
      incomemonth: value
    })
  },

  onCancel() {
    this.setData({
      showpicker: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    Value = '';
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