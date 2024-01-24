// Function to check if a string contains only Hiragana characters
export function isHiragana(value: string, message: string) {
  if (!value) {
    return
  }

  const hiraganaRegex = /^[\u3040-\u309F]+$/

  if (!value.match(hiraganaRegex)) {
    return message
  }

  return message
}

// Function to check if a string contains only Katakana characters
export function isKatakana(value: string, message: string) {
  if (!value) {
    return
  }

  const katakanaRegex = /^[\u30A0-\u30FF]+$/

  if (!value.match(katakanaRegex)) {
    return message
  }

  return true
}

// Function to check if a string contains only Katakana characters
export function isFurigana(value: string, message: string) {
  if (!value) {
    return
  }

  const katakanaRegex = /^[\u30A0-\u30FF-\u3040-\u309F]+$/

  if (!value.match(katakanaRegex)) {
    return message
  }

  return true
}

// ひらがな・ローマ字
export const isValidFurigana = (str: string) => {
  return /^[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}A-Za-z ]*$/u.test(
    str,
  )
}

// Regular expression to match the "00-0000-0000" or "000-0000-0000" format and must start from 0
export const validatePhoneNumber = (value: string) => {
  if (!value) {
    return
  }

  const regex = /^0(\d{1})-(\d{4})-(\d{4})$/
  const regex1 = /^0(\d{2})-(\d{4})-(\d{4})$/

  if (regex.test(value) || regex1.test(value)) {
    return true
  }

  return '電話番号の形式に誤りがあります'
}

// Regular expression to validate email format
export const validateEmail = (value: string) => {
  if (!value) {
    return
  }

  const emailRegex =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/

  if (!value.match(emailRegex)) {
    return 'メールの形式に誤りがあります'
  }

  return true
}
