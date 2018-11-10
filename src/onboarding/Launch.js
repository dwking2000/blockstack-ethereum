import React from 'react'
import styled from 'styled-components'
import { theme, Text, Button } from '@aragon/ui'
import { lerp } from '../math-utils'

class Launch extends React.Component {
  static defaultProps = {
    positionProgress: 0,
  }
  render() {
    const { positionProgress, onConfirm } = this.props
    return (
      <Main
        style={{
          opacity: 1 - Math.abs(positionProgress),
          transform: `translateX(${lerp(positionProgress, 0, 50)}%)`,
        }}
      >
        <LaunchContent onConfirm={onConfirm} />
      </Main>
    )
  }
}

class LaunchContent extends React.PureComponent {
  render() {
    return (
      <Content>
        <Title>
          <Text size="great" weight="bold" color={theme.textDimmed}>
            All done! Your decentralized organization is ready.
          </Text>
        </Title>
        <StyledButton mode="strong" onClick={this.props.onConfirm}>
          Get Started
        </StyledButton>
      </Content>
    )
  }
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 100px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 37px;
  text-align: center;
  margin: 0 12% 40px;
`

const StyledButton = styled(Button)`
  width: 170px;
`

export default Launch
