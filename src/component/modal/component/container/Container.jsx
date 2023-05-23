import React, { useMemo } from 'react'
import { Modal } from 'reactstrap'
import { ReactComponent as CloseIcon } from '../../../../assets/image/icons/close_icon.svg'
import { Bars } from '../../../loading'
import clsx from 'clsx'
import './Container.scss'

const FullLoading = () => (
  <div className="hullaballoo-modal__full-loading">
    <Bars />
  </div>
)

const Container = ({
  titleNode,
  contentNode,
  beforeTitleNode,
  afterContentNode,
  actionsNode,
  className,
  isShowCloseIcon = true,
  isLoading = false,
  onCloseIconClick = () => {},
  ...remaining
}) => {
  const nodesConfig = useMemo(
    () => [
      { node: beforeTitleNode, className: 'before-title' },
      { node: titleNode, className: 'title' },
      { node: contentNode, className: 'content' },
      { node: afterContentNode, className: 'after-content' }
    ],
    [beforeTitleNode, titleNode, contentNode, afterContentNode]
  )

  return (
    <Modal
      {...{
        className: clsx('hullaballoo-modal', className),
        fade: remaining.isOpen,
        modalClassName: 'hullaballoo-modal__outer-container',
        ...remaining
      }}
    >
      <div className="hullaballoo-modal__container">
        {isShowCloseIcon && (
          <CloseIcon
            onClick={onCloseIconClick}
            className="hullaballoo-modal__container__close"
          />
        )}

        {nodesConfig.map((item, index) =>
          item.node ? (
            <div className={`hullaballoo-modal__${item.className}`} key={index}>
              {item.node}
            </div>
          ) : null
        )}

        {actionsNode && actionsNode.length > 0 && (
          <div
            className={clsx(
              'hullaballoo-modal__actions',
              `hullaballoo-modal__actions--count-${actionsNode.length}`
            )}
          >
            {actionsNode}
          </div>
        )}
      </div>
      {isLoading && <FullLoading />}
    </Modal>
  )
}

export default Container
