import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  busy?: boolean
  error?: string | null
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  busy = false,
  error,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={busy ? undefined : onCancel} aria-labelledby="confirm-dialog-title">
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={busy}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={busy} autoFocus>
          {busy ? 'Eliminando…' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
