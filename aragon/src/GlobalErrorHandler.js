import React from 'react'
import styled from 'styled-components'
import GenericError from './components/Error/GenericError'
import DAONotFoundError from './components/Error/DAONotFoundError'
import { DAONotFound } from './errors'

class GlobalErrorHandler extends React.Component {
  state = { error: null, errorStack: null }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorStack: errorInfo.componentStack
        .replace(/^\n+|\n+$/g, '')
        .replace(/^ {4}/gm, ''),
    })
  }
  render() {
    const { error, errorStack } = this.state
    if (!error) {
      return this.props.children
    }
    return (
      <Main>
        <In>
          {error instanceof DAONotFound ? (
            <DAONotFoundError dao={error.dao} />
          ) : (
            <GenericError
              detailsTitle={error.message}
              detailsContent={errorStack}
            />
          )}
        </In>
      </Main>
    )
  }
}

const Main = styled.div`
  height: 100vh;
  overflow: auto;
`

const In = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  padding: 50px 20px 20px;
  min-height: 100%;
`

export default GlobalErrorHandler
