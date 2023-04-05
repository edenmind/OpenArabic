import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Pagination from '@mui/lab/Pagination'

export default function StandardImageList(props) {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = React.useState(1)
  const imagesPerPage = 9

  const setImage = (img) => dispatch({ type: 'SET_IMAGE', image: img })

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = props.images.slice(indexOfFirstImage, indexOfLastImage)

  return (
    <div>
      <ImageList sx={{ width: 700, height: 700 }} cols={3} rowHeight={164}>
        {currentImages.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                  <AddIcon />
                </IconButton>
              }
              onClick={() => setImage(item.img)}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Pagination
        count={Math.ceil(props.images.length / imagesPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        sx={{ mt: 2 }}
      />
    </div>
  )
}

StandardImageList.propTypes = {
  images: PropTypes.any.isRequired
}
