import { useContext, useEffect, useRef, useState } from 'react'
import { ModalContext, emptyModal } from '../hooks/ModalContext'
import { deleteMemory, updateMemory } from '../helper/apiHelper/apiHelper'
import { MemoriesContext } from '../hooks/MemoriesContext'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { MemoryResponseResult, MemoryType } from '../types/global'

type Action = {
  label: string
  onClick: () => void
}
type MenuActions = Action[]

export const Menu = (props: { memory: MemoryType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { setMemories } = useContext(MemoriesContext)
  const { setModalStatus } = useContext(ModalContext)
  const { id = 0 } = props.memory

  useEffect(() => {
    const handleClickOutside = (e: { target: any }) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleScrollResize = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScrollResize)
    window.addEventListener('resize', handleScrollResize)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScrollResize)
      window.removeEventListener('resize', handleScrollResize)
    }
  }, [isOpen])

  const updateMemoryById = (memories: MemoryType[], newMemory: MemoryType) => {
    return memories.map((memory) =>
      memory.id === newMemory.id ? newMemory : memory
    )
  }

  const removeMemoryById = (memories: MemoryType[], targetId: number) => {
    return memories.filter((memory) => memory.id !== targetId)
  }

  const handleUpdateMemory = (memory: MemoryType) => {
    updateMemory(memory).then((result: MemoryResponseResult) => {
      if (result.success) {
        setMemories((prev) => updateMemoryById(prev, memory))
        alert(result.message)
      } else {
        alert(result.message)
      }
      setModalStatus(emptyModal)
    })
  }

  const menuActions: MenuActions = [
    {
      label: 'Edit',
      onClick: () => {
        setModalStatus({
          isOpen: true,
          title: 'Edit Modal',
          onSave: handleUpdateMemory,
          memory: props.memory,
        })
      },
    },
    {
      label: 'Delete',
      onClick: () => {
        deleteMemory(id).then((result: MemoryResponseResult) => {
          if (result.success) {
            setMemories((prev) => removeMemoryById(prev, id))
            setModalStatus(emptyModal)
            alert(result.message)
          } else {
            alert(result.message)
          }
        })
      },
    },
  ]

  const showMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const { clientX, clientY } = e
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    setPosition({ top: clientY + scrollY, left: clientX + scrollX })
    setIsOpen(true)
  }

  const hideMenu = () => {
    setIsOpen(false)
  }

  const handleActionClick = (action: Action) => {
    action.onClick()
    hideMenu()
  }

  return (
    <div className='flex self-end mb-4 mr-4'>
      <button
        className='bg-custom-secondary hover:bg-custom-primary text-black font-bold py-2 px-4 rounded'
        onClick={showMenu}
      >
        <EllipsisHorizontalIcon className='h-7 w-7 inline-block' />
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className='absolute bg-custom-white border border-gray-300 rounded shadow p-2'
          style={{ top: position.top, left: position.left }}
        >
          <ul>
            {menuActions.map((action, index) => (
              <li
                className='px-1 py-1 font-semibold hover:bg-custom-secondary rounded'
                key={`${index}-${action.label}`}
                onClick={() => handleActionClick(action)}
              >
                {action.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
