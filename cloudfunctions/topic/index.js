// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database(); //注意，不是wx.cloud.database()，这种是小程序端操作数据库的写法。云端没有“wx.”

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext() //目的：获取_openid

  try {
    switch (event.action) {
      case "addVideo":
        return await db.collection("topic").add({
          // data 字段表示需新增的 JSON 数据
          data: {
            fileID: event.fileID,
            avatarUrl: event.avatarUrl
          }
        });
      case "getVideo":
        return await db.collection("topic").where({
          // data 字段表示需新增的 JSON 数据
          avatarUrl: event.avatarUrl
        }).get();
      default:
        return;
    }
  } catch (e) {
    console.log(e)
  }
}