
import mongoose from 'mongoose'
import { env } from './env.js'

let isConnected = false

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    isConnected = true
    return mongoose.connection
  }

  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    autoSelectFamily: false,
  }

  try {
    console.log('[Database] Connecting to MongoDB Atlas...')

    await mongoose.connect(env.MONGODB_URI, options)

    isConnected = true

    console.log(
      `[Database] MongoDB Connected Successfully: ${mongoose.connection.host}`
    )

    return mongoose.connection
  } catch (error) {
    isConnected = false

    console.error(
      '[Database Error] MongoDB connection failed:',
      error.message
    )

    return null
  }
}

export const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    isConnected = false
    return
  }

  try {
    await mongoose.disconnect()
    isConnected = false
    console.log('[Database] Disconnected from MongoDB')
  } catch (error) {
    console.error(
      '[Database Error] Disconnect failed:',
      error.message
    )
  }
}

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1
}

mongoose.connection.on('connected', () => {
  isConnected = true
})

mongoose.connection.on('error', (error) => {
  console.error('[Database Error]', error.message)
  isConnected = false
})

mongoose.connection.on('disconnected', () => {
  isConnected = false
})

export default connectDB
