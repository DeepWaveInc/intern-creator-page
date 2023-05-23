import React, { useRef, useCallback, memo } from 'react'
import clsx from 'clsx'
import './List.scss'

const List = ({ tracks, activeTrackId = 1, handleSetActiveTrack }) => {
  const containerRef = useRef(null)

  const handleScrollTo = (element) => {
    const containerClientRectLeft =
      containerRef.current.getBoundingClientRect().left
    const elementOffsetLeft = element.offsetLeft - containerClientRectLeft
    containerRef.current.scrollTo({
      left: elementOffsetLeft,
      behavior: 'smooth'
    })
  }

  const handleClick = useCallback(
    ({ id, element }) => {
      handleSetActiveTrack(id)
      handleScrollTo(element)
    },
    [handleSetActiveTrack]
  )

  return (
    <div className="list">
      <ul ref={containerRef}>
        {tracks.map((item) => (
          <li
            className={clsx({ active: item.id === activeTrackId })}
            key={item.id}
            onClick={(e) => handleClick({ id: item.id, element: e.target })}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(List)
