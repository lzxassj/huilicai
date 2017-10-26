export default {
  /**
   * 字符串截取
   */
  substr: function (str, len) {
    len = parseInt(len) >= 0 ? len : str.length
    return str.substr(0, len)
  },

  /**
   * 指定字符串加上带className的span标签
   */
  highlight: function (str, key, className) {
    let newStr = str
    className = className === void 0 ? '' : className
    if (key) {
      newStr = str.replace(key, '<span class="' + className + '">' + key + '</span>')
    }
    return newStr
  },

  /**
   * 个转万
   */
  unit: function (num, divisor = 10000, unit = '万') {
    let _return = num
    if (num) {
      _return = (num / divisor).toFixed(2)
    }
    return _return + unit
  }
}
