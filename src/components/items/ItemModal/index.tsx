import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { ItemData, UploadedItem } from '../ItemTypes'
import ItemForm from '../ItemForm'

interface ItemModalProps {
  triggerLabel?: string
  initialData?: UploadedItem | null
  onSubmit: (data: ItemData) => Promise<void>
  open?: boolean
  onClose?: () => void
}

export default function ItemModal({
  triggerLabel,
  initialData,
  onSubmit,
  open,
  onClose
}: ItemModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      {!open && triggerLabel && (
        <DialogTrigger asChild>
          <Button variant="default">{triggerLabel}</Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Item' : 'Novo Item'}</DialogTitle>
        </DialogHeader>

        <ItemForm initialData={initialData} onSubmit={onSubmit} />

        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full cursor-pointer">
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
