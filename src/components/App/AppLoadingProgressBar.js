import React from 'react'
import styled from 'styled-components'
import ContainerDimensions from 'react-container-dimensions'
import { spring, Motion } from 'react-motion'
import { theme, spring as springConf } from '@aragon/ui'

const { accent } = theme

const AppLoadingProgressBar = ({ hide, percent, ...props }) => (
  <Motion
    defaultStyle={{ opacity: 0, percentProgress: 0 }}
    style={{
      opacity: spring(Number(!hide), springConf('fast')),
      percentProgress: spring(percent, springConf('fast')),
    }}
  >
    {({ opacity, percentProgress }) => (
      <ContainerDimensions>
        {({ width }) => (
          <StyledProgressBar
            style={{
              opacity: opacity,
              width: `${(width * percentProgress) / 100}px`,
            }}
            {...props}
          >
            <StyledProgressPeg />
          </StyledProgressBar>
        )}
      </ContainerDimensions>
    )}
  </Motion>
)

// Mimic nprogress with our own accent colour
const StyledProgressBar = styled.div`
  position: absolute;
  top: 0;
  height: 2px;
  background-color: ${accent};
`

const StyledProgressPeg = styled.div`
  position: absolute;
  right: 0;
  height: 2px;
  width: 20px;
  background-color: ${accent};
  box-shadow: 0 0 10px ${accent}, 0 0 5px ${accent};
  transform: rotate(10deg) translate(0px, -2px);
`

export default AppLoadingProgressBar
