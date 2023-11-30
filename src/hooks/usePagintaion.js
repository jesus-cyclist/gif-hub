import { useState } from 'react'

export const usePagintaion = (initialPage = 1, initialLimit = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [limitPage, setLimitPage] = useState(initialLimit)
  const [totalPageCount, setTotalPageCount] = useState(0)

  const changeTotalPageCount = (newTotalPageCount) => {
    setTotalPageCount(newTotalPageCount)
  }

  const changePage = (newPage) => {
    if (newPage < 1) {
      return setCurrentPage(1)
    }
    if (newPage > totalPageCount) {
      return setCurrentPage(totalPageCount)
    }
    setCurrentPage(newPage)
  }

  const changeLimitPage = (newLimit) => {
    setLimitPage(newLimit)
    setCurrentPage(1)
  }

  return {
    currentPage,
    limitPage,
    changePage,
    changeLimitPage,
    totalPageCount,
    changeTotalPageCount,
  }
}
