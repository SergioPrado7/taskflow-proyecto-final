import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function DashboardPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <Box maxWidth={640} mx="auto" mt={6}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Dashboard</Typography>
        <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Stack>
      <Typography color="text.secondary">
        Fase 2 — rutas protegidas. En la Fase 3 agregamos la lista de proyectos acá.
      </Typography>
    </Box>
  )
}