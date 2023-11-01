export type CompraValuesType = {

    errorMessage: string | null
    setErrorMessage: (value: string | null) => void

    sucessMessage: string | null
    setSucessMessage: (value: string | null) => void

    compras: CompraMercadoData[] | null
    setCompras: (value: CompraMercadoData[] | null) => void 

    compra: CompraMercadoData | null
    setCompra: (value: CompraMercadoData | null) => void 

    handleDelete: (idPeca: number) => void
    saveData: (idPeca: number) => void
    
}


export interface CompraMercadoData {
    idCompra?: number;
    descricaoCompra: string | null;
    valor: number;
    createdDate?: string;
    updatedDate?: string;
    deletedDate?: string;
}