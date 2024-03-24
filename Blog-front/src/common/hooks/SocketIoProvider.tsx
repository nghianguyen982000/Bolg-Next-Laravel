import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import io, { Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

export const SocketProvider: React.FC<{ url: string; children: ReactNode }> = ({
  url,
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketInstance = io(url)

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [url])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
