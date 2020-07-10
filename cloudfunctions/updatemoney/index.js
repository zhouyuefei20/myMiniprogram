// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database(); //注意，不是wx.cloud.database()，这种是小程序端操作数据库的写法。云端没有“wx.”

// 云函数入口函数
exports.main = async(event, context) => {

  try {
    switch (event.action) {
      case "addmoney":
        return await db.collection("money").add({
          // data 字段表示需新增的 JSON 数据
          data: {
            month: event.month,
            value: event.value,
            year: event.year,
            avatarUrl: event.avatarUrl
          }
        });
      case 'updatemoney':
        return await db.collection("money").where({
          month: event.beforemon,
          year: event.beforeyear,
          avatarUrl: event.avatarUrl
        }).update({
          data: {
            value: event.value
          }
        });
      case 'getmoney':
        return await db.collection("money").where({
          year: event.year,
          avatarUrl: event.avatarUrl
        }).get();
      case 'getmoneyone':
        return await db.collection("money").where({
          year: event.year,
          month:event.month,
          avatarUrl: event.avatarUrl
        }).get();
      case 'removemoney':
        return await db.collection("money").where({
          year: event.year,
          month:event.month,
          avatarUrl: event.avatarUrl
        }).remove();
      default:
        return;
    }
  } catch (e) {
    console.log(e)
  }
}