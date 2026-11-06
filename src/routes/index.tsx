import { createFileRoute, Link } from '@tanstack/react-router'
import { Terminal } from 'lucide-react'
import SkillCard from '#/components/SkillCard'

const skillFeed: SkillRecord[] = [
  {
    id: 'skill-1',
    title: 'Research Brief Generator',
    description:
      'Turns a vague prompt into a structured research brief with goals, sources, and citations.',
    category: 'research',
    tags: ['analysis', 'writing', 'citation'],
    installCommand: 'skild install research-brief-generator',
    createdAt: '2026-11-01T10:30:00.000Z',
    authorClerkId: 'user_123',
    authorEmail: 'alex@example.com',
  },
  {
    id: 'skill-2',
    title: 'Bug Triage Assistant',
    description:
      'Classifies bug reports, finds likely root causes, and proposes a safe fix plan.',
    category: 'engineering',
    tags: ['debugging', 'triage', 'qa'],
    installCommand: 'skild install bug-triage-assistant',
    createdAt: '2026-11-02T09:00:00.000Z',
    authorClerkId: 'user_456',
    authorEmail: 'maya@example.com',
  },
  {
    id: 'skill-3',
    title: 'Product Launch Copy',
    description:
      'Drafts launch messaging, positioning, and release notes tailored to a product audience.',
    category: 'marketing',
    tags: ['copywriting', 'launch', 'brand'],
    installCommand: 'skild install product-launch-copy',
    createdAt: '2026-11-03T14:15:00.000Z',
    authorClerkId: 'user_789',
    authorEmail: 'simon@example.com',
  },
  {
    id: 'skill-4',
    title: 'Customer Onboarding Flow',
    description:
      'Creates onboarding checklists, welcome sequences, and first-run UX recommendations.',
    category: 'operations',
    tags: ['onboarding', 'ux', 'automation'],
    installCommand: 'skild install customer-onboarding-flow',
    createdAt: '2026-11-04T08:45:00.000Z',
    authorClerkId: 'user_101',
    authorEmail: 'nina@example.com',
  },
  {
    id: 'skill-5',
    title: 'Architecture Review Planner',
    description:
      'Summarizes system trade-offs, risks, and design recommendations before major decisions.',
    category: 'architecture',
    tags: ['design', 'risk', 'system'],
    installCommand: 'skild install architecture-review-planner',
    createdAt: '2026-11-04T17:20:00.000Z',
    authorClerkId: 'user_202',
    authorEmail: 'leo@example.com',
  },
]

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div id='home'>
      <section className='hero'>
        <div className='copy'>
          <h1>
            The Registry for <br />
            <span className='text-gradient'>Agentic Intelligence</span>
          </h1>
          <p>
            A high-performance registry for procedural agent skills. Discover,
            publish, and operate reusable agent capabilities from a route-driven
            workspace.
          </p>
        </div>

        <div>
          <Link to='/skills' className='btn-primary'>
            <Terminal size={18} />
            <span>Browse Registry</span>
          </Link>
          <Link to='/skills/new' className='btn-secondary'>
            <Terminal size={18} />
            <span>Publish Skill</span>
          </Link>
        </div>
      </section>

      <section className='latest'>
        <div className='space-y-2'>
          <h2>
            Recently created <span className='text-gradient'>Skills</span>
          </h2>
          <p>
            Sample cards and install commands only. These are illustrative
            examples, not live records or executable commands.
          </p>
        </div>

        <div className='skills-grid'>
          {[...skillFeed]
            .sort(
              (first, second) =>
                Date.parse(second.createdAt) - Date.parse(first.createdAt),
            )
            .map((skill) => (
              <SkillCard
                key={skill.id}
                {...skill}
                tags={[...skill.tags]}
              />
            ))}
        </div>
      </section>
    </div>
  )
}
