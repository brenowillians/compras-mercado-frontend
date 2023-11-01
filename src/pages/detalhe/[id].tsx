import { CompraMercadoData } from "@/types/compra-mercado"
import { useEffect, useState } from "react"
import axios from "axios"
// ** Next Import
import { useRouter } from 'next/router'
import { useCompra } from "@/hooks/useCompra"
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Paper, TextField, Typography } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from "react"



const defaultValue: CompraMercadoData ={
    descricaoCompra: "",
    valor: 0,
}

export default function Lista() {
    const router = useRouter()
    const compraContext = useCompra()

    //Captura o id passado na URL
    const {id} = router.query;


    //Dentro desse useEffect, verificamos se o id é um número.
    //Se for um número, a função loadData vai no backend buscar os dados do respectivo ID e preencher o state com esses dados
    //caso contrário, o state permanecerá com o valor do defaultValue.
    useEffect(()=>{


        //Aqui declaramos a funnção loadData
        const loadData =async () =>{

            try{
                let result = await axios.get(`http://localhost:6010/${id}`)

                if(result.data){
                    compraContext.setCompra(result.data)
                    console.log('data')
                }
                else{
                    alert('o item não existe')
                }

            }
            catch(error){
                console.log(error)
                alert(error)
            }

        }

        //Só invocamos a loadData, se o id for um número inteiro
        if(Number.parseInt(id as string)){
            loadData();
        }

    },[id])


    //Função para manipular a digitação no campo Produto
    const handleControlProduto = (event: any) => {
        //fazendo uma copia do state compra para poder editar
        // Um state sempre é IMUTÁVEL. Por isso, a cópia é necessária
        let compraCopia = {... compraContext.compra!}

        //event: evento que invocou esta função (onChange, onBlur etc...)
        //target: controle (input) de onde o evento foi invocado
        //value: conteúdo escrito dentro do controle(input)

        //Atualizando a propriedade com o value do controle
        compraCopia.descricaoCompra = event.target.value
        console.log(event.target.value)

        //configurando o state com os novos valores da cópia 
        compraContext.setCompra(compraCopia)
    }

    //Função para manipular a digitação no campo valor
    const handleControlValor = (event: any) => {
        //fazendo uma copia do state compra para poder editar
        // Um state sempre é IMUTÁVEL. Por isso, a cópia é necessária
        let compraCopia = {... compraContext.compra!}

        //event: evento que invocou esta função (onChange, onBlur etc...)
        //target: controle (input) de onde o evento foi invocado
        //value: conteúdo escrito dentro do controle(input)

        //Atualizando a propriedade com o value do controle
        compraCopia.valor = event.target.value
        console.log(event.target.value)

        //configurando o state com os novos valores da cópia 
        compraContext.setCompra(compraCopia)
    }

    let idCompra=0


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#C0C0C0',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
    <>

        
    
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
            <Typography component="div">
            <Box sx={{ fontStyle: 'italic', m: 1 }}>
                <Stack spacing={2}>
                    <Item>NOVA COMPRA</Item>
                </Stack></Box>

                
                </Typography>

                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" label="Produto" variant="outlined" type="text" 
                        value={compraContext.compra?.descricaoCompra ?? ""}
                        onChange={handleControlProduto}/>
                    <TextField id="filled-basic" label="Valor" variant="filled" type="number" 
                        value={compraContext.compra?.valor ?? ""}
                        onChange={handleControlValor} />
                    <Button variant="contained" onClick={()=> compraContext.saveData(idCompra)}>Salvar</Button>
                    <Button variant="contained" onClick={() =>router.replace('/lista')}>Cancelar</Button>

                </Box>
                
            </Container>
            
        </React.Fragment>
                       
        
    </>
    )
}
