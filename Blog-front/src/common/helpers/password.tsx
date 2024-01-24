function hasUpperCaseCharacter(str: string) {
  return /[A-Z]/.test(str)
}

function containsOnlyLowerCaseChars(str: string) {
  return /[a-z]/.test(str)
}

function containsNumber(str: string) {
  return /\d/.test(str)
}

function containsSymbol(str: string) {
  return /[^\w\d]/.test(str)
}

export function hasRequiredCharacters(str: string) {
  // Check for at least one uppercase character
  const hasUpperCase = hasUpperCaseCharacter(str)

  // Check for at least one lowercase character
  const hasLowerCase = containsOnlyLowerCaseChars(str)

  // Check for at least one numeric digit
  const hasNumber = containsNumber(str)

  // Check for at least one non-alphanumeric character (symbol)
  const hasSymbol = containsSymbol(str)

  // Return true if all conditions are met
  return (
    (hasUpperCase && hasLowerCase && hasNumber && hasSymbol) ||
    'パスワードは、8文字以上16文字以内で、大文字・小文字・数字・記号を組み合わせた値を設定してください'
  )
}
