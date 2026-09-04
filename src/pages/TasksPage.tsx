import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  AppBar, Box, Button, Container, Paper,
  Stack, Toolbar, Typography
} from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useAuth } from '../hooks/useAuth'
import { useTaskForm } from '../hooks/useTaskForm'
import { useTasks } from '../hooks/useTasks'
import { useProject } from '../hooks/useProject'

export function TasksPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showForm, setShowForm] = useState(false)
  
  const id = Number(projectId)
  const { tasks, loading, error, refetch } = useTasks(id)
  const { project, loading: projectLoading, error: projectError } = useProject(id)

  const taskForm = useTaskForm({ 
    projectId: id, 
    onSuccess: () => {
      refetch()
      setShowForm(false)
    } 
  })

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'grey.50', minHeight: '100vh', pb: 8 }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            TaskFlow
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box mb={4}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'flex-start', sm: 'center' }} 
            spacing={3} 
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button 
                variant="outlined" 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate('/dashboard')} 
                sx={{ bgcolor: 'white' }}
              >
                Volver
              </Button>
              <Typography variant="h4" color="text.primary" fontWeight="bold">
                {projectLoading ? 'Cargando proyecto…' : project?.name ?? `Proyecto #${id}`}
              </Typography>
            </Stack>

            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => setShowForm(!showForm)}
              disableElevation
            >
              {showForm ? 'Cancelar' : 'Nueva Tarea'}
            </Button>
          </Stack>
        </Box>

        {projectError && (
          <Typography color="error" sx={{ mb: 3 }}>{projectError}</Typography>
        )}

        {showForm && (
          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2, border: '1px solid', borderColor: 'grey.300' }}>
            <Typography variant="h6" gutterBottom fontWeight="500">
              Crear Nueva Tarea
            </Typography>
            <TaskForm {...taskForm} />
          </Paper>
        )}

        <TaskList tasks={tasks} loading={loading} error={error} onChanged={refetch} />
      </Container>
    </Box>
  )
}
