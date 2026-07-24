import { Page } from '@elk/components'
import { Header } from '@elk/components'
import { Text } from '@elk/components'
import { Center } from '@elk/components'
import { Stack } from '@elk/components'
import { Button } from '@elk/components'
import { Icon } from '@elk/components'
import { Card } from '@elk/components'
import { Badge } from '@elk/components'
import { useState } from '@elk/components'
import { Divider } from '@elk/components'
import { Code } from '@elk/components/icons'
import { Layers } from '@elk/components/icons'
import { Zap } from '@elk/components/icons'
import { Layout } from '@elk/components/icons'

function FeatureCard({ icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <Card
      padding="md"
      radius="lg"
      backgroundColor="rgba(255,255,255,0.04)"
      borderColor="rgba(255,255,255,0.08)"
      body={() => (
        <Stack direction="column" gap=".75rem" child={() => (
          <>
            <Icon icon={icon} size="lg" color="#60a5fa" />
            <Text text={title} type="h3" size="1rem" color="#f0f0f0" style={{ fontWeight: 600 }} />
            <Text text={description} type="p" size=".85rem" color="rgba(255,255,255,0.5)" />
          </>
        )} />
      )}
    />
  )
}

function CounterDemo() {
  const { value: count, set: setCount } = useState(0)

  return (
    <Card
      padding="lg"
      radius="lg"
      backgroundColor="rgba(255,255,255,0.03)"
      borderColor="rgba(96,165,250,0.2)"
      shadow
      body={() => (
        <Stack direction="column" gap="1rem" align="center" child={() => (
          <>
            <Text text="Interactive Demo" type="h3" size="1.1rem" color="#60a5fa" style={{ fontWeight: 600 }} />
            <Text text={`${count}`} type="h1" size="3rem" color="#fff" style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }} />
            <Stack direction="row" gap=".75rem" child={() => (
              <>
                <Button
                  borderRadius=".5rem"
                  padding=".5rem 1.5rem"
                  border="1px solid rgba(255,255,255,0.15)"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  child={() => <Text text="-" type="p" size="1.2rem" color="#fff" />}
                  gest={{ onClick: () => setCount((c: number) => c - 1) }}
                />
                <Button
                  borderRadius=".5rem"
                  padding=".5rem 1.5rem"
                  border="1px solid #2563eb"
                  style={{ backgroundColor: '#3b82f6' }}
                  child={() => <Text text="+" type="p" size="1.2rem" color="#fff" />}
                  gest={{ onClick: () => setCount((c: number) => c + 1) }}
                />
              </>
            )} />
          </>
        )} />
      )}
    />
  )
}

export default function App() {
  return (
    <Page
      header={() => (
        <Header
          title={() => (
            <Stack direction="row" gap=".5rem" align="center" child={() => (
              <>
                <Icon icon={Layers} size="sm" color="#60a5fa" />
                <Text text="Components" type="h2" size="1rem" color="#fff" style={{ fontWeight: 600 }} />
              </>
            )} />
          )}
          action={() => (
            <Badge text="v1.0.0" size="sm" color="#60a5fa" backgroundColor="rgba(96,165,250,0.15)" />
          )}
        />
      )}
      body={() => (
        <Stack direction="column" gap="2.5rem" padding="0 0 4rem" child={() => (
          <>
            <Center child={() => (
              <Stack direction="column" gap="1rem" align="center" style={{ padding: '3rem 1.5rem 0', maxWidth: '800px', width: '100%' } as React.CSSProperties} child={() => (
                <>
                  <Stack direction="row" gap=".5rem" align="center" child={() => (
                    <>
                      <Icon icon={Zap} size="lg" color="#fbbf24" />
                      <Text text="Built with React" type="p" size=".8rem" color="#fbbf24" style={{ fontWeight: 500 }} />
                    </>
                  )} />
                  <Text
                    text="A lightweight component framework for building modern web apps"
                    type="h1"
                    size="2.5rem"
                    color="#fff"
                    style={{ fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}
                  />
                  <Text
                    text="Class-based architecture. Render props. Auto-imports. Zero config."
                    type="p"
                    size="1.05rem"
                    color="rgba(255,255,255,0.5)"
                    style={{ textAlign: 'center', maxWidth: '500px' }}
                  />
                  <Stack direction="row" gap=".75rem" padding="1rem 0 0" child={() => (
                    <>
                      <Button
                        borderRadius=".5rem"
                        padding=".7rem 2rem"
                        border="1px solid #2563eb"
                        style={{ backgroundColor: '#3b82f6' }}
                        child={() => <Text text="Get Started" type="p" size=".9rem" color="#fff" style={{ fontWeight: 500 }} />}
                        gest={{ onClick: () => window.open('https://github.com', '_blank') }}
                      />
                      <Button
                        borderRadius=".5rem"
                        padding=".7rem 2rem"
                        border="1px solid rgba(255,255,255,0.12)"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                        child={() => (
                          <Stack direction="row" gap=".4rem" align="center" child={() => (
                            <>
                              <Icon icon={Code} size="sm" color="rgba(255,255,255,0.7)" />
                              <Text text="npm create components" type="p" size=".85rem" color="rgba(255,255,255,0.8)" />
                            </>
                          )} />
                        )}
                        gest={{ onClick: () => navigator.clipboard.writeText('npm create components@latest') }}
                      />
                    </>
                  )} />
                </>
              )} />
            )} />

            <Stack direction="column" gap="2rem" style={{ maxWidth: '800px', width: '100%', padding: '0 1.5rem', margin: '0 auto' } as React.CSSProperties} child={() => (
              <>
                <Divider />
                <Text text="Why Components?" type="h2" size="1.5rem" color="#fff" style={{ fontWeight: 600, textAlign: 'center' }} />
                <Stack direction="row" gap="1rem" wrap child={() => (
                  <>
                    <Stack direction="column" style={{ width: 'calc(50% - .5rem)' } as React.CSSProperties} child={() => (
                      <FeatureCard icon={Code} title="Class + Wrapper" description="Each component uses a class for logic and a wrapper for rendering. Clean, testable, reusable." />
                    )} />
                    <Stack direction="column" style={{ width: 'calc(50% - .5rem)' } as React.CSSProperties} child={() => (
                      <FeatureCard icon={Zap} title="Auto-Import" description="Use any component without importing. The Vite plugin adds imports at build time." />
                    )} />
                    <Stack direction="column" style={{ width: 'calc(50% - .5rem)' } as React.CSSProperties} child={() => (
                      <FeatureCard icon={Layers} title="205+ Icons" description="Built-in SVG icon library with stroke-based rendering. Size, color, className props." />
                    )} />
                    <Stack direction="column" style={{ width: 'calc(50% - .5rem)' } as React.CSSProperties} child={() => (
                      <FeatureCard icon={Layout} title="Built-in Hooks" description="createStore, useState, useRef, useEffect and more. State management included." />
                    )} />
                  </>
                )} />
              </>
            )} />

            <Stack direction="column" style={{ maxWidth: '400px', width: '100%', padding: '1rem 1.5rem', margin: '0 auto' } as React.CSSProperties} child={() => (
              <CounterDemo />
            )} />
          </>
        )} />
      )}
    />
  )
}
