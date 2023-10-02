import { useContext, useEffect, useState } from 'react'
import { ModalContext, emptyModal } from '../hooks/ModalContext'
import { MemoryType } from '../types/global'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const MemoryModal = () => {
  const { modalStatus, setModalStatus } = useContext(ModalContext)
  const { isOpen, title, onSave } = modalStatus
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    if (modalStatus.memory) {
      const { name, image, description, timestamp } = modalStatus.memory
      const newDate = timestamp ? new Date(timestamp) : null
      setName(name)
      setImage(image)
      setDescription(description)
      setSelectedDate(newDate)
    }
  }, [modalStatus.memory])

  if (!isOpen) return null

  const onRequestClose = () => {
    setModalStatus(emptyModal)
  }

  const handleSubmit = () => {
    const newMemory: MemoryType = {
      name,
      description,
      timestamp: selectedDate ? selectedDate.toISOString() : null,
      image,
      id: modalStatus.memory?.id,
    }
    onSave(newMemory)
    onRequestClose()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <h2 className='text-xl font-semibold mb-4'>{title}</h2>
        <div className='flex flex-col mb-4'>
          <label className='flex flex-col mb-2'>
            <span className='mb-1'>Name:</span>
            <input
              type='text'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-gray-300 p-2 rounded'
            />
          </label>
          <label className='flex flex-col mb-2'>
            <span className='mb-1'>Image URL:</span>
            <input
              type='text'
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className='border border-gray-300 p-2 rounded'
            />
          </label>
          <label className='flex flex-col mb-2'>
            <span className='mb-1'>Date:</span>
            <DatePicker
              className='border border-gray-300 p-2 rounded mt-2 w-full'
              selected={selectedDate ? selectedDate : null}
              onChange={(date) => setSelectedDate(date)}
              placeholderText='Select Date'
            />
          </label>
          <label className='flex flex-col mb-2'>
            <span className='mb-1'>Description:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              cols={50}
              className='border border-gray-300 p-2 rounded'
            />
          </label>
        </div>
        <button
          className='mx-4 mt-4 bg-custom-secondary font-semibold hover:bg-custom-primary text-black px-4 py-2 rounded'
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className='mx-4 mt-4 bg-custom-secondary font-semibold hover:bg-custom-primary text-black px-4 py-2 rounded'
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
