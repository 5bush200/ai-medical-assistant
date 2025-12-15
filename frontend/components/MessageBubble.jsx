import { motion } from 'framer-motion'

const MessageBubble = ({ message, index }) => {
  const isAI = message.sender === 'ai'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && <div className="text-2xl">🤖</div>}

      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isAI
            ? 'bg-gray-100 text-gray-900'
            : 'bg-blue-600 text-white'
        }`}
      >
        <p className="text-sm leading-relaxed">
          {message.text}
        </p>
      </div>

      {!isAI && <div className="text-2xl">👤</div>}
    </motion.div>
  )
}

export default MessageBubble      
