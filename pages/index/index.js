//index.js
//获取应用实例
const app = getApp()

let innerAudioContext = wx.createInnerAudioContext(); //创建音频实例

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false
  },
  playPhonetics: function(event) {
    const symbol = event.target.dataset.symbol
    innerAudioContext.src = `assets/audio/phonetics/[${symbol}].mp3`; 
    innerAudioContext.autoplay = true 
    innerAudioContext.play(); 
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
