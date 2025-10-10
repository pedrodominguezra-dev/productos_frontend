type SetErrorFn = (field: string, error: { type: string; message: string }) => void

// Manejo de errores que devuelve el API de laravel con request
export function handleApiError(err: any, setError?: SetErrorFn): string {
  const res = err.response || {}
  const status = res.status
  const data = res.data || {}

  
  // Mensaje general
  const message =
    status === 401 ?
    data?.error || 'No autenticado, por favor inicia sesión.' 
    :
    status === 403 ?
    data?.message?.message || 'Acceso restringido, no tienes permisos para realizar esta acción.'
    :
    status === 422
      ? data?.message?.message || 'Existen errores en la información'
      : status === 500
        ? data?.message?.error || 'Ha sucedido un error al registrar la información'
        : data?.message?.message || 'Ha sucedido un error al registrar la información'

  // Errores de campo individuales
  if (status === 422 && data?.message?.errors && setError) {
    Object.entries(data.message.errors).forEach(([field, msgs]) => {
      setError(field, {
        type: 'server',
        message: (msgs as string[]).join(', ')
      })
    })
  }

  return message
}
