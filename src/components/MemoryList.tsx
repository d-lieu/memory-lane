import { useContext, useEffect, useState } from 'react'
import { MemoriesContext } from '../hooks/MemoriesContext'
import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon'
import { MemoryType } from '../types/global'
import { Memory } from './Memory'

export const MemoryList = () => {
  const { memories } = useContext(MemoriesContext)
  const [ascendingOrder, setAscendingOrder] = useState(false)
  const [filteredMem, setFilteredMem] = useState<MemoryType[]>(memories)

  useEffect(() => {
    setFilteredMem(memories)
  }, [memories])

  const compareByTimestamps = (a: MemoryType, b: MemoryType) => {
    const timestampA = a.timestamp ? new Date(a.timestamp).getTime() : 0
    const timestampB = b.timestamp ? new Date(b.timestamp).getTime() : 0
    return ascendingOrder ? timestampA - timestampB : timestampB - timestampA
  }

  const handleFilterMemories = () => {
    const sortedMemories = [...filteredMem]
    sortedMemories.sort(compareByTimestamps)
    sortedMemories.reverse()

    setAscendingOrder((prev) => !prev)
    setFilteredMem(sortedMemories)
  }

  return (
    <div className='bg-custom-secondary h-full'>
      <div className='pt-4 text-right'>
        <button
          onClick={handleFilterMemories}
          className='bg-custom-white hover:bg-custom-primary text-black font-bold py-2 px-4 shadow-lg rounded'
        >
          <AdjustmentsHorizontalIcon className='h-7 w-7 inline-block' />
        </button>
      </div>
      <div>
        {filteredMem.map((memory, i) => (
          <div
            key={`${memory.timestamp}-${i}`}
            className='rounded-lg bg-custom-white shadow-lg h-auto my-4'
          >
            <Memory memory={memory} />
          </div>
        ))}
      </div>
    </div>
  )
}
