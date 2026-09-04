import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'
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
  const [sortBy, setSortBy] = useState('id_asc')

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortBy === 'id_asc') return a.id - b.id
      if (sortBy === 'id_desc') return b.id - a.id
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name)

      return 0
    })
  }, [projects, sortBy])

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
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
        }}
        variant="outlined"
      >
        <Typography color="text.secondary">
          No hay proyectos. ¡Crea uno nuevo!
        </Typography>
      </Paper>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        mb={3}
      >
        <TextField
          select
          size="small"
          label="Ordenar por"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{
            minWidth: 180,
            bgcolor: 'white',
          }}
        >
          <MenuItem value="id_asc">
            ID (Menor a Mayor)
          </MenuItem>

          <MenuItem value="id_desc">
            ID (Mayor a Menor)
          </MenuItem>

          <MenuItem value="name_asc">
            Nombre (A - Z)
          </MenuItem>

          <MenuItem value="name_desc">
            Nombre (Z - A)
          </MenuItem>
        </TextField>
      </Stack>

      <Grid container spacing={3}>
        {sortedProjects.map((project) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={project.id}
          >
            <ProjectItem
              project={project}
              onChanged={onChanged}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}