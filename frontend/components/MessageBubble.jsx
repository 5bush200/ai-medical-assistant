import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'

const MessageBubble = ({ message, index }) => {
  const isAI = message.sender === 'ai'
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex gap-3 ${
        isAI ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAI && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="text-white" size={16} />
        </div>
      )}

      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isAI
            ? 'bg-surface border border-border shadow-soft'
            : 'bg-primary text-white shadow-medium'
        }`}
      >
        <p className={`text-sm leading-relaxed ${
          isAI ? 'text-text' : 'text-white'
        }`}>
          {message.text}
        </p>
        <p className={`text-xs mt-2 ${
          isAI ? 'text-textMuted' : 'text-white/70'
        }`}>
          {time}
        </p>
      </div>

      {!isAI && (
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
          <User className="text-white" size={16} />
        </div>
      )}
    </motion.div>
  )
}

export default MessageBubble      
