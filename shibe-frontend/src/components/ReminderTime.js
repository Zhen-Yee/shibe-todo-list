import React from 'react'
import { Form, Modal, Button, Input } from 'semantic-ui-react'

export const ReminderTime = props => (
  <Modal trigger={<Button basic color='blue'>Reminder</Button>}>
    <Modal.Header>How long do you want to set your reminder?</Modal.Header>
    <Modal.Content>
      <Form onSubmit={props.submit}>
          <Form.Group inline>
            <Input type="number" min="0" max="12" id="hours" value={props.hours} onInput={props.onTime}/>hours
            <Input type="number" min="0" max="59" id="minutes" value={props.minutes} onInput={props.onTime}/>minutes
          </Form.Group>
          <Button type="submit">Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
)
