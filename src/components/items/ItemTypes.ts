export interface ItemData {
  description: string
  lab?: string
  room?: string
  block?: string
  dropTime: string
  imageUrl?: string
}

export interface UploadedItem extends ItemData {
  id: string
  createdAt: string
}

export interface ItemFormProps {
  initialData?: UploadedItem | null
  onSubmit: (data: ItemData, file?: File) => Promise<void>
}


export interface ItemContextType {
  items: UploadedItem[]
  uploadItem: (item: ItemData, file?: File) => Promise<void>
  updateItem: (id: string, item: ItemData) => Promise<void>
  getItemById: (id: string) => Promise<UploadedItem | null>
  getItems: () => Promise<void>
  deleteItem: (id: string) => Promise<void>
  markItemAsRetrieved: (id: string) => Promise<void>;
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
  children?: React.ReactNode;
}

export interface RetrievedItem {
  id: string;
  item: UploadedItem;
  retrievalDate: string;
  retrievedByUserId: string;
  retrievedByUserEmail: string;
  studentRegistration: string;
  studentCourse: string;
  observationNote?: string;
}

export interface RetrieveItemModalProps {
  item: UploadedItem
  open: boolean
  onClose: () => void
  onRetrieve: (data: RetrievedItem) => Promise<void>
}

export interface ItemDetailsModalProps {
  item: UploadedItem | null
  open: boolean
  onClose: () => void
}
