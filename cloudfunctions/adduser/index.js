// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database(); //注意，不是wx.cloud.database()，这种是小程序端操作数据库的写法。云端没有“wx.”

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext() //目的：获取_openid

  try {
    return await db.collection("users").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        username: event.username,
        age: event.age,
        password: event.password,
        city: event.city,
        sex: event.sex,
        phone: event.phone
      }
    })
  } catch (e) {
    console.log(e)
  }
}