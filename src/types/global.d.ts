export type MemoryType = {
  id?: number
  name: string
  description: string
  timestamp: string | null
  image: string
}

export type HandleCreateMemory = (memory: MemoryType) => Promise<void>
export type HandleUpdateMemory = (memory: MemoryType) => void

export type MemoryResponseResult = {
  success: boolean
  message: string
}

export type ModalType = {
  isOpen: boolean
  title: string
  onSave: HandleCreateMemory | (() => void) | HandleUpdateMemory
  id?: number
  memory?: MemoryType
}
