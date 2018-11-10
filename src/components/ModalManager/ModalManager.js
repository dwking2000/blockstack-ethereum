import React from 'react'
import styled from 'styled-components'
import { Transition, animated } from 'react-spring'
import { springs } from '@aragon/ui'

const ModalContext = React.createContext({
  modalComponent: null,
  modalComponentProps: {},
  showModal: null,
  hideModal: null,
})

class ModalProvider extends React.Component {
  state = { modalComponent: null, modalComponentProps: {} }

  showModal = (modalComponent, modalComponentProps = {}) => {
    this.setState({ modalComponent, modalComponentProps })
  }

  hideModal = () => {
    this.setState({ modalComponent: null, modalComponentProps: {} })
  }

  render() {
    return (
      <ModalContext.Provider
        value={{
          ...this.state,
          showModal: this.showModal,
          hideModal: this.hideModal,
        }}
      >
        {this.props.children}
        <ModalView />
      </ModalContext.Provider>
    )
  }
}

const ModalConsumer = ModalContext.Consumer

const ModalView = () => (
  <ModalConsumer>
    {({ modalComponent: ModalComponent, modalComponentProps, hideModal }) => (
      <Transition
        blocking={!!ModalComponent}
        native
        from={{ opacity: 0, enterProgress: 0 }}
        enter={{ opacity: 1, enterProgress: 1 }}
        leave={{ opacity: 0, enterProgress: 1 }}
        config={springs.lazy}
      >
        {ModalComponent &&
          (({ opacity, enterProgress, blocking }) => (
            <Wrap style={{ pointerEvents: blocking ? 'auto' : 'none' }}>
              <Overlay style={{ opacity: opacity.interpolate(v => v * 0.5) }} />
              <AnimatedWrap
                style={{
                  opacity,
                  transform: enterProgress.interpolate(
                    v => `
                      translate3d(0, ${(1 - v) * 10}px, 0)
                      scale3d(${1 - (1 - v) * 0.03}, ${1 - (1 - v) * 0.03}, 1)
                    `
                  ),
                }}
              >
                <ModalComponent onHide={hideModal} {...modalComponentProps} />
              </AnimatedWrap>
            </Wrap>
          ))}
      </Transition>
    )}
  </ModalConsumer>
)

const Overlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(59, 59, 59);
`

const Wrap = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`

const AnimatedWrap = styled(animated.div)`
  position: relative;
  min-height: 0;
`

export { ModalProvider, ModalConsumer, ModalView }
