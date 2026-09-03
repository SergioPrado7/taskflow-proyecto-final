import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useAuth } from '../hooks/useAuth'
import { useTaskForm } from '../hooks/useTaskForm'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { logout } = useAuth()
  
  const id = Number(projectId)
  const { tasks, loading, error, refetch } = useTasks(id)
  const taskForm = useTaskForm({ projectId: id, onSuccess: refetch })

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'grey.100', minHeight: '100vh', pb: 6 }}>
      {/* Navbar idéntico al Dashboard */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            TaskFlow
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenido Principal */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ bgcolor: 'white' }}>
            Volver
          </Button>
          <Typography variant="h5" color="text.primary" fontWeight="500">
            Tareas del Proyecto #{id}
          </Typography>
        </Stack>

        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <TaskForm {...taskForm} />
        </Paper>

        <TaskList tasks={tasks} loading={loading} error={error} onChanged={refetch} />
      </Container>
    </Box>
  )
}