import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export function TaskList({ tasks, loading, error }: TaskListProps) {
  if (loading) {
    return <Stack alignItems="center" py={4}><CircularProgress /></Stack>
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (tasks.length === 0) {
    return <Typography color="text.secondary">Este proyecto aún no tiene tareas.</Typography>
  }

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Tareas ({tasks.length})</Typography>
      {tasks.map((task) => (
        <Paper key={task.id} variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description || 'Sin descripción'}
              </Typography>
            </Box>
            <Stack spacing={1} alignItems="flex-end">
              <Chip label={task.status} size="small" color={task.status === 'DONE' ? 'success' : 'default'} />
              <Chip label={task.priority} size="small" variant="outlined" color={task.priority === 'HIGH' ? 'error' : 'default'} />
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}