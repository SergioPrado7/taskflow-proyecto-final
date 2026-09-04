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
import type { Task } from '../types'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  error: string | null
  onChanged: () => void
}

export function TaskList({
  tasks,
  loading,
  error,
  onChanged,
}: TaskListProps) {
  const [sortBy, setSortBy] = useState('id_asc')
  const [filterStatus, setFilterStatus] = useState('ALL')

  const processedTasks = useMemo(() => {
    let result = [...tasks]

    if (filterStatus !== 'ALL') {
      result = result.filter((t) => t.status === filterStatus)
    }

    result.sort((a, b) => {
      if (sortBy === 'id_asc') return a.id - b.id
      if (sortBy === 'id_desc') return b.id - a.id
      if (sortBy === 'name_asc') return a.title.localeCompare(b.title)
      if (sortBy === 'name_desc') return b.title.localeCompare(a.title)

      return 0
    })

    return result
  }, [tasks, sortBy, filterStatus])

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

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="flex-end"
        mb={3}
      >
        <TextField
          select
          size="small"
          label="Filtrar estado"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{
            minWidth: 150,
            bgcolor: 'white',
          }}
        >
          <MenuItem value="ALL">Todos</MenuItem>
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
          <MenuItem value="DONE">DONE</MenuItem>
        </TextField>

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

      {processedTasks.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
          }}
          variant="outlined"
        >
          <Typography color="text.secondary">
            No hay tareas que coincidan con los filtros.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {processedTasks.map((task) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 6 }}
              key={task.id}
            >
              <TaskItem
                task={task}
                onChanged={onChanged}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}