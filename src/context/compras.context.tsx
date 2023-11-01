import { CompraMercadoData, CompraValuesType } from "@/types/compra-mercado"
import router, { useRouter } from "next/router"
import { ReactNode, createContext, useEffect, useState } from "react"

//types
import axios from "axios"


// ** Defaults
const defaultProvider: CompraValuesType = {
    errorMessage: null,
    setErrorMessage: () => null,

    sucessMessage: null,
    setSucessMessage: () => null,

    compras:null,
    setCompras: () => null, 

    compra: null,
    setCompra: () => null,


    handleDelete: () => Promise.resolve(),
    saveData: () => Promise.resolve(),
}

const ComprasContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const ComprasProvider = ({ children }: Props) => {
  // ** States
  const [errorMessage, setErrorMessage] = useState<string | null>(defaultProvider.errorMessage)
  const [sucessMessage, setSucessMessage] = useState<string | null>(defaultProvider.sucessMessage)
  const [compras, setCompras] = useState<CompraMercadoData[] | null>(defaultProvider.compras)
  const [compra, setCompra] = useState<CompraMercadoData | null>(defaultProvider.compra)
  const [deleted, setDeleted] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)



  // ** Hooks
  const router = useRouter()


  const loadData =async () =>{

    try{
        let result = await axios.get('http://backend.brenowillians.com.br')

        if(Array.isArray(result.data)){
            setCompras(result.data)
        }

    }
    catch(error){
        console.log(error)
        alert(error)
    }

}


  useEffect(()=>{
    loadData();
  },[deleted, saved])


const handleDelete = async(idCompra: number)=> {
    //Essa função envia para o backend a instrução para excluir o registro
    //que tenha o id passado por parametro
    if(confirm('Deseja realmente excluir esse registro?')){
        let exclusao = await axios.delete(`http://backend.brenowillians.com.br${idCompra}`)
        setDeleted(!deleted)
    }

}


//Função que salva os dados no backend
const saveData = async (idCompra: number)=>{

    //testando se o campo está vazio:
    let msgErro =""
    if(!compra?.descricaoCompra){
        msgErro += "Preencha o campo produto\n"
    }

    if(!compra?.valor){
        msgErro += "Preencha o campo valor\n"
    }

    // se a mensgem estiver preenchida com algum erro, exibe o erro e interrompe a rotina com o return
    if(msgErro){
        alert(msgErro)
        return
    }

    //Criando uma cópia do State para tranformar o valor em número
    let copiaCompra = {... compra}
    
    // o sinal +  antes do nome da propriedade, força a conversão da mesma para número 
    copiaCompra.valor = +copiaCompra.valor!
    console.log(copiaCompra.valor)

    //Se chegamos aqui, é pq a validação está ok. Caso contrário, a rotina teria sido
    // interrompida no return da linha 73
    if(idCompra){ // Se o id for um número, executaremos a atualização da compra
        //usar o axios com patch para atualizar o registro  no backend

        delete compra?.createdDate
        delete compra?.deletedDate
        delete compra?.updatedDate

        let resultado = await axios.patch(`http://backend.brenowillians.com.br${idCompra}`, copiaCompra)
        setSaved(!saved)
        router.replace('/lista')
    }
    else{ //Senão, excutaremos a criação da compra
        //usar o axios com post para criar o registro no backend
        let resultado =await axios.post('http://backend.brenowillians.com.br', copiaCompra)
        setSaved(!saved)
        router.replace('/lista')
    }
}

const values = {
    errorMessage,
    setErrorMessage,
    sucessMessage,
    setSucessMessage,
    compras,
    setCompras,
    compra,
    setCompra,
    handleDelete,
    saveData,
  }

  return <ComprasContext.Provider value={values}>{children}</ComprasContext.Provider>
}

export { ComprasContext, ComprasProvider }