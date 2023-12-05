// 节流

const fn = (a = 0) => {
  console.log('a', a)
}
const throttle = (fn, timer = 500) => {
  let time = null
  return (...arg) => {
    let nowTime = Date.now()
    if (!time) {
      fn(...arg)
      time = nowTime
    } else if (nowTime - time >= timer) {
      fn(...arg)
      time = nowTime
    }
  }
}

let times = 1000
let Oldtime = Date.now()
const res = throttle(fn)
let setInter = setInterval(() => {
  res('节流')
  if (Date.now() - Oldtime > times) {
    clearInterval(setInter)
  }
}, 100);