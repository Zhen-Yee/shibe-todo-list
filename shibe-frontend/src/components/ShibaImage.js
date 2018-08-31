import React from 'react'
import { Image, Modal, Checkbox } from 'semantic-ui-react'

export const ShibaImage = props => (
  <Modal trigger={<Checkbox onChange={props.onCheck} disabled={props.isDisable}></Checkbox>}>
    <Modal.Header>Here's your shibe picture!</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='big' src={props.shibaImg} />
    </Modal.Content>
  </Modal>
)
