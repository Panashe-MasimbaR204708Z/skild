import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { PostHogErrorBoundary, PostHogProvider, usePostHog } from '@posthog/react'
import { useUser } from '@clerk/tanstack-react-start'
import { useEffect, useRef } from 'react'
import Crosshair from '#/components/Crosshair'
import Navbar from '#/components/Navbar'
import ClerkProvider from '../integrations/clerk/provider'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

const posthogToken = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

if (!posthogToken && import.meta.env.DEV && typeof window !== 'undefined') {
  console.error(
    'VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is configured',
  )
}

if (!posthogHost && import.meta.env.DEV && typeof window !== 'undefined') {
  console.error(
    'VITE_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_HOST is configured',
  )
}

function PostHogIdentity() {
  const { isLoaded, user } = useUser()
  const posthog = usePostHog()
  const previousUserId = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    if (!isLoaded || !posthog) return

    const userId = user?.id ?? null
    if (userId === previousUserId.current) return

    if (userId) {
      if (previousUserId.current) {
        posthog.reset()
      }

      posthog.identify(userId, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName ?? undefined,
      })
    } else if (previousUserId.current) {
      posthog.reset()
    }

    previousUserId.current = userId
  }, [isLoaded, posthog, user])

  return null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Skild - The registry for agentic intelligence',
      },
      {
        name: 'description',
        content: 'Discover, publish, and operate reusable agent capabilities from a route-driven workspace.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const app = (
    <ClerkProvider>
      {posthogToken ? <PostHogIdentity /> : null}
      <div className="root-layout" id="root-layout">
        <header>
          <div className='frame'>
            <Navbar />
            <Crosshair/>
            <Crosshair/>
          </div>
        </header>

        <main>
          <div className='frame'>
            {children}
          </div>
        </main>
      </div>

      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </ClerkProvider>
  )

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap=anywhere">
        {posthogToken ? (
          <PostHogProvider
            apiKey={posthogToken}
            options={{
              api_host: posthogHost,
              capture_exceptions: true,
              debug: import.meta.env.DEV,
              logs: {
                serviceName: 'skild-web',
                environment: import.meta.env.MODE,
              },
            }}
          >
            <PostHogErrorBoundary
              fallback={<p role="alert">Something went wrong. Please try again.</p>}
            >
              {app}
            </PostHogErrorBoundary>
          </PostHogProvider>
        ) : (
          app
        )}
        <Scripts />
      </body>
    </html>
  )
}
