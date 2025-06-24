export interface ItemData {
  description: string
  location: string
  lab?: string
  room?: string
  block?: string
  dropTime: string
}

export interface UploadedItem extends ItemData {
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
}
