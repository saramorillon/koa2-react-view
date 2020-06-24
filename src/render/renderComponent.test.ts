import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { toJestMock } from '../../mocks/toJestMock'
import { _require } from '../require'
import { renderComponent } from './renderComponent'

jest.mock('react')
jest.mock('react-dom/server')
jest.mock('../require')

describe('renderComponent', () => {
  beforeEach(jest.resetAllMocks)

  it('should render base component', () => {
    toJestMock(_require).mockReturnValue('<div>Hello</div>')
    renderComponent({ root: 'root', ext: 'jsx', filename: 'filename' })
    expect(React.createElement).toHaveBeenCalledTimes(1)
    expect(React.createElement).toHaveBeenCalledWith('<div>Hello</div>', undefined)
  })

  it('should render layout if layout is provided', () => {
    toJestMock(_require).mockReturnValueOnce('<div>Hello</div>')
    toJestMock(_require).mockReturnValueOnce('<div>Layout</div>')
    toJestMock(React.createElement).mockReturnValue('Component')
    renderComponent({ root: 'root', ext: 'jsx', filename: 'filename', layout: 'layout' })
    expect(React.createElement).toHaveBeenCalledTimes(2)
    expect(React.createElement).toHaveBeenCalledWith('<div>Hello</div>', undefined)
    expect(React.createElement).toHaveBeenCalledWith('<div>Layout</div>', undefined, 'Component')
  })

  it('should return component as HTML string', () => {
    toJestMock(React.createElement).mockReturnValue('Component')
    renderComponent({ root: 'root', ext: 'jsx', filename: 'filename' })
    expect(ReactDOMServer.renderToStaticMarkup).toHaveBeenCalledWith('Component')
  })
})
