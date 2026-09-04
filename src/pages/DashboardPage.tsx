import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectForm } from '../components/ProjectForm'
import { ProjectList } from '../components/ProjectList'
import { useAuth } from '../hooks/useAuth'
import { useProjectForm } from '../hooks/useProjectForm'
import { useProjects } from '../hooks/useProjects'

export function DashboardPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { projects, loading, error, refetch } = useProjects()
  const [showForm, setShowForm] = useState(false)

  const projectForm = useProjectForm({ 
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
    <Box sx={{ flexGrow: 1, bgcolor: 'grey.100', minHeight: '100vh', pb: 8 }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            TaskFlow
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="inherit" size="small" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Salir
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', sm: 'center' }} 
          spacing={2}
          mb={4}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Mis Proyectos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gestiona tus espacios de trabajo y tareas asignadas.
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => setShowForm(!showForm)}
            sx={{ fontWeight: 'bold', borderRadius: 2 }}
          >
            {showForm ? 'Cancelar' : 'Nuevo Proyecto'}
          </Button>
        </Stack>

        {showForm && (
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom fontWeight="500">
              Crear Nuevo Proyecto
            </Typography>
            <ProjectForm {...projectForm} />
          </Paper>
        )}

        <ProjectList projects={projects} loading={loading} error={error} onChanged={refetch} />
      </Container>
    </Box>
  )
}