import CloseIcon from '@mui/icons-material/Close'
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
      <Card elevation={1} sx={{ borderRadius: 2, height: '100%', border: '1px solid', borderColor: 'grey.300' }} component="form" onSubmit={actions.handleUpdate}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle2" fontWeight="bold">Editar Tarea #{task.id}</Typography>
            {actions.error && <Alert severity="error">{actions.error}</Alert>}
            <TextField label="Título" value={actions.title} onChange={(e) => actions.setTitle(e.target.value)} required fullWidth inputProps={{ minLength: 3, maxLength: 120 }} size="small" />
            <TextField label="Descripción" value={actions.description} onChange={(e) => actions.setDescription(e.target.value)} fullWidth multiline rows={2} size="small" />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField select label="Prioridad" value={actions.priority} onChange={(e) => actions.setPriority(e.target.value as any)} fullWidth size="small">
                <MenuItem value="LOW">Baja</MenuItem>
                <MenuItem value="MED">Media</MenuItem>
                <MenuItem value="HIGH">Alta</MenuItem>
              </TextField>
              <TextField label="Responsable ID" type="number" value={actions.assigneeId} onChange={(e) => actions.setAssigneeId(e.target.value)} fullWidth size="small" />
              
              <TextField 
                type="date" 
                label="Fecha límite" 
                InputLabelProps={{ shrink: true }} 
                value={actions.dueDate || ''} 
                onChange={(e) => actions.setDueDate(e.target.value)} 
                fullWidth 
                size="small" 
              />
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
          <Button type="submit" variant="contained" size="small" startIcon={<SaveIcon />} disabled={!actions.valid || actions.busy} disableElevation>
            {actions.busy ? 'Guardando…' : 'Guardar'}
          </Button>
          <Button startIcon={<CloseIcon />} size="small" onClick={actions.cancelEditing} disabled={actions.busy}>
            Cancelar
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2, 
        border: '1px solid',
        borderColor: 'grey.300',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { 
          borderColor: task.status === 'DONE' ? 'success.main' : 'primary.main',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-4px)'
        } 
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {actions.error && <Alert severity="error" sx={{ mb: 2 }}>{actions.error}</Alert>}
        
        <Stack spacing={1}>
          <Typography 
            variant="h6" 
            component="div" 
            fontWeight="700"
            sx={{
              background: task.status === 'TODO' 
                ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' 
                : task.status === 'IN_PROGRESS'
                ? 'linear-gradient(45deg, #ed6c02 30%, #ff9800 90%)'
                : 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              textDecoration: task.status === 'DONE' ? 'line-through' : 'none',
              textDecorationColor: task.status === 'DONE' ? '#2e7d32' : 'transparent',
            }}
          >
            {task.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
            {task.description || 'Sin descripción'}
          </Typography>
          
          <Typography variant="caption" display="block" color="text.disabled">
            ID: {task.id} | Assignee: {task.assigneeId || 'N/A'} {task.dueDate && ` | Límite: ${task.dueDate}`}
          </Typography>
          
          <Stack direction="row" spacing={1} mt={1}>
            <Chip label={task.status} size="small" color={task.status === 'DONE' ? 'success' : task.status === 'IN_PROGRESS' ? 'warning' : 'default'} sx={{ fontWeight: 'bold' }} />
            <Chip label={task.priority} size="small" variant="outlined" color={task.priority === 'HIGH' ? 'error' : 'default'} />
          </Stack>
        </Stack>
      </CardContent>
      
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2, pt: 0, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Estado"
          value={task.status}
          onChange={(e) => actions.handleChangeStatus(e.target.value as any)}
          disabled={actions.busy}
          sx={{ minWidth: 120 }}
          InputProps={{ sx: { height: 32 } }} 
        >
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
          <MenuItem value="DONE">DONE</MenuItem>
        </TextField>
        
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={actions.startEditing} disabled={actions.busy} sx={{ height: 32 }}>
            Editar
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={confirmDelete} disabled={actions.busy} sx={{ height: 32 }}>
            Eliminar
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}