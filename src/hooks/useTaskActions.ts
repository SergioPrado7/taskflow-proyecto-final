import { useState, type FormEvent } from 'react'
import { deleteTask, updateTask, updateTaskStatus } from '../services/taskService'
import type { Task, TaskPriority, TaskStatus } from '../types'

interface UseTaskActionsOptions {
  task: Task
  onSuccess?: () => void
}

export function useTaskActions({ task, onSuccess }: UseTaskActionsOptions) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [priority, setPriority] = useState<TaskPriority>(task.priority)
  
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const valid = title.trim().length >= 3 && title.trim().length <= 120
  const busy = saving || deleting || statusUpdating

  function startEditing() {
    setTitle(task.title)
    setDescription(task.description ?? '')
    setPriority(task.priority)
    setError(null)
    setEditing(true)
  }

  function cancelEditing() {
    setEditing(false)
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault()
    if (!valid || busy) return
    setSaving(true)
    setError(null)

    try {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      })
      setEditing(false)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (busy) return
    setDeleting(true)
    setError(null)

    try {
      await deleteTask(task.id)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la tarea')
    } finally {
      setDeleting(false)
    }
  }

  async function handleChangeStatus(newStatus: TaskStatus) {
    if (busy || task.status === newStatus) return
    setStatusUpdating(true)
    setError(null)

    try {
      await updateTaskStatus(task.id, { status: newStatus })
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado (Si pasas a DONE sin responsable, el API tira 422)')
    } finally {
      setStatusUpdating(false)
    }
  }

  return {
    editing, title, setTitle, description, setDescription, priority, setPriority,
    saving, deleting, statusUpdating, error, valid, busy,
    startEditing, cancelEditing, handleUpdate, handleDelete, handleChangeStatus
  }
}