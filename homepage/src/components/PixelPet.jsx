import { useEffect, useMemo, useRef, useState } from 'react'
import './PixelPet.css'

const PET_CONFIG = {
  name: '小宝宝',
  title: '这也是我：会待机、会营业的像素分身',
  sprite: '/pets/xiao-bao-bao.webp',
  frameWidth: 192,
  frameHeight: 208,
}

const PET_ACTIONS = [
  { id: 'idle', label: '待机', row: 0, frames: 6, duration: '1.15s' },
  { id: 'happy', label: '开心', row: 1, frames: 6, duration: '0.95s' },
  { id: 'thinking', label: '思考', row: 2, frames: 6, duration: '1.35s' },
  { id: 'working', label: '开工', row: 3, frames: 6, duration: '1.05s' },
]

const getInitialPosition = () => {
  if (typeof window === 'undefined') return { x: 24, y: 360 }

  const compact = window.innerWidth < 640
  return {
    x: compact ? 14 : 24,
    y: Math.max(compact ? 220 : 320, window.innerHeight - (compact ? 230 : 288)),
  }
}

export default function PixelPet() {
  const [actionIndex, setActionIndex] = useState(0)
  const [position, setPosition] = useState(getInitialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const petRef = useRef(null)
  const dragRef = useRef(null)
  const positionRef = useRef(position)
  const animationFrameRef = useRef(null)
  const suppressClickRef = useRef(false)

  const action = PET_ACTIONS[actionIndex]
  const spriteStyle = useMemo(
    () => ({
      '--pet-frame-width': `${PET_CONFIG.frameWidth}px`,
      '--pet-frame-height': `${PET_CONFIG.frameHeight}px`,
      '--pet-sprite': `url(${PET_CONFIG.sprite})`,
      '--pet-row-shift': `${action.row * PET_CONFIG.frameHeight * -1}px`,
      '--pet-end-shift': `${action.frames * PET_CONFIG.frameWidth * -1}px`,
      '--pet-duration': action.duration,
      '--pet-x': `${position.x}px`,
      '--pet-y': `${position.y}px`,
    }),
    [action, position],
  )

  const clampPosition = (nextPosition) => {
    const drag = dragRef.current
    const width = drag?.width ?? petRef.current?.offsetWidth ?? 220
    const height = drag?.height ?? petRef.current?.offsetHeight ?? 250
    const gutter = window.innerWidth < 640 ? 10 : 16

    return {
      x: Math.min(Math.max(nextPosition.x, gutter), window.innerWidth - width - gutter),
      y: Math.min(Math.max(nextPosition.y, gutter), window.innerHeight - height - gutter),
    }
  }

  const movePet = (nextPosition) => {
    positionRef.current = nextPosition

    if (animationFrameRef.current) return

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null
      const node = petRef.current
      if (!node) return

      const { x, y } = positionRef.current
      node.style.setProperty('--pet-x', `${x}px`)
      node.style.setProperty('--pet-y', `${y}px`)
    })
  }

  useEffect(() => {
    const keepInView = () => {
      const nextPosition = clampPosition(positionRef.current)
      positionRef.current = nextPosition
      movePet(nextPosition)
      setPosition(nextPosition)
    }

    keepInView()
    window.addEventListener('resize', keepInView)
    return () => {
      window.removeEventListener('resize', keepInView)
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const switchToNextAction = () => {
    setActionIndex((current) => (current + 1) % PET_ACTIONS.length)
  }

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return

    const rect = petRef.current.getBoundingClientRect()
    positionRef.current = position
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      startX: event.clientX,
      startY: event.clientY,
      width: rect.width,
      height: rect.height,
      moved: false,
    }
    suppressClickRef.current = false
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const moveDistance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY)
    if (moveDistance > 6) {
      drag.moved = true
      suppressClickRef.current = true
    }

    movePet(
      clampPosition({
        x: event.clientX - drag.offsetX,
        y: event.clientY - drag.offsetY,
      }),
    )
  }

  const finishDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    dragRef.current = null
    setIsDragging(false)
    setPosition({ ...positionRef.current })
    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handlePetClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }

    switchToNextAction()
  }

  return (
    <aside
      ref={petRef}
      className={`pixel-pet ${isDragging ? 'is-dragging' : ''}`}
      style={spriteStyle}
      aria-label={`${PET_CONFIG.name} 像素宠物`}
    >
      <button
        type="button"
        className="pixel-pet__stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClick={handlePetClick}
        aria-label={`切换${PET_CONFIG.name}动作`}
        title={action.label}
      >
        <span className="pixel-pet__viewport">
          <span key={action.id} className="pixel-pet__sprite" aria-hidden="true"></span>
        </span>
      </button>

      <div className="pixel-pet__bubble">
        <span className="pixel-pet__kicker">Pixel Me</span>
        <strong>{PET_CONFIG.name}</strong>
        <p>{PET_CONFIG.title}</p>
        <div className="pixel-pet__actions" aria-label="宠物动作">
          {PET_ACTIONS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === actionIndex ? 'is-active' : ''}
              onPointerDown={(event) => {
                event.stopPropagation()
                suppressClickRef.current = false
              }}
              onClick={(event) => {
                event.stopPropagation()
                setActionIndex(index)
              }}
              aria-pressed={index === actionIndex}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
