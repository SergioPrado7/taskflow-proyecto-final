import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  AppBar, Box, Button, Container, Paper,
  Stack, Toolbar, Typography
} from '@mui/material'
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
    <Box sx={{ flexGrow: 1, bgcolor: 'grey.50', minHeight: '100vh', pb: 8 }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            TaskFlow
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}
          >
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
            <Box>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                Mis Proyectos
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Gestiona tus espacios de trabajo
              </Typography>
            </Box>
            
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => setShowForm(!showForm)}
              disableElevation
            >
              {showForm ? 'Cancelar' : 'Nuevo Proyecto'}
            </Button>
          </Stack>
        </Box>

        {showForm && (
          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2, border: '1px solid', borderColor: 'grey.300' }}>
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