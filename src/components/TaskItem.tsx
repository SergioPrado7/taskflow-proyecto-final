import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
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
      <Card elevation={3} sx={{ borderRadius: 2, mb: 2 }} component="form" onSubmit={actions.handleUpdate}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle2" fontWeight="bold">Editar Tarea #{task.id}</Typography>
            {actions.error && <Alert severity="error">{actions.error}</Alert>}
            <TextField label="Título" value={actions.title} onChange={(e) => actions.setTitle(e.target.value)} required fullWidth inputProps={{ minLength: 3, maxLength: 120 }} />
            <TextField label="Descripción" value={actions.description} onChange={(e) => actions.setDescription(e.target.value)} fullWidth multiline rows={2} />
            <TextField select label="Prioridad" value={actions.priority} onChange={(e) => actions.setPriority(e.target.value as any)} fullWidth>
              <MenuItem value="LOW">Baja</MenuItem>
              <MenuItem value="MED">Media</MenuItem>
              <MenuItem value="HIGH">Alta</MenuItem>
            </TextField>
            <TextField
              label="ID del Responsable (Assignee)"
              type="number"
              value={actions.assigneeId}
              onChange={(e) => actions.setAssigneeId(e.target.value)}
              fullWidth
              helperText="Deja vacío si no hay responsable"
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={!actions.valid || actions.busy}>
            {actions.saving ? 'Guardando…' : 'Guardar'}
          </Button>
          <Button startIcon={<CloseIcon />} onClick={actions.cancelEditing} disabled={actions.busy}>
            Cancelar
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card elevation={2} sx={{ borderRadius: 2, transition: '0.2s', '&:hover': { elevation: 4 } }}>
      <CardContent>
        {actions.error && <Alert severity="error" sx={{ mb: 2 }}>{actions.error}</Alert>}
        
        <Stack spacing={0.5}>
          <Typography variant="h6" component="div" fontWeight="500">{task.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 30 }}>
            {task.description || 'Sin descripción'}
          </Typography>
          <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 1 }}>
            ID: {task.id} | Assignee: {task.assigneeId || 'N/A'}
          </Typography>
          
          <Stack direction="row" spacing={1} mt={1.5}>
            <Chip label={task.status} size="small" color={task.status === 'DONE' ? 'success' : task.status === 'IN_PROGRESS' ? 'warning' : 'default'} />
            <Chip label={task.priority} size="small" variant="outlined" color={task.priority === 'HIGH' ? 'error' : 'default'} />
          </Stack>
        </Stack>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, bgcolor: 'grey.50', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <TextField
          select
          size="small"
          label="Estado"
          value={task.status}
          onChange={(e) => actions.handleChangeStatus(e.target.value as any)}
          disabled={actions.busy}
          sx={{ minWidth: 140, bgcolor: 'white' }}
        >
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
          <MenuItem value="DONE">DONE</MenuItem>
        </TextField>
        
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={actions.startEditing} disabled={actions.busy}>
            Editar
          </Button>
          <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={confirmDelete} disabled={actions.busy}>
            Eliminar
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}