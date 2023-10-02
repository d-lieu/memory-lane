import { MemoryType } from '../types/global'
import { Menu } from './Menu'

export const Memory = (props: { memory: MemoryType }) => {
  const { name, description, timestamp, image } = props.memory

  const getFormattedTimestamp = (date: Date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions
    const newDate = date.toLocaleString('en-US', options)
    return newDate
  }

  return (
    <div className='flex h-80'>
      <div className='w-80 h-80 rounded-lg overflow-hidden self-center mr-4'>
        <img
          className='max-w-sm w-full h-full object-cover'
          src={image}
          alt={name}
        />
      </div>
      <div className='flex justify-between flex-grow'>
        <div className='flex-column justify-center'>
          <h1 className='text-2xl font-semibold text-gray-900 my-4 ml-4'>
            {name}
          </h1>
          <p className='text-xl font-semibold text-gray-900 my-4 mx-4'>
            {timestamp && getFormattedTimestamp(new Date(timestamp))}
          </p>
          <p className='text-xl text-gray-900 my-4 mx-4 max-w-550'>
            {description}
          </p>
        </div>
        <Menu memory={props.memory} />
      </div>
    </div>
  )
}
