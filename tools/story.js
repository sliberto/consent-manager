import React, {Fragment} from 'react'
import {storiesOf} from '@storybook/react'
import {Pane, Button, Heading, Ul, Li, Code, Checkbox} from 'evergreen-ui'
import {injectGlobal} from 'emotion'
import {ConsentManagerBuilder, ConsentManager} from '../src'

injectGlobal(`
  body {
    margin: 0;
  }
`)

function Section(props) {
  return <Pane is="section" marginBottom={24} {...props} />
}

storiesOf('ConsentManagerBuilder', module).add(`example`, () => (
  <ConsentManagerBuilder
    writeKey="uA7UpbCh8Z0Ybodlnf4rJ6vLa85WrJfe"
    otherWriteKeys={['SeTHUkkIadsYUTWhMI3tkGu01XKogPHn']}
  >
    {({
      destinations,
      newDestinations,
      preferences,
      setPreferences,
      saveConsent,
    }) => {
      function handleSubmit(e) {
        e.preventDefault()
        saveConsent()
      }

      return (
        <form onSubmit={handleSubmit}>
          <Section>
            <Heading>All destinations</Heading>
            <Ul>
              {destinations.map(destination => (
                <Li key={destination.id}>
                  <Checkbox
                    label={destination.name}
                    checked={Boolean(preferences[destination.id])}
                    onChange={() =>
                      setPreferences({
                        [destination.id]: !preferences[destination.id],
                      })
                    }
                  />
                </Li>
              ))}
            </Ul>
          </Section>

          <Section>
            <Heading>New destinations</Heading>
            <Ul>
              {newDestinations.map(destination => (
                <Li key={destination.id}>{destination.name}</Li>
              ))}
            </Ul>
          </Section>

          <Section>
            <Heading>Preferences</Heading>
            <Code>{JSON.stringify(preferences)}</Code>
          </Section>

          <Button type="submit" marginRight={8}>
            Save
          </Button>

          <Button
            type="button"
            onClick={() => saveConsent(true)}
            marginRight={8}
          >
            Allow all
          </Button>

          <Button type="button" onClick={() => saveConsent(false)}>
            Deny all
          </Button>
        </form>
      )
    }}
  </ConsentManagerBuilder>
))

storiesOf('ConsentManager', module).add(`example`, () => (
  <Fragment>
    <ConsentManager
      writeKey="uA7UpbCh8Z0Ybodlnf4rJ6vLa85WrJfe"
      otherWriteKeys={['SeTHUkkIadsYUTWhMI3tkGu01XKogPHn']}
    />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
      dignissimos porro omnis illo iusto non, unde veniam praesentium ut. Veniam
      quidem odio nisi possimus minus quae ipsa rem voluptates consequatur.
    </p>
  </Fragment>
))
