
// 报错promise重新请求n次

let time = 3
const requestFn = async (a) => {
  if (time-- > 1) {
    throw '错误重新请求'
  }
  return a
}
const rerequest = async (fn, n, ...arg) => {
  for (let i = 0; i < n; i++) {
    try {
      let res = await fn(...arg);
      console.log('res', res)
      return res
    } catch (error) {
      console.log(error);
    }
  }
}
rerequest(requestFn, 3, '请求成功')

