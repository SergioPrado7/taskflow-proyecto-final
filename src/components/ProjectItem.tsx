import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useProjectActions } from '../hooks/useProjectActions'
import type { Project } from '../types'

interface ProjectItemProps {
  project: Project
  onChanged: () => void
}

export function ProjectItem({ project, onChanged }: ProjectItemProps) {
  const actions = useProjectActions({ project, onSuccess: onChanged })
  const navigate = useNavigate()

  function confirmDelete() {
    if (window.confirm(`¿Eliminar el proyecto "${project.name}"? También se eliminarán sus tareas.`)) {
      void actions.handleDelete()
    }
  }

  if (actions.editing) {
    return (
      <Card elevation={3} sx={{ borderRadius: 2, mb: 2 }} component="form" onSubmit={actions.handleUpdate}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight="bold">Editar proyecto #{project.id}</Typography>
            {actions.error && <Alert severity="error">{actions.error}</Alert>}
            <TextField label="Nombre" value={actions.name} onChange={(e) => actions.setName(e.target.value)} required fullWidth inputProps={{ minLength: 3, maxLength: 80 }} />
            <TextField label="Descripción" value={actions.description} onChange={(e) => actions.setDescription(e.target.value)} fullWidth multiline rows={2} />
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
        <Typography variant="h6" component="div" fontWeight="500">
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 40 }}>
          {project.description || 'Sin descripción asignada.'}
        </Typography>
        <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 2 }}>
          ID: {project.id} | Creado: {project.createdAt}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, bgcolor: 'grey.50' }}>
        <Button size="small" variant="contained" color="primary" startIcon={<ListAltIcon />} onClick={() => navigate(`/projects/${project.id}/tasks`)}>
          Ver Tareas
        </Button>
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