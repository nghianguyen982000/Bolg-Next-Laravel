const isTimeInRange = (checkTime: string, rangeTime: string): boolean => {
  const [checkStartTime, checkEndTime] = checkTime.split(' ~ ')
  const [rangeStartTime, rangeEndTime] = rangeTime.split(' ~ ')

  const isInRange = (time: string, start: string, end: string): boolean => {
    const [hour, minute] = time.split(':').map(Number)
    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)

    return (
      (hour > startHour || (hour === startHour && minute >= startMinute)) &&
      (hour < endHour || (hour === endHour && minute <= endMinute))
    )
  }

  return (
    isInRange(checkStartTime, rangeStartTime, rangeEndTime) ||
    isInRange(checkEndTime, rangeStartTime, rangeEndTime)
  )
}

export default isTimeInRange
