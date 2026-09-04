import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { API_URL } from '../types'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('ana')
  const [password, setPassword] = useState('ana123')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await login(username, password)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error ?? 'No se pudo iniciar sesión.')
    }
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: 'grey.100',
        p: 2
      }}
    >
      <Card elevation={3} sx={{ maxWidth: 400, width: '100%', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                TaskFlow
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inicia sesión para gestionar tus proyectos
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {error && <Alert severity="error">{error}</Alert>}

                <Alert severity="info" variant="outlined" sx={{ py: 0 }}>
                  <Typography variant="caption">
                    API: {API_URL}
                  </Typography>
                </Alert>

                <TextField
                  label="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  autoComplete="username"
                  variant="outlined"
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  autoComplete="current-password"
                  variant="outlined"
                />
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  disabled={loading}
                  sx={{ mt: 1, py: 1.5, fontWeight: 'bold' }}
                >
                  {loading ? 'Entrando…' : 'Iniciar sesión'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}