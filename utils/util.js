const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const toMS = second => {
  //计算分钟
  //算法：将秒数除以60，然后下舍入，既得到分钟数
  let minute = Math.floor(second / 60);
  //计算秒
  //算法：取得秒%60的余数，既得到秒数
  second = second % 60;
  //将变量转换为字符串
  second += '';
  //如果只有一位数，前面增加一个0
  second = (second.length == 1) ? '0' + second : second;
  return minute + ':' + second;
}

module.exports = {
  formatTime: formatTime,
  toMS: toMS,
}