import { createMemory } from '../helper/apiHelper/apiHelper'
import { useContext } from 'react'
import { ModalContext } from '../hooks/ModalContext'
import { MemoriesContext } from '../hooks/MemoriesContext'
import { HandleCreateMemory, MemoryResponseResult } from '../types/global'

export const CreateMemoryBtn = () => {
  const { setModalStatus } = useContext(ModalContext)
  const { setMemories } = useContext(MemoriesContext)
  const handleCreateMemory: HandleCreateMemory = async (memory) => {
    const result: MemoryResponseResult = await createMemory(memory)
    if (result.success) {
      setMemories((prev) => [...prev, memory])
      alert(result.message)
    } else {
      alert(result.message)
    }
  }

  return (
    <div>
      <button
        className='bg-custom-secondary hover:bg-custom-primary text-black font-bold py-2 px-4 rounded'
        onClick={() =>
          setModalStatus({
            isOpen: true,
            title: 'Create Modal',
            onSave: handleCreateMemory,
          })
        }
      >
        Create Memory
      </button>
    </div>
  )
}
