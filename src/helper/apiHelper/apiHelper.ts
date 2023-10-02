import { MemoryType } from '../../types/global'

const apiUrl = 'http://localhost:4001'

export const createMemory = async (props: MemoryType) => {
  try {
    const response = await fetch(`${apiUrl}/memories`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })

    if (response.status === 201) {
      return { success: true, message: 'Memory created successfully' }
    } else {
      const data = await response.json()
      return {
        success: false,
        message: data.error || 'Failed to create memory',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `An error occurred while creating memory error: ${error}`,
    }
  }
}

export const deleteMemory = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/memories/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      return { success: true, message: 'Memory deleted successfully' }
    } else {
      const data = await response.json()
      return {
        success: false,
        message: data.error || 'Failed to delete memory',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while deleting memory',
    }
  }
}

export const findMemory = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/memories/${id}`)

    if (response.ok) {
      const data = await response.json()
      return { success: true, memory: data.memory }
    } else {
      const data = await response.json()
      return {
        success: false,
        message: data.error || 'Memory not found',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while finding memory',
    }
  }
}

export const updateMemory = async (memory: MemoryType) => {
  try {
    const response = await fetch(`${apiUrl}/memories/${memory.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memory),
    })

    if (response.ok) {
      return { success: true, message: 'Memory updated successfully' }
    } else {
      const data = await response.json()
      return {
        success: false,
        message: data.error || 'Failed to update memory',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `An error occurred while updating memory ${error}`,
    }
  }
}

export const getAllMemories = async (): Promise<{
  success: boolean
  memories: MemoryType[]
  message?: string
}> => {
  try {
    const response = await fetch(`${apiUrl}/memories`)
    if (response.ok) {
      const data = await response.json()
      return { success: true, memories: data.memories }
    } else {
      const data = await response.json()
      return {
        success: false,
        memories: [],
        message: data.error || 'Failed to fetch memories',
      }
    }
  } catch (error) {
    return {
      success: false,
      memories: [],
      message: 'An error occurred while fetching memories',
    }
  }
}
