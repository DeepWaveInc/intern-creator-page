import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import './Single.scss'
import { ReactComponent as DropDownArrow } from '../../../assets/image/dropdown-arrow.svg'
import { ReactComponent as DropDownSearch } from '../../../assets/image/dropdown-search.svg'
import clsx from 'clsx'

const { Option } = Select

const SuffixIcon = ({ type }) => {
  switch (type) {
    case 'search':
      return <DropDownSearch />
    default:
      return <DropDownArrow />
  }
}

const SingleDropdown = ({
  options = [],
  onChange = () => {},
  defaultValue,
  disabled,
  className,
  popupClassName = 'hullaballoo-dropdown__inner',
  showSearch,
  textStyle = false,
  suffixIcon = <SuffixIcon {...{ type: showSearch ? 'search' : '' }} />,
  ...remaining
}) => {
  return (
    <Select
      {...{
        onChange,
        defaultValue,
        disabled,
        popupClassName,
        className: clsx('hullaballoo-dropdown', className, {
          'hullaballoo-dropdown--text': textStyle
        }),
        suffixIcon,
        showSearch,
        dropdownMatchSelectWidth: false,
        ...remaining
      }}
    >
      {options.map((option, index) => (
        <Option key={index} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  )
}

SingleDropdown.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  popupClassName: PropTypes.string,
  showSearch: PropTypes.bool,
  suffixIcon: PropTypes.element
}

export default SingleDropdown
