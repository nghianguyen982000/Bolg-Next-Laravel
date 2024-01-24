type PasswordGenerateProps = {
  passLength?: number
}

export function generatePassword({ passLength = 12 }: PasswordGenerateProps) {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?/'

  // Ensure at least one character from each character set
  const randomLowercase =
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
  const randomUppercase =
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
  const randomNumber =
    numberChars[Math.floor(Math.random() * numberChars.length)]
  const randomSymbol =
    symbolChars[Math.floor(Math.random() * symbolChars.length)]

  // Combine all character sets and shuffle
  const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars
  const shuffledChars = allChars
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')

  // Select the remaining characters randomly
  const remainingChars = shuffledChars.slice(4, passLength)

  // Concatenate all parts to form the final password
  const password =
    randomLowercase +
    randomUppercase +
    randomNumber +
    randomSymbol +
    remainingChars

  return password
}
