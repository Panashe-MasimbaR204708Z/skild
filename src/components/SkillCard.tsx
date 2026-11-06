import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowBigUp,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  MessageSquare,
} from 'lucide-react'

const SkillCard = ({
  authorEmail,
  category,
  commentCount,
  createdAt,
  description,
  installCommand,
  upvoteCount,
  title,
}: SkillRecord) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  )
  const copyStatusTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (copyStatusTimer.current) {
        clearTimeout(copyStatusTimer.current)
      }
    },
    [],
  )

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopyStatus('copied')
      if (copyStatusTimer.current) {
        clearTimeout(copyStatusTimer.current)
      }
      copyStatusTimer.current = setTimeout(() => {
        setCopyStatus('idle')
      }, 1500)
    } catch (error) {
      console.error('Failed to copy install command:', error)
      setCopyStatus('error')
    }
  }

  return (
    <article className='skill-card'>
      <Link
        to='/skills'
        tabIndex={-1}
        aria-label={`Browse ${title} in the registry`}
        className='overlay'
      />

      <div className='chrome'>
        <div className='chrome-bar'>
          <div className='lights'>
            <div className='light red' />
            <div className='light amber' />
            <div className='light green' />
          </div>
        </div>
      </div>

      <div className='body'>
        <div className='meta'>
          <div className='author'>
            <img src='/author-avatar.svg' alt='Author avatar' className='avatar' />
            <div className='author-copy'>
              <p>{authorEmail.split('@')[0]}</p>
              <p>
                {new Date(createdAt).toLocaleDateString('en-US', {
                  timeZone: 'UTC',
                })}
              </p>
            </div>
          </div>
          <p className='category'>{category}</p>
        </div>

        <div className='summary'>
          <Link
            to='/skills'
            className='title-link'
            aria-label={`Browse ${title} in the registry`}
          >
            <h3>{title}</h3>
          </Link>
          <p>{description}</p>
        </div>

        <div className='command'>
          <div className='command-copy'>
            <span>&gt;</span>
            <p>{installCommand}</p>
          </div>
          <button
            type='button'
            className='copy'
            onClick={copyCommand}
            aria-label='Copy install command'
            title={
              copyStatus === 'copied'
                ? 'Copied'
                : copyStatus === 'error'
                  ? 'Copy failed'
                  : 'Copy command'
            }
          >
            {copyStatus === 'copied' ? <Check size={16} /> : <Copy size={16} />}
          </button>
          {copyStatus === 'error' && (
            <span className='copy-error'>Could not copy command.</span>
          )}
          <span className='sr-only' aria-live='polite'>
            {copyStatus === 'copied'
              ? 'Install command copied.'
              : copyStatus === 'error'
                ? 'Could not copy install command.'
                : ''}
          </span>
        </div>

        <div className='footer'>
          <div className='stats'>
            <button
              type='button'
              className='upvote'
              aria-label='Upvote skill'
              disabled
            >
              <ArrowBigUp size={16} fill='currentColor' />
              {upvoteCount !== undefined && <span>{upvoteCount}</span>}
            </button>
            <div className='comments'>
              <MessageSquare size={14} />
              {commentCount !== undefined && <span>{commentCount}</span>}
            </div>
          </div>
          <div className='actions'>
            <Link
              to='/skills'
              className='open'
              title='Browse the registry'
            >
              <span>Registry</span>
              <ArrowUpRight size={14} />
            </Link>
            <button
              type='button'
              className='save'
              aria-label='Saved state'
              disabled
            >
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default SkillCard;