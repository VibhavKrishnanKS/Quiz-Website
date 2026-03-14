import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import IntroSequence from './components/IntroSequence'
import QuizContainer from './components/QuizContainer'

function App() {
  const [currentIntroStep, setCurrentIntroStep] = useState(0)
  const [isIntroFinished, setIsIntroFinished] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsIntroFinished(true)
      setIsTransitioning(false)
    }, 2000) // Match the transition animation duration
  }, [])

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black flex flex-col items-center justify-center text-white">
      {/* Background Layer */}
      <Background introStep={isTransitioning ? 5 : currentIntroStep} />

      <AnimatePresence mode="wait">
        {!isIntroFinished ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <IntroSequence 
                onStepChange={setCurrentIntroStep}
                onComplete={handleIntroComplete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full z-10"
          >
            <QuizContainer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 5, 10], 
                backgroundColor: ['#000000', 'white', '#000000']
            }}
            transition={{ duration: 2, times: [0, 0.5, 1] }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
              <div className="w-full h-full bg-white blur-3xl opacity-30 radial-gradient"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* HUD/UI Overlay for premium feel */}
      <div className="fixed top-0 left-0 w-full p-3 sm:p-6 flex justify-between items-center pointer-events-none opacity-30 sm:opacity-40 hover:opacity-100 transition-opacity z-20">
          <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-google-red animate-pulse"></div>
              <span className="text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">Systems Ready</span>
          </div>
          <div className="text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold hidden xs:block">Quiz Terminal v1.0.4</div>
      </div>
    </div>
  )
}

export default App
