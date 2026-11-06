import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/skills/new')({ component: NewSkill })

function NewSkill() {
  return (
    <section id='new-skill'>
      <Link to='/skills' className='back'>
        <ArrowLeft size={16} />
        <span>Back to registry</span>
      </Link>
      <div className='intro'>
        <h1>Publish a skill</h1>
        <p>Skill publishing is not available yet.</p>
      </div>
      <div className='card'>
        <p>
          The registry is not connected to a publishing service, so no skill
          will be submitted from this page.
        </p>
      </div>
    </section>
  )
}
