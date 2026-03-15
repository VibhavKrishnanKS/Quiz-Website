import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Sparkles, X, Check, Eye } from 'lucide-react'

const optionLabels = ['A', 'B', 'C', 'D']

const QuizQuestion = ({ questionData, questionNumber, totalQuestions, onNext }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showMemory, setShowMemory] = useState(false)
  const [wrongIndices, setWrongIndices] = useState([])
  const [showTryAgain, setShowTryAgain] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const audioRef = useRef(null)
  
  // Text input specific state
  const isTextInput = questionData.type === 'text'
  const [textInput, setTextInput] = useState('')

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null)
    setAttempts(0)
    setIsCorrect(false)
    setShowMemory(false)
    setWrongIndices([])
    setShowTryAgain(false)
    setImageLoaded(false)
    setTextInput('')
  }, [questionData.id])

  // Background audio — loops while on this question, fades out on exit
  useEffect(() => {
    if (!questionData.audio) return

    const audio = new Audio(questionData.audio)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    let fadeInInterval = null

    const startAudio = () => {
      audio.play().catch((e) => console.warn('Audio autoplay blocked:', e))
      fadeInInterval = setInterval(() => {
        if (audio.volume < 0.75) {
          audio.volume = Math.min(audio.volume + 0.05, 0.8)
        } else {
          clearInterval(fadeInInterval)
        }
      }, 100)
    }

    const playTimer = setTimeout(startAudio, 600)

    return () => {
      clearTimeout(playTimer)
      if (fadeInInterval) clearInterval(fadeInInterval)
      
      // Stop immediately to prevent overlapping
      audio.pause()
      audio.src = "" // Release the resource
      audio.load()
      audioRef.current = null
    }
  }, [questionData.id, questionData.audio])

  // Click handler for multiple-choice questions
  const handleOptionClick = (index) => {
    if (isCorrect || showMemory) return
    if (wrongIndices.includes(index)) return // Can't click same wrong answer

    setSelectedIndex(index)

    if (index === questionData.correctIndex) {
      // Correct answer!
      setIsCorrect(true)
      setTimeout(() => setShowMemory(true), 1500)
    } else {
      // Wrong answer
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setWrongIndices((prev) => [...prev, index])

      if (newAttempts >= 2) {
        // After 2 wrong attempts, reveal correct answer and show memory
        setShowTryAgain(false)
        setTimeout(() => {
          setIsCorrect(true)
          setSelectedIndex(questionData.correctIndex)
          setTimeout(() => setShowMemory(true), 4000)
        }, 1000)
      } else {
        setShowTryAgain(true)
        setTimeout(() => setShowTryAgain(false), 2000)
      }
    }
  }

  // Submit handler for text-input questions
  const handleTextSubmit = (e) => {
    e.preventDefault()
    if (isCorrect || showMemory) return

    // Regex check
    const isMatch = questionData.regex && questionData.regex.test(textInput)
    if (isMatch) {
      setIsCorrect(true)
      setTimeout(() => setShowMemory(true), 1500)
    } else {
      setAttempts(1) // Mark as wrong attempt made
      setWrongIndices([0])
      setShowTryAgain(true)
      setTimeout(() => setShowTryAgain(false), 3000)
    }
  }

  const handleRevealAnswer = () => {
    setShowTryAgain(false)
    setIsCorrect(true)
    if (questionData.actualAnswer) {
      setTextInput(questionData.actualAnswer)
    }
    setTimeout(() => setShowMemory(true), 4000)
  }

  const getOptionState = (index) => {
    if (wrongIndices.includes(index)) return 'wrong'
    if (isCorrect && index === questionData.correctIndex) return 'correct'
    if (selectedIndex === index && !isCorrect) return 'selected'
    return 'idle'
  }

  const optionStyles = {
    idle: 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]',
    selected: 'bg-white/10 border-white/30',
    wrong: 'bg-red-500/20 border-red-500/50 opacity-60',
    correct: 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  }

  const optionIconStyles = {
    idle: 'bg-white/10 text-white/60',
    selected: 'bg-white/20 text-white',
    wrong: 'bg-red-500/30 text-red-400',
    correct: 'bg-emerald-500/30 text-emerald-400',
  }

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">
      <AnimatePresence mode="wait">
        {!showMemory ? (
          /* ─── Question Card ─── */
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.97, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full max-w-2xl z-10 m-auto shrink-0 pb-10"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-google-blue/20 via-glow-purple/20 to-glow-pink/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-50" />

            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6 md:p-10 overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-l-2 border-google-blue/30 rounded-tl-xl sm:rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-r-2 border-glow-pink/30 rounded-br-xl sm:rounded-br-2xl" />

              {/* Question counter */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-google-yellow" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 font-bold">
                    Question {questionNumber} of {totalQuestions}
                  </span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: totalQuestions }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        i < questionNumber - 1
                          ? 'bg-google-green'
                          : i === questionNumber - 1
                          ? 'bg-google-blue animate-pulse'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question text */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg sm:text-xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-snug sm:leading-relaxed"
              >
                {questionData.question}
              </motion.h2>

              {/* Options or Text Input */}
              <div className="space-y-2 sm:space-y-3">
                {isTextInput ? (
                  <form onSubmit={handleTextSubmit} className="space-y-4">
                    <input 
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      disabled={attempts >= 1 || isCorrect}
                      className={`w-full bg-white/5 border p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-glow-pink transition-all font-medium text-lg ${
                        attempts >= 1 && !isCorrect 
                        ? 'border-red-500/50 bg-red-500/10 text-red-100' 
                        : isCorrect 
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100' 
                        : 'border-white/20 text-white/90'
                      }`}
                      placeholder={isCorrect ? "Nailed it!" : "Type your answer here..."}
                    />
                    
                    {attempts === 0 && !isCorrect && (
                      <button 
                        type="submit"
                        disabled={!textInput.trim()}
                        className="w-full bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-xl font-bold text-white transition-all disabled:opacity-50 tracking-widest uppercase"
                      >
                        Submit Answer
                      </button>
                    )}

                    {attempts >= 1 && !isCorrect && (
                      <div className="flex flex-col items-center space-y-4 mt-6">
                        <p className="text-red-400 font-medium">Not quite right! 😅</p>
                        <button 
                          onClick={handleRevealAnswer}
                          type="button"
                          className="flex items-center justify-center gap-2 group relative px-8 py-3 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 bg-white/10 border border-glow-pink/50 text-glow-pink hover:bg-glow-pink/20"
                        >
                          <Eye className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          <span>Show me the answer</span>
                        </button>
                      </div>
                    )}
                  </form>
                ) : (
                  questionData.options.map((option, index) => {
                    const state = getOptionState(index)
                    const isDisabled = wrongIndices.includes(index) || isCorrect

                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.08, duration: 0.35 }}
                        whileTap={!isDisabled ? { scale: 0.98 } : {}}
                        onClick={() => handleOptionClick(index)}
                        disabled={isDisabled}
                        className={`w-full flex items-center gap-2.5 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                          optionStyles[state]
                        } ${isDisabled && state !== 'correct' ? 'cursor-not-allowed' : ''}`}
                      >
                        {/* Option label circle */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                            optionIconStyles[state]
                          }`}
                        >
                          {state === 'wrong' ? (
                            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : state === 'correct' ? (
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            optionLabels[index]
                          )}
                        </div>

                        {/* Option text */}
                        <span
                          className={`text-sm sm:text-base md:text-lg font-medium transition-colors duration-300 flex-1 ${
                            state === 'wrong'
                              ? 'text-red-400/60 line-through'
                              : state === 'correct'
                              ? 'text-emerald-300'
                              : 'text-white/80'
                          }`}
                        >
                          {option}
                        </span>

                        {/* Correct answer sparkle */}
                        {state === 'correct' && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="ml-auto"
                          >
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-google-yellow" />
                          </motion.div>
                        )}
                      </motion.button>
                    )
                  })
                )}
              </div>

              {/* Wrong answer "Try Again" message for Multiple Choice */}
              <AnimatePresence>
                {!isTextInput && showTryAgain && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 sm:mt-6 text-center"
                  >
                    <p className="text-red-400 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2">
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Oops! Not quite right — try once more! 💪
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Correct answer celebration */}
              <AnimatePresence>
                {isCorrect && !showMemory && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="mt-4 sm:mt-6 text-center"
                  >
                    <p className="text-emerald-400 text-base sm:text-lg font-bold flex items-center justify-center gap-1.5 sm:gap-2">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-glow-pink fill-glow-pink" />
                      {attempts === 0
                        ? "You remembered! 🥰"
                        : "That's the one! 💕"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ─── Memory Reveal ─── */
          <motion.div
            key="memory"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center gap-3 sm:gap-6 w-full max-w-sm sm:max-w-xl px-0 sm:px-4 m-auto pb-10 shrink-0"
          >
            {/* Photo frame */}
            <div className="relative group w-full">
              {/* Animated glow border */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(0deg, #4285F4, #FF4D8D, #FBBC05, #34A853)',
                    'linear-gradient(90deg, #FF4D8D, #FBBC05, #34A853, #4285F4)',
                    'linear-gradient(180deg, #FBBC05, #34A853, #4285F4, #FF4D8D)',
                    'linear-gradient(270deg, #34A853, #4285F4, #FF4D8D, #FBBC05)',
                    'linear-gradient(360deg, #4285F4, #FF4D8D, #FBBC05, #34A853)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-75 blur-sm"
              />

              <div className="relative bg-black rounded-xl sm:rounded-2xl p-1 sm:p-1.5 overflow-hidden flex items-center justify-center">
                {/* Loading shimmer */}
                {!imageLoaded && (
                  <div className="w-full aspect-video min-h-[300px] md:min-h-[400px] rounded-lg sm:rounded-xl bg-white/5 animate-pulse flex items-center justify-center">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-glow-pink/50 animate-pulse" />
                  </div>
                )}
                <div style={{ display: imageLoaded ? 'block' : 'none' }} className="w-full h-full relative">
                  <motion.img
                    src={questionData.memoryImage}
                    alt={questionData.memoryCaption}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    onLoad={() => setImageLoaded(true)}
                    className="w-full h-auto max-h-[55vh] landscape:max-h-[65vh] object-contain rounded-lg sm:rounded-xl bg-black mx-auto"
                  />
                </div>
              </div>

              {/* Floating hearts */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-10, -50 - i * 15],
                    x: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 8)],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute top-0 left-1/2 pointer-events-none"
                >
                  <Heart
                    className="w-3 h-3 sm:w-4 sm:h-4 fill-glow-pink text-glow-pink"
                  />
                </motion.div>
              ))}
            </div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm md:text-lg font-light text-white/80 italic mt-2 px-4 shadow-lg"
            >
              {questionData.memoryCaption}
            </motion.p>

            {/* Next button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              onClick={onNext}
              className="group relative mt-2 mb-8 px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-google-blue via-glow-purple to-glow-pink opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
              <span className="relative z-10 flex items-center gap-2 sm:gap-3 text-white">
                Next Memory
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-google-blue via-glow-purple to-glow-pink rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse pointer-events-none" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuizQuestion
