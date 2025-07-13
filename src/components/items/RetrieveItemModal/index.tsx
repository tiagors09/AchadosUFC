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
import { useAuth } from '../../auth/AuthContext';
import { Textarea } from "@/components/ui/textarea";

const courses = [
  "Ciência da Computação",
  "Sistemas de Informação",
  "Engenharia de Software",
  "Engenharia da Computação",
  "Design Digital",
  "Redes de Computadores"
]

export const RetrieveItemModal = ({ item, open, onClose, onRetrieve }: RetrieveItemModalProps) => {
  const { user } = useAuth(); // Get authenticated user info
  const [studentRegistration, setStudentRegistration] = useState("")
  const [studentCourse, setStudentCourse] = useState("")
  const [observationNote, setObservationNote] = useState<string>(""); // Changed from undefined to empty string

  const handleSubmit = async () => {
    if (!studentRegistration || !studentCourse) {
      toast.error("Preencha todos os campos obrigatórios: Matrícula e Curso.")
      return
    }

    if (!user) {
      toast.error("Erro: Usuário não autenticado.");
      return;
    }

    const data: RetrievedItem = {
      id: item.id,
      item: item,
      retrievalDate: new Date().toISOString(),
      retrievedByUserId: user.uid as string,
      retrievedByUserEmail: user.email || "",
      studentRegistration,
      studentCourse,
      observationNote: observationNote, // Alterado de observationNote || undefined
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
            <Label>Matrícula do Aluno</Label>
            <Input value={studentRegistration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentRegistration(e.target.value)} />
          </div>
          <div>
            <Label>Curso do Aluno</Label>
            <Select value={studentCourse} onValueChange={setStudentCourse}>
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
          <div>
            <Label htmlFor="observationNote">Nota de Observação (Opcional)</Label>
            <Textarea
              id="observationNote"
              value={observationNote}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setObservationNote(e.target.value)}
              placeholder="Adicione qualquer observação relevante sobre a retirada..."
            />
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
