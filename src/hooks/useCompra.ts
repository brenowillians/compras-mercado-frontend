import { useContext } from 'react'
import { ComprasContext } from '../context/compras.context'

export const useCompra = () => useContext(ComprasContext)