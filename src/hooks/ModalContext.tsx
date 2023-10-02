import { createContext } from 'react'
import { ModalType } from '../types/global'

export const emptyModal: ModalType = {
  isOpen: false,
  title: '',
  onSave: () => {},
  memory: {
    name: '',
    description: '',
    timestamp: '',
    image: '',
  },
}

export type ModalContextProvider = {
  modalStatus: ModalType
  setModalStatus: React.Dispatch<React.SetStateAction<ModalType>>
}

const defaultContextProvider = {
  modalStatus: { isOpen: false, title: '', onSave: () => undefined },
  setModalStatus: () => {},
}

export const ModalContext = createContext<ModalContextProvider>(
  defaultContextProvider
)
