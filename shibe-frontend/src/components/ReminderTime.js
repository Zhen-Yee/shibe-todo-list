import React from 'react'
import { Form, Modal, Button, Radio, Input } from 'semantic-ui-react'

export const ReminderTime = props => (
  <Modal trigger={<Button basic color='blue'>Reminder</Button>}>
    <Modal.Header>How long do you want to set your reminder?</Modal.Header>
    <Modal.Content>
      <Form>
          <Form.Group inline>
            <Form.Input type="number" min="0" max="6"/>hours
            <Input type="number" min="0" max="59"/> minutes
          </Form.Group>
          <Button type="submit">Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
)
