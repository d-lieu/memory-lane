import { createContext } from 'react'
import { MemoryType } from '../types/global'

export type MemoriesContextProvider = {
  memories: MemoryType[]
  setMemories: React.Dispatch<React.SetStateAction<MemoryType[]>>
}

const defaultContextProvider = {
  memories: [{ name: '', image: '', description: '', timestamp: null }],
  setMemories: () => {},
}

export const MemoriesContext = createContext<MemoriesContextProvider>(
  defaultContextProvider
)
