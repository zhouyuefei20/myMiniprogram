let http = getApp().http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[]
  },
  change(e){
    console.log(e.detail);
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
    var that = this, ar = [];
    http('topic', {}, 'getVideo').then(res => {
      var data = res.result && res.result.data;
      data  &&  data.forEach((item, index) => {
        wx.cloud.downloadFile({
          fileID: item.fileID, // 文件 ID
          success: res => {
            // 返回临时文件路径
            // console.log(res.tempFilePath)
            ar.push(res.tempFilePath);
            this.setData({
              arr: ar
            });
          },
          fail: console.error
        })
      })
    });
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