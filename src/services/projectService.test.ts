import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Project } from '../types'
import { httpClient } from './httpClient'
import { deleteProject, getProject, getProjects } from './projectService'

vi.mock('./httpClient', () => ({
  httpClient: { get: vi.fn(), delete: vi.fn() },
}))

const project: Project = {
  id: 3,
  name: 'Portfolio',
  ownerId: 1,
  createdAt: '2026-09-04',
}

describe('projectService', () => {
  beforeEach(() => vi.clearAllMocks())

  it('loads every project', async () => {
    vi.mocked(httpClient.get).mockResolvedValue({ data: [project] })
    await expect(getProjects()).resolves.toEqual([project])
    expect(httpClient.get).toHaveBeenCalledWith('/projects')
  })

  it('loads one project for direct task-page navigation', async () => {
    vi.mocked(httpClient.get).mockResolvedValue({ data: project })
    await expect(getProject(3)).resolves.toEqual(project)
    expect(httpClient.get).toHaveBeenCalledWith('/projects/3')
  })

  it('deletes a project by id', async () => {
    vi.mocked(httpClient.delete).mockResolvedValue({})
    await deleteProject(3)
    expect(httpClient.delete).toHaveBeenCalledWith('/projects/3')
  })
})
