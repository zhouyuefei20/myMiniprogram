// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
//查询"附近拼单"
exports.main = async (event, context) => {
  try {
    var res = await db.collection('users').where({
      avatarUrl: event.avatarUrl
    }).get();
    return res;
  } catch (e) {
    console.error(e);
  }
}
