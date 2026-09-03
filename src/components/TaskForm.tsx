import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { TaskPriority } from '../types'

interface TaskFormProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  priority: TaskPriority
  setPriority: (value: TaskPriority) => void
  assigneeId: string
  setAssigneeId: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function TaskForm({
  title, setTitle,
  description, setDescription,
  priority, setPriority,
  assigneeId, setAssigneeId,
  submitting, error, valid, handleSubmit,
}: TaskFormProps) {
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Nueva Tarea</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Título *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        helperText="Entre 3 y 120 caracteres"
        inputProps={{ minLength: 3, maxLength: 120 }}
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          select
          label="Prioridad"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          fullWidth
        >
          <MenuItem value="LOW">Baja (LOW)</MenuItem>
          <MenuItem value="MED">Media (MED)</MenuItem>
          <MenuItem value="HIGH">Alta (HIGH)</MenuItem>
        </TextField>

        <TextField
          label="ID del Responsable (Opcional)"
          type="number"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          fullWidth
        />
      </Stack>

      <Button type="submit" variant="contained" disabled={!valid || submitting}>
        {submitting ? 'Creando…' : 'Crear tarea'}
      </Button>
    </Stack>
  )
}