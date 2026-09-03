import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTaskActions } from '../hooks/useTaskActions'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onChanged: () => void
}

export function TaskItem({ task, onChanged }: TaskItemProps) {
  const actions = useTaskActions({ task, onSuccess: onChanged })

  function confirmDelete() {
    if (window.confirm(`¿Eliminar la tarea "${task.title}"?`)) {
      void actions.handleDelete()
    }
  }

  if (actions.editing) {
    return (
      <Paper variant="outlined" component="form" onSubmit={actions.handleUpdate} sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Editar Tarea #{task.id}</Typography>
          {actions.error && <Alert severity="error">{actions.error}</Alert>}
          <TextField
            label="Título"
            value={actions.title}
            onChange={(e) => actions.setTitle(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 3, maxLength: 120 }}
          />
          <TextField
            label="Descripción"
            value={actions.description}
            onChange={(e) => actions.setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            select
            label="Prioridad"
            value={actions.priority}
            onChange={(e) => actions.setPriority(e.target.value as any)}
            fullWidth
          >
            <MenuItem value="LOW">Baja</MenuItem>
            <MenuItem value="MED">Media</MenuItem>
            <MenuItem value="HIGH">Alta</MenuItem>
          </TextField>

          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={!actions.valid || actions.busy}>
              {actions.saving ? 'Guardando…' : 'Guardar'}
            </Button>
            <Button startIcon={<CloseIcon />} onClick={actions.cancelEditing} disabled={actions.busy}>
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        {actions.error && <Alert severity="error">{actions.error}</Alert>}
        
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description || 'Sin descripción'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID {task.id} · Assignee {task.assigneeId || 'N/A'}
            </Typography>
            
            <Stack direction="row" spacing={1} mt={1}>
              <Chip label={task.status} size="small" color={task.status === 'DONE' ? 'success' : task.status === 'IN_PROGRESS' ? 'warning' : 'default'} />
              <Chip label={task.priority} size="small" variant="outlined" color={task.priority === 'HIGH' ? 'error' : 'default'} />
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <TextField
              select
              size="small"
              label="Cambiar Estado"
              value={task.status}
              onChange={(e) => actions.handleChangeStatus(e.target.value as any)}
              disabled={actions.busy}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </TextField>
            
            <Stack direction="row" spacing={1}>
              <Button size="small" startIcon={<EditIcon />} onClick={actions.startEditing} disabled={actions.busy}>
                Editar
              </Button>
              <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={confirmDelete} disabled={actions.busy}>
                Eliminar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}