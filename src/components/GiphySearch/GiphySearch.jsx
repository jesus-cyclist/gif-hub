import React, { useEffect, useState } from 'react'
import GiphyService from '@api/GiphyService'
import { SEARCH } from '@constants/input'
import { SEARCH_SELECT_FIELD, TREND_SELECT_FIELD } from '@constants/selectField'
import { useFetching } from '@hooks/useFetching'
import { usePagintaion } from '@hooks/usePagintaion'
import { getTotalPageCount } from '@utils/pages'
import CustomButton from '../UI/CustomButton/CustomButton'
import CustomInput from '../UI/CustomInput/CustomInput'
import CustomSelect from '../UI/CustomSelect/CustomSelect'
import Pagination from '../UI/Pagination/Pagination'
import GiphyGrid from './GiphyGrid/GiphyGrid'
import styles from './GiphySearch.module.css'

const options = [TREND_SELECT_FIELD, SEARCH_SELECT_FIELD]

const GiphySearch = () => {
  const [giphyList, setGiphyList] = useState(null)
  const [searchGifsInput, setSearchGifsInput] = useState(null)

  const {
    currentPage,
    limitPage,
    changePage,
    changeLimitPage,
    totalPageCount,
    changeTotalPageCount,
  } = usePagintaion(1, 6)

  const [selectedOptions, setSelectedOption] = useState(TREND_SELECT_FIELD)
  const [fetchGIFs] = useFetching(
    async (limit, page, searchRequest, searchType) => {
      const response = await GiphyService.getAll(
        limit,
        page,
        searchRequest,
        searchType
      )
      changeTotalPageCount(
        getTotalPageCount(response.data.pagination.total_count, limitPage)
      )
      setGiphyList(response.data.data)
    }
  )

  const handleSelectChange = (field) => {
    setSelectedOption(field)
  }

  useEffect(() => {
    fetchGIFs(
      limitPage,
      currentPage * limitPage,
      searchGifsInput,
      selectedOptions.toLowerCase()
    )
  }, [currentPage])

  useEffect(() => {
    setSearchGifsInput(null)
  }, [selectedOptions])

  const handleClickSearchGifs = () => {
    changePage(1)
    fetchGIFs(
      limitPage,
      currentPage,
      searchGifsInput,
      selectedOptions.toLowerCase()
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <CustomButton label={'Search'} onClick={handleClickSearchGifs} />
        <CustomSelect options={options} onChange={handleSelectChange} />

        <div
          className={
            selectedOptions === 'Trending'
              ? styles.inputWrapper
              : styles.inputWrapperActive
          }
        >
          <CustomInput
            placeholder={'Search...'}
            value={searchGifsInput}
            type={'text'}
            onChange={(e) => setSearchGifsInput(e.target.value)}
            name={SEARCH}
            disabled={selectedOptions === 'Trending' ? true : false}
            deleteValue={() => setSearchGifsInput('')}
          />
        </div>
      </div>
      <GiphyGrid giphyList={giphyList} />
      <Pagination
        currentPage={currentPage}
        changePage={changePage}
        totalPageCount={totalPageCount}
      />
    </div>
  )
}

export default GiphySearch
