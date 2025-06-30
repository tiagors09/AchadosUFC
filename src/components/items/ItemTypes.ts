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

export interface ItemCardProps {
  item: UploadedItem
  onEdit?: (item: UploadedItem) => void
  onDeleted?: (id: string) => Promise<void>
  editable?: boolean
}

export interface RetrievedItem {
  id: string
  item: UploadedItem
  retrievedAt: string
  student: {
    name: string
    enrollment: string
    course: string
  }
}
