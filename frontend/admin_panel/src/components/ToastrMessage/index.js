import React from 'react'
import ReduxToastr from 'react-redux-toastr'

const ToastrMessage = (props) => (
  <ReduxToastr
    timeOut={4000}
    newestOnTop={false}
    preventDuplicates
    position="top-left"
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    progressBar
    closeOnToastrClick
  />
)

export default ToastrMessage
