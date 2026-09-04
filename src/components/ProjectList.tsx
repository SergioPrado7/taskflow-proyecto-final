import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box  from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Project } from '../types'
import { ProjectItem } from './ProjectItem'

interface ProjectListProps {
  projects: Project[]
  loading: boolean
  error: string | null
  onChanged: () => void
}

export function ProjectList({
  projects,
  loading,
  error,
  onChanged,
}: ProjectListProps) {
  if (loading) {
    return (
      <Stack alignItems="center" py={6}>
        <CircularProgress />
      </Stack>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (projects.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }} variant="outlined">
        <Typography color="text.secondary">No hay proyectos registrados todavía. ¡Crea uno nuevo!</Typography>
      </Paper>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
            <ProjectItem project={project} onChanged={onChanged} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}