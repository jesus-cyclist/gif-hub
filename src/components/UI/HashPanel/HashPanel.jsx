import serverService from '@api/ServerService'
import { ReactComponent as Check } from '@assets/svg/checkAddHashtag.svg'
import { ReactComponent as PlusDelete } from '@assets/svg/plus.svg'
import { useFetching } from '@hooks/useFetching'
import { updatePost } from '@services/reducers/user'
import { selectFilterTags, selectTheme, selectUser } from '@services/selectors'
import { getBorderClass } from '@utils/theme'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Transition } from 'react-transition-group'
import Hint from '../Hint/Hint'
import styles from './HashPanel.module.css'

const HashPanel = ({
  hashtags = [],
  id,
  clickOnTag = () => {},
  clickOnDeleteTag = () => {},
}) => {
  const isDarkModeActive = useSelector(selectTheme)
  const filterTags = useSelector(selectFilterTags)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [hashtagsArray, setHashtagsArray] = useState(hashtags)
  const [inputHashValue, setInputHashValue] = useState('')
  const [isInputTextActive, setIsInputTextActive] = useState(false)
  const [hintValue, setHintValue] = useState('')
  const [inputTextPlaceholder, setInputTextPlaceholder] = useState('')
  const hashtagRef = useRef(null)
  const inputRef = useRef(null)
  const addButtonRef = useRef(null)
  const confirmButtonRef = useRef(null)
  const inputWrapper = useRef(null)
  const refElemToShowHint = useRef(null)
  const [fetchAddHashtag] = useFetching(async (value, userId, postId) => {
    await serverService
      .addHashtag(value, userId, postId)
      .then((res) => dispatch(updatePost(res.data.response)))
  })
  const [fetchDeleteHashtag] = useFetching(async (value, userId, postId) => {
    await serverService
      .deleteHashtag(value, userId, postId)
      .then((res) => dispatch(updatePost(res.data.response)))
  })

  useEffect(() => {
    setHashtagsArray(hashtags)
  }, [hashtags])

  function updateChange(event) {
    const value = event.target.value
    setInputTextPlaceholder(value)
  }

  const handleAddHashtag = (event) => {
    if (isInputTextActive) {
      inputRef.current.blur()
      setIsInputTextActive(false)
      setTimeout(() => {
        setInputHashValue('')
        setInputTextPlaceholder('')
      }, 300)

      return
    }
    setIsInputTextActive(true)
    inputRef.current.focus()
  }

  const handleConfirmHashtag = (event) => {
    const isInArray = hashtagsArray.includes(inputHashValue)

    if (isInArray) {
      setHintValue('This hashtag already exists')
      return
    }

    fetchAddHashtag(inputHashValue, user.userData.id, id)
    setHintValue('Hashtag successfully added')
    setInputHashValue('')
    setInputTextPlaceholder('')
    setIsInputTextActive(false)
  }

  const handleDeleteHashtag = (e, hashtag) => {
    fetchDeleteHashtag(hashtag, user.userData.id, id)
    clickOnDeleteTag(hashtag)
  }

  return (
    <div className={styles.container}>
      <div className={styles.hashPanel}>
        {hashtagsArray.map((hashtag) => {
          const isHashTagAdded = filterTags.includes(hashtag)

          return (
            <Transition
              key={hashtag}
              timeout={300}
              in={isHashTagAdded}
              nodeRef={hashtagRef}
            >
              {(state) => (
                <div
                  key={hashtag}
                  className={`${styles.hashtag} ${styles[`${state}Hashtag`]}`}
                  ref={hashtagRef}
                  style={{
                    border: `${getBorderClass(isDarkModeActive)}`,
                  }}
                >
                  <span
                    onClick={() => clickOnTag(hashtag)}
                    data-test-id={'hashtag'}
                  >
                    {hashtag}
                  </span>
                  <div
                    className={styles.deleteHashtag}
                    onClick={(e) => handleDeleteHashtag(e, hashtag)}
                  >
                    <PlusDelete
                      width={15}
                      height={15}
                      className={styles.test}
                    />
                  </div>
                </div>
              )}
            </Transition>
          )
        })}
        {hashtagsArray.length < 6 && (
          <div className={styles.addHashtag}>
            <Transition
              in={isInputTextActive}
              nodeRef={inputWrapper}
              timeout={300}
            >
              {(state) => (
                <div
                  className={`${styles.inputWrapper} ${
                    styles[`${state}InputWrapper`]
                  }`}
                  ref={inputWrapper}
                  style={{
                    borderBottom: `${getBorderClass(isDarkModeActive)}`,
                  }}
                >
                  <span className={styles.hashTagText}>
                    {inputTextPlaceholder}
                  </span>
                  <input
                    value={inputHashValue}
                    onChange={(e) => setInputHashValue(e.target.value)}
                    onInput={(e) => updateChange(e)}
                    ref={inputRef}
                  ></input>
                </div>
              )}
            </Transition>

            <Transition
              in={!!inputHashValue}
              timeout={300}
              nodeRef={addButtonRef}
            >
              {(state) => (
                <div
                  className={`${styles.addButtonWrapper} ${
                    styles[`${state}AddButtonWrapper`]
                  }`}
                  ref={addButtonRef}
                >
                  <PlusDelete
                    className={styles.addHashtagButton}
                    onClick={handleAddHashtag}
                  />
                </div>
              )}
            </Transition>
            <Transition
              in={!!inputHashValue}
              timeout={300}
              nodeRef={confirmButtonRef}
            >
              {(state) => (
                <div
                  className={`${styles.confirmButtonWrapper} ${
                    styles[`${state}ConfirmButtonWrapper`]
                  }`}
                  ref={confirmButtonRef}
                >
                  <Check
                    className={styles.confirmHashtagButton}
                    onClick={handleConfirmHashtag}
                    ref={refElemToShowHint}
                  />
                </div>
              )}
            </Transition>
          </div>
        )}
      </div>
      <Hint hintValue={hintValue} setHintValue={setHintValue} />
    </div>
  )
}

export default HashPanel
