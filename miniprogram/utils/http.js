
export default function(name,data,action){
return new Promise(function(resolve,reject){
  wx.cloud.callFunction({
    name,
    data: {
      ...data,
      action,
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