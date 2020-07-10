
export default function(name,data,action){
return new Promise(function(resolve,reject){
  wx.cloud.callFunction({
    name,
    data: {
      action: action||'',
      avatarUrl: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo').avatarUrl:'',
      ...data,
    },
    success: res => {
      resolve(res);
      
    },
    fail: err => {
      wx.hideLoading();
      reject(err);
      wx.showModal({
        title: '提示',
        content: '响应错误',
        showCancel: false
      });
    }
  });
})
}