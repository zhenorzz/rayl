// pages/phonetics/index.js
let innerAudioContext = wx.createInnerAudioContext(); //创建音频实例

Page({

  /**
   * 页面的初始数据
   */
  data: {

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