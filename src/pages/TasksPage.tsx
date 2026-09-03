import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useTaskForm } from '../hooks/useTaskForm'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  
  const id = Number(projectId)
  const { tasks, loading, error, refetch } = useTasks(id)
  const taskForm = useTaskForm({ projectId: id, onSuccess: refetch })

  return (
    <Box maxWidth={720} mx="auto" mt={6} px={2}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')}>
          Volver
        </Button>
        <Typography variant="h4">Tareas del Proyecto #{id}</Typography>
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TaskForm {...taskForm} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <TaskList tasks={tasks} loading={loading} error={error} />
      </Paper>
    </Box>
  )
}