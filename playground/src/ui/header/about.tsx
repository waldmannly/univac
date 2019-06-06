import * as React from 'react'
import { Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
export class About extends AbstractComponent {

  render() {
    return (
      <Segment>
        <h3>About</h3>
        <p>Welcome to Univac Playground, a place to generate and visualize common programming languages Abstract Syntax Trees.</p>
        <p>TODO</p>
      </Segment>
    )
  }
}