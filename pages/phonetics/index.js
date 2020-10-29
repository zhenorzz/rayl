// pages/phonetics/index.js
const symbol = require("./symbol");
let innerAudioContext = wx.createInnerAudioContext(); //创建音频实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: {},
    prev: '',
    next: '',
  },
  
  playPhonetics: function(event) {
    const symbol = event.target.dataset.symbol
    innerAudioContext.src = `assets/audio/phonetics/[${symbol}].mp3`; 
    innerAudioContext.autoplay = true 
    innerAudioContext.play(); 
  },

  playYoudao: function(event) {
    const audio = event.target.dataset.audio
    innerAudioContext.src = `https://dict.youdao.com/dictvoice?audio=${audio}&type=1`; 
    innerAudioContext.autoplay = true 
    innerAudioContext.play(); 
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const symbolSortArr = Object.keys(symbol)
    const currentIndex = symbolSortArr.findIndex(item => item===options.symbol)
    let prev = ''
    let next = ''

    if (currentIndex > 0) {
      prev = symbolSortArr[currentIndex-1]
    }

    if (currentIndex < symbolSortArr.length - 1) {
      next = symbolSortArr[currentIndex+1]
    }

    this.setData(
      {
        'current': symbol[options.symbol],
        'prev': prev,
        'next': next
      }
    )
    wx.setNavigationBarTitle({
      title: symbol[options.symbol].title
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