export const convertLocalDateTimeToUTC = (localDateTime: string) => {
  // Create a Date object from the localDateTime string
  const date = new Date(localDateTime)

  // To convert it to UTC, you can subtract the timezone offset
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)

  return utcDate.toISOString()
}
