import { CompraMercadoData } from "@/types/compra-mercado"
import { useEffect, useState } from "react"

// ** Next Import
import { useRouter } from 'next/router'
import { useCompra } from "@/hooks/useCompra"
import { Grid, Card, CardContent, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"

export default function Lista() {
    const router = useRouter()
    const compraContext = useCompra()

    
    return (
    <>
            <Grid item xs={12}>

                <Card sx={{ mb: 6 }}>
                    <CardContent>
                        <TableContainer sx={{ maxHeight: 400 }}>
                            <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 500 }}>
                                <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
                                    <TableRow>
                                        <TableCell sx={{ height: '3.375rem' }}>Produto</TableCell>
                                        <TableCell sx={{ height: '3.375rem' }}>Preço</TableCell>
                                        <TableCell sx={{ height: '3.375rem' }}>Criado Em</TableCell>
                                        <TableCell sx={{ height: '3.375rem' }}>Atualizado Em</TableCell>
                                        <TableCell sx={{ height: '3.375rem' }}>Editar</TableCell>
                                        <TableCell sx={{ height: '3.375rem' }}>Data</TableCell>                          
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                { compraContext.compras && compraContext.compras.map((compra, index: number) =>
                                    (
                                        <TableRow key={index}>
                                            <TableCell>{compra.descricaoCompra}</TableCell>
                                            <TableCell>{compra.valor}</TableCell>
                                            <TableCell>{compra.createdDate}</TableCell>
                                            <TableCell>{compra.updatedDate}</TableCell>
                                            <TableCell>
                                                <Button onClick={()=>router.replace(`/detalhe/${compra.idCompra}`)}>
                                                    Editar
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={()=>compraContext.handleDelete(compra.idCompra!)}>
                                                    Excluir
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>    
    </>
    )
}
