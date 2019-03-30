import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = () => ({
  input: {
    display: 'none'
  },
  previewImageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    marginBottom: '20px',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '4px'
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
  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        onChange={(e) => props.onFileChange(e)}
        id="contained-button-file"
        multiple
        type="file"
      />
      {props.imagePreviewUrl &&
        <div className={classes.previewImageWrapper}>
          <img src={props.imagePreviewUrl} className={classes.image} alt="logo" />
          <button className={classes.resetButton} onClick={props.onReset}>x</button>
        </div>
      }
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classNames(classes.button)}>
          Select Image
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </label>
    </div>
  )
}

ImageUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  imagePreviewUrl: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default withStyles(styles)(ImageUploader)

