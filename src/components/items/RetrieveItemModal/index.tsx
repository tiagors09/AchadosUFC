import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { format } from "date-fns"
import type { RetrievedItem, RetrieveItemModalProps } from "../ItemTypes"

const courses = [
  "Ciência da Computação",
  "Sistemas de Informação",
  "Engenharia de Software",
  "Engenharia da Computação",
  "Design Digital",
  "Redes de Computadores"
]

export const RetrieveItemModal = ({ item, open, onClose, onRetrieve }: RetrieveItemModalProps) => {
  const [name, setName] = useState("")
  const [enrollment, setEnrollment] = useState("")
  const [course, setCourse] = useState("")

  const handleSubmit = async () => {
    if (!name || !enrollment || !course) {
      toast.error("Preencha todos os campos.")
      return
    }

    const data: RetrievedItem = {
      id: item.id,
      item,
      retrievedAt: new Date().toISOString(),
      student: { name, enrollment, course }
    }

    try {
      await onRetrieve(data)
      toast.success("Item marcado como retirado.")
      onClose()
    } catch {
      toast.error("Erro ao registrar retirada.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Retirada do Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Nome do Aluno</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Matrícula</Label>
            <Input value={enrollment} onChange={(e) => setEnrollment(e.target.value)} />
          </div>
          <div>
            <Label>Curso</Label>
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um curso" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((courseOption) => (
                  <SelectItem key={courseOption} value={courseOption}>
                    {courseOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            Retirada em: <strong>{format(new Date(), "dd/MM/yyyy HH:mm")}</strong>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSubmit}>Confirmar Retirada</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
