// miniprogram/pages/mine/index.js
let app = getApp();
let Status = '', Ind=0;
let that='';
import song from '../../utils/songs.js';
let songs = song.map((item,index) => {
  return {
    ...item,
    id:index,
    bg: 'white',
    col: 'black'
  }
}), CopySongs = songs;
console.log(songs);
const backgroundAudioManager = wx.getBackgroundAudioManager();
backgroundAudioManager.onEnded(function(){
  that.next();
});
backgroundAudioManager.onNext(function(){
  that.next();
});
backgroundAudioManager.onPrev(function(){
  that.previous();
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    flag:false,
    songs: songs,
    imgsrc: songs[0].imgsrc,
    singer: songs[0].singer,
    songName: songs[0].songName,
    src: songs[0].src
  },
  clear(){
    this.setData({
      songs: CopySongs
    })
  },
  search(e){
    console.log(this.searchSong(e.detail));
    this.setData({
      songs: this.searchSong(e.detail)
    })

  },
  searchSong(val){
    return CopySongs.filter((item,index)=>{
      return item.songName.includes(val);
    })
  },
  bindended(){
    this.next();
  },
  bindtimeupdate(){
    //console.log(e);
  },
  bgChange(arr,key,ind,val){
    arr.forEach((item,index)=>{
     if(Number(index)===Number(ind)){
       item[key]=val;
       item.col='white';
     }
     else{
       item[key] ='white';
       item.col='black';
     }
    });
    return arr;
  },
  previous(){
    if (Ind === 0) {
      Ind = this.data.songs.length - 1;
    }
    else {
      Ind--;
    }
    var { imgsrc, singer, songName, src } = this.data.songs[Ind];
    this.setMusic(imgsrc, singer, songName, src);
    var songs = this.data.songs;
    this.setData({
      songs: this.bgChange(songs, 'bg', Ind, '#4fc08d')
    }, () => {
      Status = 'play';
    })
  },
  next(){
    if (Ind === this.data.songs.length-1){
      Ind=0;
    }
    else{
      Ind++;
    }
    var { imgsrc, singer, songName, src } = this.data.songs[Ind];
    this.setMusic(imgsrc, singer, songName, src);
    var songs = this.data.songs;
    this.setData({
      songs: this.bgChange(songs, 'bg', Ind, '#4fc08d')
    }, () => {
      Status = 'play';
    })
  },
  tap(){
    if (Status==='play'){
      this.audioCtx.pause();
      Status='pause';
    }
    else{
      this.audioCtx.play();
      Status = 'play';
    }
  },
  setMusic(imgsrc, singer, songName, src){
    backgroundAudioManager.title = songName;
    backgroundAudioManager.epname = songName;
    backgroundAudioManager.singer = singer;
    backgroundAudioManager.coverImgUrl = imgsrc;
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = src;
  },
  play(e){
    var { imgsrc, singer, songName, src}=e.currentTarget.dataset.info;
  Ind = e.currentTarget.dataset.index;
  var songs = this.data.songs;
    this.setMusic(imgsrc, singer, songName, src);

    this.setData({
      songs: this.bgChange(songs, 'bg', Ind, '#4fc08d')
    },()=>{
      Status = 'play';
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    //wx.hideTabBar();
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
    this.audioCtx = wx.createAudioContext('myAudio');
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