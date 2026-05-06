import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './ConceptSection.module.scss'

// Design canvas dimensions (1920×940px target)
const D_W = 1920
const D_H = 940

interface PhotoDesign {
  id: number
  src: string
  alt: string
  // Spread position in design space
  left: number
  top: number
  width: number
  height: number
  // Pile: offset from spread natural center to pile center in design space
  // Computed as: pileCenter(960,460) - photoCenter + small fan tweak
  pileX: number
  pileY: number
  pileRotate: number
  pileZ: number
}

const PHOTOS: PhotoDesign[] = [
  {
    id: 1,
    src: '/4.jpg',
    alt: 'Aerial view of complex',
    left: 0,
    top: 0,
    width: 374,
    height: 258,
    // center=(187,129) → pile(960,460): dx=773, dy=331; fan: -25x, +18y
    pileX: 748,
    pileY: 349,
    pileRotate: -17,
    pileZ: 2,
  },
  {
    id: 2,
    src: '/3.jpg',
    alt: 'Resort and beach area',
    left: 1650,
    top: 0,
    width: 270,
    height: 283,
    // center=(1785,141) → pile(960,460): dx=-825, dy=319; fan: +22x, -10y
    pileX: -803,
    pileY: 309,
    pileRotate: 14,
    pileZ: 3,
  },
  {
    id: 3,
    src: '/2.jpg',
    alt: 'Residential complex aerial',
    left: 200,
    top: 725, // D_H - height = 940 - 215 → bottom edge flush with section
    width: 367,
    height: 215,
    // center=(338,832) → pile(960,460): dx=622, dy=-364; fan: +10x, +8y
    pileX: 632,
    pileY: -364,
    pileRotate: -5,
    pileZ: 4, // front
  },
  {
    id: 4,
    src: '/1.jpg',
    alt: 'Circular garden aerial view',
    left: 1000,
    top: 706, // D_H - height = 940 - 234 → bottom edge flush with section
    width: 314,
    height: 234,
    // center=(1117,823) → pile(960,460): dx=-157, dy=-353; fan: -18x, +10y
    pileX: -175,
    pileY: -353,
    pileRotate: 9,
    pileZ: 1,
  },
]

const SPRING = { type: 'spring' as const, stiffness: 72, damping: 18, mass: 1.1 }
const SPRING_FAST = { type: 'spring' as const, stiffness: 90, damping: 22, mass: 0.9 }

export function ConceptSection() {
  const [isSpread, setIsSpread] = useState(false)
  const getInitialScale = () => ({
    x: window.innerWidth / D_W,
    y: window.innerHeight / D_H,
  })
  const [scale, setScale] = useState(getInitialScale)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const updateScale = useCallback(() => {
    if (!sectionRef.current) return
    const w = sectionRef.current.offsetWidth
    const h = sectionRef.current.offsetHeight
    setScale({ x: w / D_W, y: h / D_H })
  }, [])

  useEffect(() => {
    updateScale()
    const ro = new ResizeObserver(updateScale)
    if (sectionRef.current) ro.observe(sectionRef.current)
    return () => ro.disconnect()
  }, [updateScale])

  const handleToggle = () => setIsSpread(prev => !prev)

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Концепция проекта"
    >
      {/* Background watermark */}
      <img src="/presidency.png" alt="" aria-hidden="true" className={styles.watermark} draggable={false} />

      {/* Section label */}
      <p className={styles.label}>
        К О Н Ц Е П Ц И Я&nbsp;&nbsp;П Р О Е К Т А
      </p>

      {/* Photos */}
      {PHOTOS.map((photo, i) => {
        const sx = scale.x
        const sy = scale.y

        const spreadStyle = {
          left: photo.left * sx,
          top: photo.top * sy,
          width: photo.width * sx,
          height: photo.height * sy,
        }

        const pileX = photo.pileX * sx
        const pileY = photo.pileY * sy

        const transition = prefersReduced
          ? { duration: 0.15 }
          : {
              ...SPRING,
              delay: isSpread
                ? i * 0.065
                : (PHOTOS.length - 1 - i) * 0.055,
            }

        return (
          <motion.div
            key={photo.id}
            className={styles.photoWrap}
            style={{
              ...spreadStyle,
              zIndex: isSpread ? 1 : photo.pileZ,
              cursor: 'pointer',
            }}
            initial={{
              x: pileX,
              y: pileY,
              rotate: photo.pileRotate,
              scale: 1.18,
              opacity: 0,
            }}
            animate={{
              x: isSpread ? 0 : pileX,
              y: isSpread ? 0 : pileY,
              rotate: isSpread ? 0 : photo.pileRotate,
              scale: isSpread ? 1 : 1.18,
              opacity: 1,
            }}
            transition={transition}
            onClick={handleToggle}
            whileHover={
              !prefersReduced
                ? { scale: 1.025, transition: SPRING_FAST }
                : undefined
            }
            whileTap={!prefersReduced ? { scale: 0.98 } : undefined}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.photo}
              draggable={false}
              loading="lazy"
            />
          </motion.div>
        )
      })}

      {/* Decorative monogram */}
      <img src="/m.png" alt="" aria-hidden="true" className={styles.monogram} draggable={false} />

      {/* Scroll cue */}
      <div className={styles.scrollCue}>
        <span className={styles.scrollArrow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.3283 11.1224L7.3283 3.00762L8.66143 3.00762L8.66191 11.1219L12.2375 7.54631L13.1803 8.48912L7.99487 13.6746L2.80942 8.48911L3.75223 7.54631L7.3283 11.1224Z" fill="#45342D"/>
          </svg>
        </span>
        <span>ПРОДОЛЖАЙТЕ СКРОЛЛИТЬ</span>
      </div>
    </section>
  )
}
