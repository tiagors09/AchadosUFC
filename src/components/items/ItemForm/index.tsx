import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { ItemData, ItemFormProps } from '../ItemTypes';
import { useEffect, useState } from 'react';

export default function ItemForm({ initialData = null, onSubmit }: ItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ItemData>({
    defaultValues: initialData || {
      description: '',
      lab: '',
      room: '',
      block: '',
      dropTime: ''
    }
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Atualiza o form se mudar initialData (útil para edição)
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  async function submitHandler(data: ItemData) {
    try {
      await onSubmit(data, imageFile ?? undefined) // envia o arquivo junto
      toast.success('Item salvo com sucesso!')
      reset()
      setImageFile(null)
    } catch (error) {
      toast.error('Erro ao salvar o item.')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="description">Descrição *</Label>
        <Input
          id="description"
          {...register('description', { required: 'Descrição é obrigatória' })}
          aria-invalid={errors.description ? 'true' : 'false'}
        />
        {errors.description && (
          <p role="alert" className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="lab">Laboratório</Label>
        <Input id="lab" {...register('lab')} />
      </div>

      <div>
        <Label htmlFor="room">Sala</Label>
        <Input id="room" {...register('room')} />
      </div>

      <div>
        <Label htmlFor="block">Bloco</Label>
        <Input id="block" {...register('block')} />
      </div>

      <div>
        <Label htmlFor="dropTime">Horário da entrega *</Label>
        <Input
          id="dropTime"
          type="date"
          {...register('dropTime', { required: 'Horário da entrega é obrigatório' })}
          aria-invalid={errors.dropTime ? 'true' : 'false'}
        />
        {errors.dropTime && (
          <p role="alert" className="text-red-600 text-sm mt-1">
            {errors.dropTime.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Imagem do item</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0])
            }
          }}
        />
      </div>

      <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : initialData ? 'Atualizar Item' : 'Cadastrar Item'}
      </Button>
    </form>
  );
}
