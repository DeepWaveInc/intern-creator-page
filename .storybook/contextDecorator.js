import React from 'react'
import { makeDecorator } from '@storybook/addons'
import { Provider } from 'react-redux'
import { store } from '../src/_helpers'
import { MemoryRouter, Route, Routes } from 'react-router'

const ContextDecorator = makeDecorator({
  name: 'withContext',
  parameterName: 'context',
  wrapper: (Story, context, settings) => {
    const { parameters = {} } = settings

    return (
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[parameters.initialRoute ?? '/fake-route']}
        >
          <Routes>
            <Route
              element={Story(context)}
              path={parameters.initialRoute ?? '/fake-route'}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }
})

export default ContextDecorator
