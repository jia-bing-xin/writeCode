
//根据映射配置，实现promise.race并发控制

const fn = (a) => {
  const random = Math.floor((Math.random() * 1000) + 1001)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log('a', a)
      resolve(a)
    }, random);
  })

}

const promiseRace = async (promiseList, num) => {
  const list = []
  let index = 0
  const resolveList = []
  const len = promiseList.length
  while (num > index) {
    list.push(promiseList[index++])
  }
  while (num <= index && index < len) {
    let res = await Promise.race(list.map((item) => item.fn))
    resolveList.push(res)
    const idx = list.findIndex((item) => item.id === res)
    list.splice(idx, 1)
    list.push(promiseList[index++])
  }
  return await Promise.allSettled([...resolveList, ...list.map((item) => item.fn)])
}

const promiseList = new Array(8).fill(0).reduce((prev, cur, index) => [...prev, { id: index, fn: fn(index) }], [])

promiseRace(promiseList, 3).then((res) => {
  console.log('resthen', res)
})