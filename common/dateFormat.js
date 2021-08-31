
const timeTurn = (ctime) => {
  if (!ctime) {
    return '-:-'
  }
  let returnStr = ''

  // 天数位
  // let day = Math.floor(ctime / 3600 / 24);
  // let dayStr = day.toString();
  // if (dayStr.length == 1) dayStr = '0' + dayStr;

  // 小时位
  const hr = Math.floor(ctime / 3600)
  let hrStr = hr.toString()
  if (hrStr.length == 1) hrStr = '0' + hrStr
  returnStr = hrStr
  returnStr = returnStr == '00' ? '' : returnStr + ':'
  // 分钟位
  const min = Math.floor(ctime / 60 % 60)
  let minStr = min.toString()
  if (minStr.length == 1) minStr = '0' + minStr
  returnStr += minStr
  returnStr = returnStr == '00' ? '' : returnStr + ':'

  // 秒位
  const sec = Math.floor(ctime % 60)
  let secStr = sec.toString()
  if (secStr.length == 1) secStr = '0' + secStr
  returnStr += secStr
  returnStr = returnStr == '00' ? '' : returnStr + ''
  return returnStr.length > 2 ? returnStr : '00:' + returnStr
}

export default {
  timeTurn
}
