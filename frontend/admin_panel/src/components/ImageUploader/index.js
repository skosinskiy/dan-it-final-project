import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Dropzone from 'react-dropzone';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = () => ({
  input: {
    display: 'none'
  },
  image: {
    width: '100%',
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
  },
  resetButton: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    border: 'none',
    outline: 'none',
    transform: 'translate(50%, -50%)'
  }
})

const ImageUploader = (props) => {
  const {classes} = props
  const uploadedImages = props.images && props.images.length > 0 ? props.images.map((image, index) => {
    return (
      <div key={`image-${index}`} className={classes.previewImageWrapper}>
        <img src={image.preview} className={classes.image} alt="logo" />
        <button className={classes.resetButton} onClick={(image) => props.onReset(image)}>x</button>
      </div>
    )
  }) : null


  return (
    <Dropzone onDrop={props.onFileChange}>
      {({getRootProps, getInputProps}) => (
        <section className="container">
          <div {...getRootProps({className: classes.dropzone})}>
            <input accept='image/*' {...getInputProps()} />
            <p>
            <CloudUploadIcon className={classes.uploadIcon} />
              Drag n drop some files here, or click to select files
            </p>
          </div>
          <aside>
            <h4>Images</h4>
            <ul>{uploadedImages}</ul>
          </aside>
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
  onReset: PropTypes.func.isRequired
}

export default withStyles(styles)(ImageUploader)

