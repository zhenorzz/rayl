// pages/phonetics/index.js
let innerAudioContext = wx.createInnerAudioContext(); //创建音频实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: {},
    symbol: {
      iː:{
        title: "长元音/iː/的发音方法",
        phonetic: "iː",
        brief: "是单元音前元音,是个长元音。",
        part1: {
          organ: "https://i.xiao84.com/en-yinbiao/lip-rounding-video/i1-1.mp4",        
          mouth: "https://i.xiao84.com/en-yinbiao/lip-rounding-video/i1.mp4"
        },
        part2: {
          sound: [
            {word: "bee",front: "b",middle: "ee",back: "",phonetic: "/biː/",class: "n.",chinese: "蜜蜂"},
            {word: "we",front: "w", middle: "e",back: "",phonetic: "/wiː/",class: "pron.",chinese: "我们"},
            {word: "read",front: "r",middle: "ea",back: "d",phonetic: "/riːd/",class: "vt.",chinese: "阅读"},
            {word: "meet",front: "m",middle: "ee",back: "t",phonetic: "/miːt/",class: "n.",chinese: "肉"},
            {word: "heat",front: "h",middle: "ea",back: "t",phonetic: "/hiːt/",class: "n.",chinese: "高温"},
            {word: "seat",front: "s",middle: "ea",back: "t",phonetic: "/siːt/",class: "n.",chinese: "座位"},
          ]
        },
        part3: {
          method: [
            "1) 张开你的嘴巴，好像你在微笑，露出你的牙齿，嘴唇向两边伸开，成扁平形。",
            "2）将舌前部向硬腭尽量抬起。舌头轻微接触下齿背部。",
            "3）嘴唇绷紧，舌头肌肉保持紧张，震动声带，发出/iː/音。"
          ]
        },
        tips: "/iː/是个长元音，发音的时候要尽量拉长。"
      }
    }
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
    this.setData(
      {
        'current': this.data.symbol[options.symbol]
      }
    )
    wx.setNavigationBarTitle({
      title: this.data.symbol[options.symbol].title
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