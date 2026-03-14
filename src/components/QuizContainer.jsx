import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import quizData from '../data/quizData'
import QuizQuestion from './QuizQuestion'

const QuizContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full h-full flex items-center justify-center z-10 relative"
      >
        <div className="text-center p-6 sm:p-10 max-w-sm sm:max-w-lg">
          {/* Glow */}
          <div className="absolute -inset-10 bg-gradient-to-r from-glow-pink/20 via-glow-purple/20 to-google-blue/20 rounded-full blur-3xl opacity-50" />

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="relative inline-block mb-4 sm:mb-6"
          >
            <Heart className="w-10 h-10 sm:w-16 sm:h-16 text-glow-pink fill-glow-pink" />
          </motion.div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gradient mb-3 sm:mb-4">
            You're Amazing! 🥰
          </h1>
          <p className="text-base sm:text-xl text-white/60 font-light">
            Thanks for reliving these memories with me...
          </p>
          <p className="text-sm sm:text-lg text-white/40 mt-1.5 sm:mt-2 italic">
            Every moment with you is a treasure 💕
          </p>

          {/* Confetti-like floating elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [-10, -100 - Math.random() * 100],
                x: [(Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute top-1/2 left-1/2 pointer-events-none"
            >
              {i % 3 === 0 ? (
                <Heart className="w-3 h-3 fill-glow-pink text-glow-pink" />
              ) : i % 3 === 1 ? (
                <span className="text-lg">✨</span>
              ) : (
                <span className="text-lg">💫</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <QuizQuestion
          questionData={quizData[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={quizData.length}
          onNext={handleNext}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default QuizContainer
