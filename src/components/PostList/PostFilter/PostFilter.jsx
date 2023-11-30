import React from 'react'
import CustomSelect from '../../UI/CustomSelect/CustomSelect'
import CustomInput from '../../UI/CustomInput/CustomInput'
import styles from './PostFilter.module.css'
import { ReactComponent as Delete } from '../../../assets/svg/plus.svg'

const PostFilter = ({ options, filter, setFilter, clickOnFilterTag }) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterControls}>
        <div className={styles.input}>
          <CustomInput
            placeholder={'Try a hash or name'}
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            deleteValue={() => setFilter({ ...filter, query: '' })}
          />
        </div>
        <div className={styles.select}>
          <CustomSelect
            options={options}
            onChange={(selectedSort) => {
              setFilter({ ...filter, sort: selectedSort })
            }}
          />
        </div>
      </div>

      <div className={styles.filterTags}>
        {filter.filterTags.map((filterTag) => (
          <div className={styles.tag} key={filterTag}>
            {filterTag}
            <div
              className={styles.deleteTagButton}
              onClick={(e) => clickOnFilterTag(filterTag)}
            >
              <Delete width={15} height={15} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostFilter
