export const dateIsInFuture = (dateString: string) => {
  const dateOfBuild = new Date()
  // Because this will add hours, minutes, seconds, and milliseconds from the date of the build, we need to reset those. The only way I know how to do this is with these methods.
  // Also TypeScript yells a lot whenever you use non-octal literals. Hence the parseInt garbage.
  // I'm not proud of it, but hey, when was the last time you were proud of every piece of code you wrote?
  dateOfBuild.setHours(parseInt("06", 8))
  dateOfBuild.setMinutes(parseInt("00", 8))
  dateOfBuild.setSeconds(parseInt("00", 8))
  dateOfBuild.setMilliseconds(parseInt("00", 8))

  const dateToCheck = new Date(dateString)

  return dateOfBuild < dateToCheck
}