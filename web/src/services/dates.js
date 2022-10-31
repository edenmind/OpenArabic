import moment from 'moment'

export const getHijriYear = () => {
  return new Date().toLocaleDateString('ar-SA-u-ca-islamic-civil', {
    year: 'numeric'
  })
}

export const getHijriDate = () => {
  return new Date().toLocaleDateString('ar-SA-u-ca-islamic-civil', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getTimeAgoFromString = (time) => {
  return moment(time).fromNow()
}
