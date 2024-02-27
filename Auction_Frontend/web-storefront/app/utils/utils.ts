export const convertLocalDateTimeToUTC = (localDateTime: string) => {
  // Create a Date object from the localDateTime string
  const date = new Date(localDateTime)

  // To convert it to UTC, you can subtract the timezone offset
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)

  return utcDate.toISOString()
}

export const convertUTCtoLocalDateTimeUTC = (utcDateTime: string): string => {
  const date = new Date(utcDateTime)
  const year = date.getUTCFullYear()
  const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
  const day = `${date.getUTCDate()}`.padStart(2, '0')
  const hours = `${date.getUTCHours()}`.padStart(2, '0')
  const minutes = `${date.getUTCMinutes()}`.padStart(2, '0')

  // Format: "yyyy-MM-ddTHH:mm"
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
