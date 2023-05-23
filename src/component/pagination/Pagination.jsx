import React from 'react'
import PropTypes from 'prop-types'
import { Pagination as AntPagination } from 'antd'
import { PAGINATION_COMPONENT_CONFIG } from '../../_constants'
import clsx from 'clsx'
import './Pagination.scss'

const Pagination = ({
  className,
  defaultCurrent = PAGINATION_COMPONENT_CONFIG.DEFAULT_CURRENT,
  defaultPageSize = PAGINATION_COMPONENT_CONFIG.DEFAULT_PAGE_SIZE,
  ...remaining
}) => (
  <AntPagination
    {...{
      className: clsx('hullaballoo-pagination', className),
      ...remaining,
      showSizeChanger: false
    }}
  />
)

Pagination.propTypes = {
  current: PropTypes.number,
  onChange: PropTypes.func,
  total: PropTypes.number,
  showQuickJumper: PropTypes.bool,
  className: PropTypes.string
}

export default Pagination
