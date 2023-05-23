import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ReactComponent as CheckIcon } from '../../../assets/image/icons/checkbox_check.svg'
import './Checkbox.scss'

const Checkbox = ({ className, disabled = false, label, checked, onClick }) => (
  <label
    onClick={onClick}
    className={clsx('hullaballoo-input__checkbox', className, {
      'hullaballoo-input__checkbox--disabled': disabled
    })}
  >
    <div className={clsx('hullaballoo-input__checkbox__symbol', { checked })}>
      <CheckIcon />
    </div>
    <span>{label}</span>
  </label>
)

Checkbox.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func
}

export default Checkbox
