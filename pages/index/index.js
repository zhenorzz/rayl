//index.js

const {
  toMS
} = require("../../utils/util");

//获取应用实例
const app = getApp()

let innerAudioContext = wx.createInnerAudioContext(); //创建音频实例

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    isPlaying: false,
    isRecord: false,
    duration: 0,
    offset: 0,
    endTime: '0:00',
    startTime: '0:00',
    recordPermission: '',
  },
  navigateToPhonetics: function (event) {
    const symbol = event.target.dataset.symbol
    wx.navigateTo({
      url: `/pages/phonetics/index?symbol=${symbol}`
    })
  },
  playPhonetics: function (event) {
    const symbol = event.target.dataset.symbol
    innerAudioContext.src = `assets/audio/phonetics/[${symbol}].mp3`
    this.play()
  },
  record: function (event) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.record'] === false) {
          wx.showToast({
            title: '你已拒绝过录音功能，请手动设置',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    const recorderManager = wx.getRecorderManager()
    recorderManager.onStart(() => {
      wx.showModal({
        content: '正在录音',
        showCancel: false,
        success() {
          recorderManager.stop()
        }
      })
    })
    recorderManager.onStop((res) => {
      const {
        tempFilePath,
        duration
      } = res
      innerAudioContext.src = tempFilePath
      this.setData({
        duration: Math.round(duration / 1000),
        endTime: toMS(Math.round(duration / 1000)),
      })
    })
    const options = {
      duration: 300000,
      sampleRate: 24000,
      encodeBitRate: 128000,
      format: 'aac',
    }
    recorderManager.start(options)
  },
  play: function (event) {
    if (innerAudioContext.src === '') {
      wx.showToast({
        title: '请先录音或者点击音标',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.isPlaying) {
      innerAudioContext.pause()
      this.setData({
        isPlaying: false,
      })
    } else {
      innerAudioContext.play()
      this.setData({
        isPlaying: true,
      })
    }
  },
  musicSlide: function (event) {
    const value = event.detail.value
    innerAudioContext.stop()
    innerAudioContext.seek(value)
    setTimeout(() => {
      innerAudioContext.play()
    }, 50)
  },
  onReady: function () {
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onTimeUpdate(() => {
      const currentTime = innerAudioContext.currentTime
      this.setData({
        duration: Math.round(innerAudioContext.duration),
        offset: Math.round(currentTime),
        startTime: toMS(Math.round(currentTime)),
        endTime: toMS(Math.round(innerAudioContext.duration)),
      })
    })

    innerAudioContext.onEnded(() => {
      this.setData({
        isPlaying: false,
        offset: 0,
        startTime: '0:00',
      })
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})