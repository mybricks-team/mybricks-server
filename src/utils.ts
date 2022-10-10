import * as moment from "dayjs";

export const Logs = {
  info(content: string) {
    console.log(`[Mybricks] - ${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")} ${content}`)
  }
}

export function versionGreaterThan(version1, version2) {
  return compareVersion(version1.replace(/_/g,'.'), version2.replace(/_/g,'.'))>0
}

function compareVersion(version1, version2) {
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')
  const length1 = arr1.length
  const length2 = arr2.length
  const minlength = Math.min(length1, length2)
  let i = 0
  for (i; i < minlength; i++) {
    let a = parseInt(arr1[i])
    let b = parseInt(arr2[i])
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
  }
  if (length1 > length2) {
    for (let j = i; j < length1; j++) {
      if (parseInt(arr1[j]) != 0) {
        return 1
      }
    }
    return 0
  } else if (length1 < length2) {
    for (let j = i; j < length2; j++) {
      if (parseInt(arr2[j]) != 0) {
        return -1
      }
    }
    return 0
  }
  return 0
}
