import { Button } from '@/components/ui/button'
import type { ItemDetailsModalProps } from '../ItemTypes'

export function ItemDetailsModal({ item, open, onClose }: ItemDetailsModalProps) {
  if (!open || !item) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detalhes do Item</h2>

        <p><strong>Descrição:</strong> {item.description}</p>
        <p><strong>Laboratório:</strong> {item.lab || '-'}</p>
        <p><strong>Sala:</strong> {item.room || '-'}</p>
        <p><strong>Bloco:</strong> {item.block || '-'}</p>
        <p><strong>Horário da entrega:</strong> {new Date(item.dropTime).toLocaleDateString()}</p>
        <p><strong>Criado em:</strong> {new Date(item.createdAt).toLocaleString()}</p>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </div>
  )
}
