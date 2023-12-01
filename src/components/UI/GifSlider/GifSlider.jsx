import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Keyboard, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import serverService from '@api/ServerService'
import { ReactComponent as Copy } from '@assets/svg/copied-icon.svg'
import { ReactComponent as Delete } from '@assets/svg/trash.svg'
import { useFetching } from '@hooks/useFetching'
import { updatePost } from '@services/reducers/user'
import { selectUser } from '@services/selectors'
import './GifSlider.css'
import styles from './GifSlider.module.css'

const GifSlider = ({ post }) => {
  const { gifs, _id } = post
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [fetchDeleteGif] = useFetching(async (gif, userId, postId) => {
    await serverService
      .deleteGif(gif, userId, postId)
      .then((res) => dispatch(updatePost(res.data.response)))
  })

  const handleDeleteGif = (event, gif) => {
    fetchDeleteGif(gif, user.userData.id, _id)
  }

  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
      >
        {gifs.map((gif) => (
          <SwiperSlide key={gif.title}>
            <div className={styles.gifContainer}>
              <img
                className={styles.gif}
                src={gif.images.original.url}
                alt={gif.title}
              />
              <div className={styles.controlPanel}>
                <div
                  className={styles.copyButton}
                  onClick={() =>
                    navigator.clipboard.writeText(gif.images.original.url)
                  }
                >
                  <Copy width={25} height={25} />
                </div>
                <div
                  className={styles.deleteButton}
                  onClick={(e) => handleDeleteGif(e, gif)}
                >
                  <Delete width={25} height={25} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default GifSlider
