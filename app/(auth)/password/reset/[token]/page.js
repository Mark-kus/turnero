import Button from '@/app/ui/Button'
import Label from '@/app/ui/Label'
import UnborderedInput from '@/app/ui/UnborderedInput'
import React from 'react'

const ResetPassword = () => {
  return (
    <>
      <h1 className='text-4xl font-bold'>Cambiar contraseña</h1>
      <p className='mb-6 mt-2'>
        Ingresá tu nueva contraseña. Debe ser distinta a la contraseña anterior. Una vez que confirmado, podrás ingresar
        a la plataforma con la contraseña nueva.
      </p>
      <label>
        <Label>Ingresar nueva contraseña</Label>
        <UnborderedInput
          className='mb-4'
          placeholder={'Ingresar contraseña'}
        />
      </label>
      <label>
        <Label>Repetir nueva contraseña</Label>
        <UnborderedInput placeholder={'Repetir contraseña'} />
      </label>
      <Button className={'mt-8 w-full'}>Confirmar cambio de contraseña</Button>
    </>
  )
}

export default ResetPassword
