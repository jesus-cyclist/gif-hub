import React, { useEffect, useState } from 'react'
import styles from './GiphySearch.module.css'
import CustomSelect from '../../UI/CustomSelect/CustomSelect'
import CustomInput from '../../UI/CustomInput/CustomInput'
import CustomButton from '../../UI/CustomButton/CustomButton'
import { SEARCH } from '../../../constants/input'
import {
  RANDOM_SELECT_FIELD,
  TREND_SELECT_FIELD,
  SEARCH_SELECT_FIELD,
} from '../../../constants/selectField'
import { useFetching } from '../../../hooks/useFetching'
import GiphyService from '../../../API/GiphyService'
import { getTotalPageCount } from '../../../utils/pages'
import { usePagintaion } from '../../../hooks/usePagintaion'
import Pagination from '../../UI/Pagination/Pagination'
import GiphyGrid from '../GiphyGrid/GiphyGrid'

const options = [
  { value: TREND_SELECT_FIELD, title: TREND_SELECT_FIELD },
  { value: SEARCH_SELECT_FIELD, title: SEARCH_SELECT_FIELD },
]

const GiphySearch = () => {
  const [giphyList, setGiphyList] = useState(null)
  const [searchGifsInput, setSearchGifsInput] = useState('')

  const {
    currentPage,
    limitPage,
    changePage,
    changeLimitPage,
    totalPageCount,
    changeTotalPageCount,
  } = usePagintaion(1, 9)

  const [selectedOptions, setSelectedOption] = useState(TREND_SELECT_FIELD)
  const [fetchGIFs, isLoading, error] = useFetching(
    async (limit, page, searchRequest, searchType) => {
      const response = await GiphyService.getAll(
        limitPage,
        currentPage,
        searchGifsInput,
        'trending'
      )
      changeTotalPageCount(
        getTotalPageCount(response.data.pagination.total_count, limitPage)
      )
      setGiphyList(response.data.data)
    }
  )

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    setSearchGifsInput('')
  }, [selectedOptions])

  const handleSearchGifs = () => {
    fetchGIFs(limitPage, currentPage, searchGifsInput, 'trending')
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <CustomButton label={'Search'} onClick={handleSearchGifs} />
        <CustomSelect
          value={selectedOptions}
          options={options}
          onChange={handleOptionChange}
        />

        <CustomInput
          placeholder={'Search the GIF'}
          values={searchGifsInput}
          type={'text'}
          onChange={(e) => setSearchGifsInput(e.target.value)}
          name={SEARCH}
          disabled={selectedOptions === 'trending' ? true : false}
        />
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
