import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import quizData from '../data/quizData'
import QuizQuestion from './QuizQuestion'

const QuizContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [endPhase, setEndPhase] = useState(0) // 0: tracking questions, 1: Q14, 2: Q15

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setEndPhase(1)
    }
  }

  useEffect(() => {
    if (endPhase === 1) {
      const audio = new Audio("assets/Music/Q14_kanne kaniye  amal varghese.mp3")
      audio.loop = true
      audio.volume = 0
      
      audio.play().catch(e => console.warn('Audio auto-play blocked:', e))

      let fadeIn = setInterval(() => {
        if (audio.volume < 0.8) {
          audio.volume = Math.min(audio.volume + 0.05, 0.8)
        } else {
          clearInterval(fadeIn)
        }
      }, 100)

      return () => {
        clearInterval(fadeIn)
        const fadeOut = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(audio.volume - 0.05, 0)
          } else {
            clearInterval(fadeOut)
            audio.pause()
            audio.currentTime = 0
          }
        }, 50)
      }
    } else if (endPhase === 2) {
      const audio = new Audio("assets/Music/Q15_Vaa Vaa Yen Dhevadhaiyae.mp3")
      audio.loop = true
      audio.volume = 0
      
      audio.play().catch(e => console.warn('Audio auto-play blocked:', e))

      let fadeIn = setInterval(() => {
        if (audio.volume < 0.8) {
          audio.volume = Math.min(audio.volume + 0.05, 0.8)
        } else {
          clearInterval(fadeIn)
        }
      }, 100)

      return () => {
        clearInterval(fadeIn)
        const fadeOut = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(audio.volume - 0.05, 0)
          } else {
            clearInterval(fadeOut)
            audio.pause()
            audio.currentTime = 0
          }
        }, 50)
      }
    }
  }, [endPhase])

  if (endPhase === 1) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="end1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full flex flex-col items-center justify-center z-10 relative px-4 sm:px-6 overflow-y-auto overflow-x-hidden"
        >
          <div className="text-center p-6 sm:p-10 max-w-sm sm:max-w-xl md:max-w-2xl bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl m-auto shrink-0 mt-8 mb-8 relative">
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-gradient-to-r from-glow-pink/30 via-glow-purple/30 to-google-red/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Special Image Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative w-full max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-2xl border-2 border-glow-pink/50 bg-black"
            >
              <img 
                src="assets/Images/Q14_Card_Gift.jpg" 
                alt="A special gift" 
                className="w-full h-auto object-contain rounded-lg relative z-10"
              />
              {/* Shimmer loading background behind image */}
              <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                  <Heart className="w-8 h-8 text-glow-pink/30 animate-ping" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight"
            >
              Happy Happy Bday di KuttyMa 🎂
            </motion.h1>

            {/* Heartfelt Message */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="space-y-4 text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed"
            >
              <p className="text-emerald-300 font-bold text-lg sm:text-2xl mb-4">A Very Very Happy Birthday in Life 🎉</p>
              <p>and I am really sorry for giving you a lot of trouble in the past 🥺</p>
              <p>every single day is one stage of knowing you more ✨</p>
              <p>and i feel i have changed a lot for you till date 💕</p>
              <p>will try my best till the end to make you happy 🥰</p>
              <div className="py-2">
                  <p className="text-glow-pink font-bold text-xl sm:text-2xl mt-2 inline-block relative">
                      I love you and i miss you a lot ❤️
                      <motion.div 
                        className="absolute -bottom-2 left-0 h-[2px] bg-glow-pink w-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 3, duration: 1 }}
                      />
                  </p>
              </div>
              <p className="italic text-white/60 mt-4 leading-loose">enikume azhugama sirchte irunga 🌸</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 0.8 }}
              className="mt-8"
            >
                <button
                  onClick={() => setEndPhase(2)}
                  className="group relative px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 mx-auto block"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-google-blue via-glow-purple to-glow-pink opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
                    <span className="relative z-10 flex items-center gap-2">
                      Wait, one more... <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </motion.div>

            {/* Confetti-like floating elements */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -100 - Math.random() * 200],
                  x: [(Math.random() - 0.5) * 400],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random(),
                }}
                className="absolute top-1/2 left-1/2 pointer-events-none"
              >
                {i % 4 === 0 ? (
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-glow-pink text-glow-pink" />
                ) : i % 4 === 1 ? (
                  <span className="text-2xl">✨</span>
                ) : i % 4 === 2 ? (
                  <span className="text-2xl">🌸</span>
                ) : (
                  <span className="text-2xl">🎂</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (endPhase === 2) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="end2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full flex flex-col items-center justify-center z-10 relative px-4 sm:px-6 overflow-y-auto overflow-x-hidden"
        >
          <div className="text-center p-6 sm:p-10 max-w-sm sm:max-w-xl md:max-w-2xl bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl m-auto shrink-0 mt-8 mb-8 relative">
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-gradient-to-r from-google-blue/30 via-emerald-500/30 to-google-green/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Special Image Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative w-full max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-2xl border-2 border-emerald-400/50 bg-black"
            >
              <img 
                src="assets/Images/Q15_Dad.JPG" 
                alt="Dad" 
                className="w-full h-auto object-contain rounded-lg relative z-10"
              />
              {/* Shimmer loading background behind image */}
              <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                  <Heart className="w-8 h-8 text-emerald-400/30 animate-ping" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-google-blue mb-8 leading-tight drop-shadow-lg"
            >
              Happy Happy Happy Birthday Shruti 🎉
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="space-y-4 text-sm sm:text-base md:text-xl text-white/90 font-medium leading-relaxed italic"
            >
              <p>and The bday never ends without so called <span className="font-bold text-red-500 not-italic">HITLER</span> for me...</p>
              <p>but actually your <span className="text-google-yellow font-bold not-italic">ROLE MODEL</span> and a <span className="text-google-blue font-bold not-italic">MAN OF WORDS</span> 👑</p>
            </motion.div>

            {/* Floating elements */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -100 - Math.random() * 200],
                  x: [(Math.random() - 0.5) * 400],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random(),
                }}
                className="absolute top-1/2 left-1/2 pointer-events-none"
              >
                {i % 3 === 0 ? (
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-400 text-emerald-400" />
                ) : i % 3 === 1 ? (
                  <span className="text-xl">🌟</span>
                ) : (
                  <span className="text-xl">✨</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
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
