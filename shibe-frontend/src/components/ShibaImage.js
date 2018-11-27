import React from 'react'
import { Image, Modal, Button, Segment, Dimmer, Loader } from 'semantic-ui-react'

export const ShibaImage = props => ( 
    <Modal trigger={<Button basic color='green' onClick={props.onDone} disabled={props.isDisable}>Done</Button>}>
    <Dimmer active={props.isLoading}>
      <Loader />
    </Dimmer>
      <Modal.Header>Here's your shibe picture!</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='big' src={props.shibaImg} />
      </Modal.Content>
    </Modal>
)
