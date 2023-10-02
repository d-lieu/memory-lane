import { rest } from 'msw'
import { MemoryType } from '../types/global'

const apiUrl = 'http://localhost:4001'
const mockDate = '2023-10-01T03:02:42.000Z'

export const mockMemory: MemoryType = {
  id: 1,
  name: 'Sample Memory',
  description: 'Sample Description',
  timestamp: mockDate,
  image: 'sample.jpg',
}

export const mockMemory2: MemoryType = {
  id: 2,
  name: 'Updated Memory',
  description: 'Updated Description',
  timestamp: mockDate,
  image: 'updated.jpg',
}

export const mockMemories: MemoryType[] = [mockMemory, mockMemory2]

export const handlers = [
  rest.get(`${apiUrl}/memories`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        memories: mockMemories,
      })
    )
  }),

  rest.post(`${apiUrl}/memories`, async (req, res, ctx) => {
    const rjson = await req.text()
    const body = JSON.parse(rjson)
    const { name, description, timestamp, image } = body

    if (!name || !description || !timestamp || !image) {
      return res(
        ctx.status(400),
        ctx.json({
          error:
            'Please provide all fields: name, description, timestamp, image',
        })
      )
    }

    return res(
      ctx.status(201),
      ctx.json({ success: true, message: 'Memory created successfully' })
    )
  }),

  rest.put(`${apiUrl}/memories/:id`, async (req, res, ctx) => {
    const rjson = await req.text()
    const body = JSON.parse(rjson)
    const { name, description, timestamp, image } = body

    if (!name || !description || !timestamp || !image) {
      return res(
        ctx.status(400),
        ctx.json({
          error:
            'Please provide all fields: name, description, timestamp, image',
        })
      )
    }
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Memory updated successfully' })
    )
  }),

  rest.delete(`${apiUrl}/memories/:id`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Memory deleted successfully' })
    )
  }),

  rest.get(`${apiUrl}/memories/:id`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        mockMemory,
      })
    )
  }),
]
