import { Header } from '../../components/Header'
import { GridProducts } from '../../components/GridProducts'

export const ProductsPage = () => {
  return (
    <>
    <Header />

    <main className='max-w-7xl mx-auto p-4 mt-3'>
        <h2 className='text-3xl mb-1'>Gestión de inventario</h2>
        <p>Lista completa de productos disponibles</p>
        
        <GridProducts />

    </main>
    </>
  )
}
