import { useEffect, useState } from 'react'
import { getProject } from '../services/projectService'
import type { Project } from '../types'

export function useProject(projectId: number) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getProject(projectId)
      .then((data) => {
        if (!cancelled) setProject(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar el proyecto')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [projectId])

  return { project, loading, error }
}
