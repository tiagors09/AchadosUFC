export interface ItemData {
  description: string
  lab?: string
  room?: string
  block?: string
  dropTime: string
}

export interface UploadedItem extends ItemData {
  id: string
  createdAt: string
}

export interface ItemFormProps {
  initialData?: UploadedItem | null
  onSubmit: (data: ItemData) => Promise<void>
}

export interface ItemContextType {
  items: UploadedItem[]
  uploadItem: (item: ItemData) => Promise<void>
  updateItem: (id: string, item: ItemData) => Promise<void>
  getItemById: (id: string) => Promise<UploadedItem | null>
  getItems: () => Promise<void>
  deleteItem: (id: string) => Promise<void>
}

export type Item = {
  id: string
  description: string
  createdAt: number
}


export type ItemCardProps = {
  item: Item
  onEdit: (item: Item) => void
  onDeleted?: (id: string) => void
}
