export const dateIsInFuture = (dateString: string) => {
  const dateOfBuild = new Date()
  // Because this will add hours, minutes, seconds, and milliseconds from the date of the build, we need to reset those. The only way I know how to do this is with these methods.
  dateOfBuild.setHours(parseInt("06", 8))
  dateOfBuild.setMinutes(parseInt("00", 8))
  dateOfBuild.setSeconds(parseInt("00", 8))
  dateOfBuild.setMilliseconds(parseInt("00", 8))

  const dateToCheck = new Date(dateString)

  return dateOfBuild < dateToCheck
}

export const formatDate = (datestring: string) => {
  const date = new Date(datestring)
  const year = date.getFullYear()

  let month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : "0" + month

  let day = date.getDate().toString()
  day = day.length > 1 ? day : "0" + day

  return month + "/" + day + "/" + year
}
