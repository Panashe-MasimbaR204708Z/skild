import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

export const Route = createFileRoute('/skills')({ component: Skills })

function Skills() {
  return (
    <section id='skills-page'>
      <div className='intro'>
        <header>
          <h1>Skill registry</h1>
          <p>
            The live registry is not connected yet. The cards on the home page
            are illustrative samples, not published skills.
          </p>
        </header>
        <Link to='/skills/new' className='btn-primary'>
          Publish a skill
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className='results'>
        <p>No live skills are available yet.</p>
      </div>
    </section>
  )
}
