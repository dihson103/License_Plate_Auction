export const convertLocalDateTimeToUTC = (localDateTime: string) => {
  const date = new Date(localDateTime)
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return utcDate.toISOString()
}

export const convertUTCtoLocalDateTime = (utcDateTime: string | null): string | null => {
  if (utcDateTime == null) {
    return null
  }

  const date = new Date(utcDateTime)
  const year = date.getUTCFullYear()
  const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
  const day = `${date.getUTCDate()}`.padStart(2, '0')
  const hours = `${date.getUTCHours()}`.padStart(2, '0')
  const minutes = `${date.getUTCMinutes()}`.padStart(2, '0')

  // Format: "yyyy-MM-ddTHH:mm"
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export const convertNumberToVietNamMoney = (num: number) => {
  const formattedNumber = num.toLocaleString('en-US').replaceAll(',', '.')
  return formattedNumber + ' vnd'
}

export const convertUtcToDateTimeFormat = (utcDateTime: string | null) => {
  if (utcDateTime == null) {
    return null
  }
  const datetimeWithoutMilliseconds = utcDateTime.slice(0, -5)
  const formattedDatetime = datetimeWithoutMilliseconds.replace('T', ' ')
  return formattedDatetime
}

export const convertAuctionStatusToNumber = (status: string) => {
  switch (status) {
    case 'InActive':
      return 0
    case 'Pending':
      return 1
    case 'Live':
      return 2
    case 'Finished':
      return 3
    case 'ReserveNotMet':
      return 4
    default:
      return 2
  }
}
