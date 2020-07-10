// miniprogram/pages/topic/index.js
let app = getApp();
let http = getApp().http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    flag:false
  },
  fabu(){
    wx.showLoading({
      title: '上传中',
    })
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'video.mp4', // 上传至云端的路径
      filePath: this.data.src, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("看一下",res.fileID);
        http('topic',{
          fileID: res.fileID
        },'addVideo');
        wx.hideLoading();
        wx.showToast({
          title: '发布成功',
          icon:'success'
        });
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/index/index',
          })
        },1500)
      },
      fail: ()=>{
        wx.hideLoading();
        console.error;

      }
    })
  },
  retake(){
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      compressed: false,
      camera: 'back',
      success: res => {
        console.log(res.tempFilePath);
        this.setData({
          src: res.tempFilePath
        })
      },
      fail: () => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      complete: () => {
        this.setData({
          flag: true
        });
      }
    })
  },
  onTabItemTap() {
    wx.showLoading({
      title: '加载中',
    })
    if (!app.getUserinfo()) {
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }else{
    
      wx.hideLoading();
     // return;
    this.retake();
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoContext = wx.createVideoContext('video');
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      src: '',
      flag: false
    });
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