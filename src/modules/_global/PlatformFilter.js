export default function platformFilter(platform) {
  let platformKor = '';
  if (platform === 'naver') {
    platformKor = '네이버웹툰'
  } else if (platform === 'daum') {
    platformKor = '다음웹툰'
  } else if (platform === 'kakao') {
    platformKor = '카카오페이지'
  } else if (platform === 'lezhin') {
    platformKor = '레진코믹스'
  } else if (platform === 'tomics') {
    platformKor = '투믹스'
  } else if (platform === 'toptoon') {
    platformKor = '탑툰'
  } else if (platform === 'battle') {
    platformKor = '배틀코믹스'
  } else if (platform === 'comico') {
    platformKor = '코미코'
  } else if (platform === 'comica') {
    platformKor = '코미카'
  } else {
    platformKor = ''
  }
  return platformKor
}