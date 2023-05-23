import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // ref: https://github.com/testing-library/jest-dom
import QRCode from './QRCode'

describe('QRCode', () => {
  it('should render in harmony', () => {
    expect(() => {
      render(
        <QRCode
          {...{
            visible: true,
            point: 60
          }}
        />
      )
    }).not.toThrow()
  })
})
