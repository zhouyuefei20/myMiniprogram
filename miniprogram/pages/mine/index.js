// miniprogram/pages/mine/index.js
let app = getApp();
import songs from '../../utils/songs.js';
console.log(songs);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    songs: songs
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (!app.getUserinfo()) {
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }else{
      wx.hideLoading();
      this.setData({
        flag:true
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
format(str,flag){
  var arr=str.split('?');
if(!flag){
  return arr[0];
}
else{
  var brr=arr[1].split('&'),obj={};
  for(var i in brr){
    obj[brr[i].split('=')[0]] = brr[i].split('=')[1];
  }
return obj;
}
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var str ='http://mobilecdnbj.kugou.com/api/v3/tag/recommend?showtype=3&apiver=2&plat=0';
    //console.log(this.format(str,1));
    wx.request({
      url: this.format(str, 0), //仅为示例，并非真实的接口地址
      data:this.format(str, 1),
      success: function (res) {
        console.log(res);
      },
      fail(err){
        console.log(err);
      }
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