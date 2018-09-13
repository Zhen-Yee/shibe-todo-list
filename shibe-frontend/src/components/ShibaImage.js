import React from 'react'
import { Image, Modal, Button } from 'semantic-ui-react'

export const ShibaImage = props => (
  <Modal trigger={<Button basic color='green' onClick={props.onDone} disabled={props.isDisable}>Done</Button>}>
    <Modal.Header>Here's your shibe picture!</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='big' src={props.shibaImg} />
    </Modal.Content>
  </Modal>
)
