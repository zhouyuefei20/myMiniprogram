// miniprogram/pages/login/index.js
let app=getApp();
let http = app.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  quickLogin(res){
    app.setUserinfo(res.detail.userInfo);
    http('login',{
      avatarUrl: res.detail.userInfo.avatarUrl
    }).then(re=>{
      if (!re.result.data.length){
        http('adduser', res.detail.userInfo);
      }
    });
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    http('login',{
      username:'zhouyuefei'
    }).then(res => {
    //  console.log(res)
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})