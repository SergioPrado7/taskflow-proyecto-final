import { useState } from 'react'
import { createTask } from '../services/taskService'
import type { TaskPriority } from '../types'

interface UseTaskFormOptions {
  projectId: number
  onSuccess?: () => void
}

export function useTaskForm({ projectId, onSuccess }: UseTaskFormOptions) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('LOW')
  const [assigneeId, setAssigneeId] = useState<string>('')
  const [dueDate, setDueDate] = useState('')
  
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const valid = title.trim().length >= 3 && title.trim().length <= 120

  function reset() {
    setTitle('')
    setDescription('')
    setPriority('LOW')
    setAssigneeId('')
    setDueDate('')
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      await createTask(projectId, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        assigneeId: assigneeId.trim() !== '' ? Number(assigneeId) : undefined,
        dueDate: dueDate.trim() !== '' ? dueDate : undefined,
      })
      reset()
      onSuccess?.()
    } catch (err: any) {
      const backendError = err.response?.data?.message || err.response?.data?.error || err.message;
      
      const errorText = typeof err.response?.data === 'object' ? JSON.stringify(err.response.data) : backendError;
      
      setError(`Rechazado por el backend: ${errorText}`);
    } finally {
      setSubmitting(false)
    }
  }

  return {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    assigneeId, setAssigneeId,
    submitting,
    error,
    valid,
    handleSubmit,
    dueDate, setDueDate
  }
}
