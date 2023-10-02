import { setupServer } from 'msw/node'
import { rest } from 'msw'
import {
  createMemory,
  deleteMemory,
  getAllMemories,
  updateMemory,
} from './apiHelper'
import { MemoryType } from '../../types/global'
import {
  handlers,
  mockMemories,
  mockMemory,
  mockMemory2,
} from '../../mocks/handlers'

// Create a new instance of MSW server with the defined handlers
const server = setupServer(...handlers)
const apiUrl = 'http://localhost:4001'

// Before running the tests, start the server and set it to close after the tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('apiHelper', () => {
  // createMemory
  it('createMemory should create a memory successfully', async () => {
    const response = await createMemory(mockMemory)
    expect(response.success).toBe(true)
    expect(response.message).toBe('Memory created successfully')
  })

  it('createMemory should handle a failed creation', async () => {
    server.use(
      rest.post(`${apiUrl}/memories`, (_req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ error: 'Failed to create memory' })
        )
      })
    )

    const response = await createMemory(mockMemory)
    expect(response.success).toBe(false)
    expect(response.message).toBe('Failed to create memory')
  })

  // deleteMemory
  it('deleteMemory should delete a memory', async () => {
    const memoryId = 1

    const result = await deleteMemory(memoryId)
    expect(result.success).toBe(true)
    expect(result.message).toBe('Memory deleted successfully')
  })

  it('deleteMemory should handle a failed deletion', async () => {
    const memoryId = 1

    server.use(
      rest.delete(`${apiUrl}/memories/1`, (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server Error' }))
      })
    )

    const result = await deleteMemory(memoryId)
    expect(result.success).toBe(false)
    expect(result.message).toBe('Server Error')
  })

  // updateMemory
  it('updateMemory should update a memory', async () => {
    const updatedMemory: MemoryType = {
      id: 1,
      name: 'Updated Memory',
      description: 'Updated Description',
      timestamp: '2023-10-01T03:02:42.000Z',
      image: 'updated.jpg',
    }

    const result = await updateMemory(updatedMemory)
    expect(result.success).toBe(true)
    expect(result.message).toBe('Memory updated successfully')
  })

  it('updateMemory should handle a failed update', async () => {
    server.use(
      rest.put(`${apiUrl}/memories/2`, (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: 'Memory not found' }))
      })
    )

    const result = await updateMemory(mockMemory2)
    expect(result.success).toBe(false)
    expect(result.message).toBe('Memory not found')
  })

  // getAllMemories
  it('getAllMemories should get all memories', async () => {
    const result = await getAllMemories()
    expect(result.success).toBe(true)
    expect(result.memories).toEqual(mockMemories)
  })

  it('getAllMemories should handle a failed GET', async () => {
    server.use(
      rest.get(`${apiUrl}/memories`, (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server Error' }))
      })
    )

    const result = await getAllMemories()
    expect(result.success).toBe(false)
    expect(result.message).toBe('Server Error')
  })
})
