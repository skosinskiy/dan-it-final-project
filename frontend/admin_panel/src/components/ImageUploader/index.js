import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone';
import classNames from 'classnames'

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import {withStyles} from '@material-ui/core/styles'

const styles = (theme) => ({
  input: {
    display: 'none'
  },
  image: {
    width: 200,
    height: 120,
    marginBottom: '20px',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '4px'
  },
  dropzone: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  },
  uploadIcon: {
    color: 'black',
    margin: '0 10px'
  },
  previewImageWrapper: {
    position: 'relative',
    marginRight: 20
  },
  resetButton: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '20px',
    height: '20px',
    padding: '0px',
    borderRadius: '50%',
    border: 'none',
    outline: 'none',
    transform: 'translate(50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageList: {
    width: '100%',
    padding: 0,
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap'
  },
  mainImage: {
    borderColor: 'blue',
  }
})

const ImageUploader = (props) => {
  const {images, classes, onReset, onFileChange, onMainPhotoSelect, multiple} = props
  const uploadedImages = images && images.length > 0 && images.imageUrl !== null ? images.map((image, index) => {
    return (
      <li key={`image-${index}`} className={classes.previewImageWrapper}>
        <img  src={image.imageUrl}
              className={classNames(classes.image, image.isMainImage && classes.mainImage)}
              onClick={() => onMainPhotoSelect(image)}
              alt="logo" />
        <button className={classes.resetButton} onClick={() => onReset(image)}>
          <CloseIcon/>
        </button>
      </li>
    )
  }) : null


  return (
    <Dropzone
      multiple={multiple}
      onDrop={onFileChange}>
      {({getRootProps, getInputProps}) => (
        <section className="container">
          <div {...getRootProps({className: classes.dropzone})}>
            <input accept='image/*' {...getInputProps()} />
            <p>
              <CloudUploadIcon className={classes.uploadIcon} />
              Drag n drop some files here, or click to select files
            </p>
          </div>
          { uploadedImages && <ul className={classes.imageList}>{uploadedImages}</ul> }
        </section>
      )}
    </Dropzone>
  )
}

ImageUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.any) ,
  onFileChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onMainPhotoSelect: PropTypes.func
}

export default withStyles(styles)(ImageUploader)
