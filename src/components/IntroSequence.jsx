import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

const IntroSequence = ({ onStepChange, onComplete }) => {
  const [step, setStep] = useState(-1) // -1 is the "Click to Begin" screen
  const [showButton, setShowButton] = useState(false)
  const audioRef = useRef(null)
  
  // Mobile-first responsive text sizes
  const steps = [
    { text: "Hey", style: "text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter" },
    { text: "Hey Cutie Pookie", style: "text-3xl sm:text-4xl md:text-7xl bubbly-text text-glow-pink" },
    { text: "Today is your Day", style: "text-3xl sm:text-4xl md:text-6xl font-light italic" },
    { text: "BEFORE THAT", style: "text-4xl sm:text-5xl md:text-8xl font-black uppercase" },
    { text: "LET'S GET BACK IN TIME", style: "text-xl sm:text-2xl md:text-5xl font-bold tracking-widest" },
    { text: "LESGOOO 🚀", style: "text-4xl sm:text-5xl md:text-8xl font-black" },
  ]

  useEffect(() => {
    onStepChange(step)
    
    if (step < 0) return; // Do nothing before user clicks start

    // Cleaned up timer logic to completely prevent skipped frames or overlapping animations
    const timings = [3500, 4000, 3500, 3000, 5000, 1500]
    
    let timer;
    if (step < 5) {
        timer = setTimeout(() => setStep(step + 1), timings[step])
    } else if (step === 5) {
        timer = setTimeout(() => setShowButton(true), timings[step])
    }

    return () => clearTimeout(timer)
  }, [step, onStepChange])

  const handleStart = () => {
      // Fade out intro music before starting quiz
      if (audioRef.current) {
          const audio = audioRef.current
          const fadeOut = setInterval(() => {
              if (audio.volume > 0.05) {
                  audio.volume = Math.max(audio.volume - 0.05, 0)
              } else {
                  clearInterval(fadeOut)
                  audio.pause()
              }
          }, 50)
      }
      onComplete()
  }

  const handleInitialClick = () => {
      if (audioRef.current) {
          audioRef.current.play().catch(e => console.error("Audio block:", e))
      }
      setStep(0)
  }

  const typewriterVariant = {
      hidden: { opacity: 0 },
      visible: (i) => ({
          opacity: 1,
          transition: { delay: i * 0.05 + 0.5 }
      })
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 sm:px-6">
      <audio ref={audioRef} src="assets/Music/Sirikkadhey theme music  Remo Tamil movie  Anirudh Ravichander  Sivakarthikeyan  Keerthy Suresh.mp3" preload="auto" />
      
      {/* Starting Screen to ensure Audio Sync */}
      <AnimatePresence>
          {step === -1 && (
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto backdrop-blur-sm bg-black/30"
              >
                  <button 
                      onClick={handleInitialClick}
                      className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-white/20 bg-white/5 text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm hover:bg-white/20 hover:text-white transition-all glow-shadow pulse-slow animate-pulse"
                  >
                      Click Anywhere to Begin
                  </button>
              </motion.div>
          )}
      </AnimatePresence>

      {step >= 0 && (
          <AnimatePresence mode="wait">
            <motion.div
               key={step}
               initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
               animate={{ 
                   opacity: 1, 
                   scale: step === 3 ? 1.15 : 1, 
                   filter: 'blur(0px)',
                   transition: { duration: 1.2, ease: "easeOut" }
               }}
               exit={{ 
                   opacity: 0, 
                   scale: step === 3 ? 1.4 : 1.1, 
                   filter: 'blur(10px)',
                   transition: { duration: 0.8 } 
               }}
               className={`text-center max-w-[90vw] sm:max-w-[80vw] ${steps[step].style} text-gradient glow-shadow`}
            >
              {step === 2 ? (
                <div className="flex flex-wrap justify-center">
                  {"Today is your Day".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={typewriterVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              ) : (
                steps[step].text
              )}
            </motion.div>
          </AnimatePresence>
      )}

      {showButton && step === 5 && (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-[15%] sm:bottom-[20%] pointer-events-auto z-10"
        >
            <button
                onClick={handleStart}
                className="group relative px-8 py-4 sm:px-12 sm:py-5 text-lg sm:text-2xl font-bold bg-transparent text-white rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 glow-border overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-google-blue via-glow-pink to-google-green opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors"></div>
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                    START <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-google-blue via-glow-pink to-google-green rounded-full blur-xl opacity-30 group-hover:opacity-60 animate-pulse pointer-events-none"></div>
            </button>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: [0, 1, 0], x: [0, 20, 40] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                className="absolute left-[-40px] sm:left-[-60px] top-1/2 -translate-y-1/2 text-google-yellow"
            >
                <ArrowRight size={24} className="sm:hidden" />
                <ArrowRight size={40} className="hidden sm:block" />
            </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default IntroSequence
