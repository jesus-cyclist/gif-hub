import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import serverService from '@api/ServerService'
import CustomButton from '@components/UI/CustomButton/CustomButton'
import CustomInput from '@components/UI/CustomInput/CustomInput'
import Hint from '@components/UI/Hint/Hint'
import { CREATE_POST } from '@constants/post'
import { useFetching } from '@hooks/useFetching'
import { addNewPost } from '@services/reducers/user'
import { selectUser } from '@services/selectors'
import styles from './CreateNewPost.module.css'

const CreateNewPost = () => {
  const user = useSelector(selectUser)
  const [hintValue, setHintValue] = useState('')

  const dispatch = useDispatch()
  const [fetchAddNewPost] = useFetching(async (postName, userId) => {
    await serverService
      .addPost(postName, userId)
      .then((res) => dispatch(addNewPost(res.data.response)))
  })
  const [collectonName, setCollectonName] = useState('')

  const handleCreatePost = () => {
    const isPostTitleRepeated = user.posts.some(
      (post) => post.title === collectonName
    )
    if (isPostTitleRepeated) {
      setHintValue('This title already exists')
      return
    }
    if (!collectonName) {
      setHintValue('This field are empty')
      return
    }

    collectonName && fetchAddNewPost(collectonName, user.userData.id)
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Create a new gif collection</h2>
      <div className={styles.inputWrapper}>
        <CustomInput
          value={collectonName}
          onChange={(e) => setCollectonName(e.target.value)}
          placeholder={'Сollection name'}
          name={CREATE_POST}
          deleteValue={() => setCollectonName('')}
        />
      </div>
      <Hint hintValue={hintValue} setHintValue={setHintValue} />
      <CustomButton
        label={'Create'}
        alignment={'center'}
        onClick={handleCreatePost}
      />
    </div>
  )
}

export default CreateNewPost
