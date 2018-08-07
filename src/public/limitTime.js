export const startTimeLimit = (limitTime, limitNow = false) => {
  return {
    disabledDate(time) {
      const curTime = time.getTime()
      const now = Date.now() - 8.64e7
      const date = new Date(limitTime)
      const dateTime = date.getTime ? date.getTime() : Infinity
      return (limitNow && curTime < now) || curTime > dateTime
    }
  }
}
export const endTimeLimit = (limitTime, limitNow = false) => {
  return {
    disabledDate(time) {
      const curTime = time.getTime()
      const now = Date.now() - 8.64e7
      const date = new Date(limitTime)
      const dateTime = date.getTime ? date.getTime() - 8.64e7 : now
      return (limitNow && curTime < now) || curTime <= dateTime
    }
  }
}
