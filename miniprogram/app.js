import http from './utils/http.js';
// http().then(res=>{})
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'myserve-dt5cv',
        traceUser: true,
      })
    };
   /*  wx.cloud.callFunction({
      name: 'login',
      data:{
        username:"zhouyuefei"
      },
      complete: res => {
        console.log("***orderQuery",res);
      }
    }); */

   /*  wx.cloud.callFunction({
      name: 'adduser',
      data: {
        username: "huang",
        age: 12,
        password: "123",
        city: "北京",
        sex: "女",
        phone: "1321146123"
      },
      complete: res => {
        console.log("成功", res);
      }
    }); */
     
    
   

  },
  http,
  globalData:{
    userinfo: wx.getStorageSync('userinfo')||''
  },
  setUserinfo:function(info){
    this.globalData.userinfo = info;
    wx.setStorageSync("userinfo", info);
  },
  getUserinfo: function () {
    return this.globalData.userinfo;
  }
})
