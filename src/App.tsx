import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import { MemoryList } from './components/MemoryList'
import { CreateMemoryBtn } from './components/CreateMemoryBtn'
import { getAllMemories } from './helper/apiHelper/apiHelper'
import { useEffect, useState } from 'react'
import {
  ModalContext,
  ModalContextProvider,
  emptyModal,
} from './hooks/ModalContext'
import { MemoryModal } from './components/MemoryModal'
import {
  MemoriesContext,
  MemoriesContextProvider,
} from './hooks/MemoriesContext'
import { MemoryType, ModalType } from './types/global'

function App() {
  const [memories, setMemories] = useState<MemoryType[]>([])
  const [modalStatus, setModalStatus] = useState<ModalType>(emptyModal)
  const myMemoriesContext: MemoriesContextProvider = { memories, setMemories }
  const myModalContext: ModalContextProvider = { modalStatus, setModalStatus }

  const handleUpdateMemoriesFromDB = () => {
    getAllMemories().then((result) => {
      if (result.success) {
        setMemories(result.memories)
      } else {
        console.error(result.message)
      }
    })
  }

  useEffect(handleUpdateMemoriesFromDB, [modalStatus])

  return (
    <div className='bg-custom-secondary pb-56 min-h-screen'>
      <MemoriesContext.Provider value={myMemoriesContext}>
        <ModalContext.Provider value={myModalContext}>
          <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 py-12'>
            <div className='rounded-lg bg-custom-white shadow-lg h-28'>
              <div className='px-4 py-5 sm:p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex'>
                    <CubeIcon className='h-16 w-16 inline-block' />
                    <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'>
                      Memory lane
                    </h1>
                  </div>
                  <CreateMemoryBtn />
                </div>
              </div>
            </div>
            <MemoryList />
          </div>
          <MemoryModal />
        </ModalContext.Provider>
      </MemoriesContext.Provider>
    </div>
  )
}

export default App
