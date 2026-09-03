import type { NewTask, Task, TaskStatusUpdate, UpdateTask } from '../types'
import { httpClient } from './httpClient'

export async function getTasksByProject(projectId: number): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>(`/projects/${projectId}/tasks`)
  return data
}

export async function createTask(projectId: number, body: NewTask): Promise<Task> {
  const { data } = await httpClient.post<Task>(`/projects/${projectId}/tasks`, body)
  return data
}

export async function updateTask(id: number, body: UpdateTask): Promise<Task> {
  const { data } = await httpClient.put<Task>(`/tasks/${id}`, body)
  return data
}

export async function deleteTask(id: number): Promise<void> {
  await httpClient.delete(`/tasks/${id}`)
}

export async function updateTaskStatus(id: number, body: TaskStatusUpdate): Promise<Task> {
  const { data } = await httpClient.patch<Task>(`/tasks/${id}/status`, body)
  return data
}