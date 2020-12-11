// pages/phonetics/index.js
const symbol = require("./symbol");
const {
  toMS
} = require("../../utils/util");

let innerAudioContext = wx.createInnerAudioContext(); //创建音频实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: symbol['iː'],
    prev: '',
    next: '',
    isPlaying: false,
    isRecord: false,
    duration: 0,
    offset: 0,
    endTime: '0:00',
    startTime: '0:00',
    recordPermission: '',
  },

  playPhonetics: function (event) {
    const symbol = event.target.dataset.symbol
    innerAudioContext.src = `assets/audio/phonetics/[${symbol}].mp3`
    this.play()
  },

  playYoudao: function (event) {
    const audio = event.currentTarget.dataset.audio
    innerAudioContext.src = `https://dict.youdao.com/dictvoice?audio=${audio}&type=1`;
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
  play: function () {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const symbolSortArr = Object.keys(symbol)
    const currentIndex = symbolSortArr.findIndex(item => item === options.symbol)
    let prev = ''
    let next = ''

    if (currentIndex > 0) {
      prev = symbolSortArr[currentIndex - 1]
    }

    if (currentIndex < symbolSortArr.length - 1) {
      next = symbolSortArr[currentIndex + 1]
    }
    this.setData({
      'current': symbol[options.symbol],
      'prev': prev,
      'next': next
    })
    wx.setNavigationBarTitle({
      title: symbol[options.symbol].title
    })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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