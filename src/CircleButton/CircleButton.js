import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types'

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props
  console.log(props);
  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps = {
  tag: 'a',
}

NavCircleButton.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
}