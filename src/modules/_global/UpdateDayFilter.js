export default function updateDayFilter(updateDay) {
  let updateDayKor = '';
  if (updateDay === 0) {
    updateDayKor = '월요일'
  } else if (updateDay === 1) {
    updateDayKor = '화요일'
  } else if (updateDay === 2) {
    updateDayKor = '수요일'
  } else if (updateDay === 3) {
    updateDayKor = '목요일'
  } else if (updateDay === 4) {
    updateDayKor = '금요일'
  } else if (updateDay === 5) {
    updateDayKor = '토요일'
  } else if (updateDay === 6) {
    updateDayKor = '일요일'
  } else if (updateDay === 7) {
    updateDayKor = '열흘'
  } else if (updateDay === -1) {
    updateDayKor = '완결'
  } else {
    updateDayKor = ''
  }
  return updateDayKor
}