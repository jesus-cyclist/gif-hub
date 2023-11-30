export const getTotalPageCount = (totalCountResponse, limitOnPage) => {
  const pages = totalCountResponse / limitOnPage
  return Math.ceil(pages)
}
