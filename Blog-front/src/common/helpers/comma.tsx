export const CommaPlit = (numb?: number) => {
  if (!numb) {
    return 0
  }
  return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
