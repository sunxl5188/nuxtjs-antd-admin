export const getCookiesInServer = (req) => {
  const serviceCookie = {}
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    const parts = val.split('=')
    serviceCookie[parts[0].trim()] = (parts[1] || '').trim()
  })
  return serviceCookie
}

export const getPrefix = () => {
  let PREFIX
  if (process.env.NODE_ENV === 'development') {
    PREFIX = process.env.NUXT_ENV_DEVELOPMENT_PREFIX
  } else {
    PREFIX = process.env.NUXT_ENV_PRODUCTION_PREFIX
  }
  return PREFIX
}

/**
 * 获取视频音频URL时长
 * @param url 视音频地址
 * @returns {Promise<unknown>}
 */
export function getVideoUrlDuration (url) {
  if (navigator === undefined) {
    // IOS的微信小程序中无法触发onloadedmetadata
    return new Promise((resolve) => {
      const audio = new Audio(url)
      audio.muted = true
      audio.play().then(() => audio.pause())
      audio.addEventListener('loadedmetadata', function () {
        resolve({ duration: audio.duration })
      })
      audio.muted = false
    })
  } else {
    return new Promise((resolve) => {
      let video = document.createElement('video')
      video.preload = 'metadata'
      video.src = url
      video.onloadedmetadata = () => {
        resolve({ duration: video.duration })
        video = null
      }
    })
  }
}

/**
 * 获取视音频文件对象时长
 * @param files
 * @returns {Promise<unknown>}
 */
export function getVideoFileDuration (files) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(files)
    const el = document.createElement('video')
    el.setAttribute('src', url)
    el.oncanplay = () => {
      resolve({ duration: el.duration })
    }
  })
}

/**
 * @生成随机字符
 * @param len 字符长度
 * @param radix 生成字符基数
 * @returns {string}
 */
export function guid (len = 32, radix = null) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix]
    }
  } else {
    let r
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/**
 * vuex~同步登录信息start
 * @param $this
 * @param type
 */

export function syncVuex ($this, type) {
  $this.$vuex('vuex_token', $this.$getStorage('token'))
  $this.$vuex('vuex_user', $this.$getStorage('user'))
  $this.$vuexAdmin('searchFold', $this.$getStorage('searchFold'))

  if ($this.$getStorage('vuex_menu') !== '') {
    $this.$vuexAdmin('vuex_menu', $this.$getStorage('vuex_menu'))
  }
  // vuex~同步登录信息end
  if (type === 'admin' && $this.vuex_menu.selectedKeys.length > 0) {
    $this.$router.push($this.vuex_menu.selectedKeys[0])
  }
}

/**
 * 把数字转成中文数字
 * @param num
 * @returns {string}
 */

export function changeNumToHan(num){
  const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
  if (!num || isNaN(num)) {
    return '零'
  }
  const english = num.toString().split('')
  let result = ''
  for (let i = 0; i < english.length; i++) {
    const desI = english.length - 1 - i// 倒序排列设值
    result = arr2[i] + result
    const arr1Index = english[desI]
    result = arr1[arr1Index] + result
  }
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十') // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零+/g, '零') // 合并中间多个零为一个零
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万') // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/亿万/g, '亿') // 将【亿万】换成【亿】
  result = result.replace(/零+$/, '') // 移除末尾的零
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}
