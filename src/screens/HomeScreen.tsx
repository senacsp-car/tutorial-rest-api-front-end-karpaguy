import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { convertToObject } from "typescript";

type Item ={
    id?:number;
    nome?:string;
    descricao?:string;
}

export default function HomeScreen(){
    const [itens, setItens] = useState<Item[]>([]);
    const [salvaNome, setSalvaNome] = useState<string>();
    const [salvaDescricao, setSalvaDescricao] = useState<string>();
    const [salvaId, setSalvaId] = useState<number>();

    const [itemSelecionado, setItemSelecionado] = useState<Item>();
    const [optionNumber, setOptionNumber] = useState<number>();

    useEffect(function (){
        axios.get('http://localhost:4000/api/itens')
        .then(function (response) {
            setItens(response.data);
        })
        .catch(function (error) {
            alert(error);   
        });
    },[]);

    function botaoSalvarClicado() {
        if((salvaNome !== undefined) && (salvaDescricao !== undefined)){
            const itemToSave: Item = {
                nome:salvaNome,
                descricao:salvaDescricao
            }

            axios.post('http://localhost:4000/api/itens',itemToSave)
            .then()
            .catch();

            location.reload();
        }
    }

    function botaoSelecionarItem(id : number | undefined) {
        if(id !== undefined) {
            axios.get(`http://localhost:4000/api/itens/${id}`)
            .then(function (response) {
                setItemSelecionado(response.data);
                // const itemSelecionado: Item = response.data;
                console.log(itemSelecionado?.id);
            })
            .catch(function (error) {
                alert(error);
            });
        }
    }

    // function botaoEditarClicado() {
    //     if ((salvaNome !== undefined) && (salvaDescricao !== undefined) && (salvaId !== undefined)) {
    //         const itemToEdit: Item = {
    //             nome: salvaNome,
    //             descricao: salvaDescricao
    //         }

    //         axios.post(`http://localhost:4000/api/itens/${salvaId}`, itemToEdit)
    //         .then()
    //         .catch();

    //         location.reload();
    // }}

    function botaoDeletarClicado(id : number | undefined) {
        if(id !== undefined) {
             axios.delete(`http://localhost:4000/api/itens/${id}`)
             .then()
             .catch();

             location.reload();
         }
    }

    return (
        <div>
            <h1>Home</h1>
            <ul>
                {itens.map(function(item){
                    return <li>{item.id} → {item.nome} - {item.descricao} <button onClick={function () {botaoSelecionarItem(item.id); setOptionNumber(2)}}>Selecionar</button></li>
                })}
            </ul>
            <div>
                <div>   
                    <button onClick={() => setOptionNumber(1)}>Criar</button>
                    {/* <button onClick={() => setOptionNumber(2)}>Editar</button> */}
                    {/* <button onClick={() => setOptionNumber(3)}>Deletar</button> */}
                    {/* <button onClick={() => setOptionNumber(2)}>Selecionar</button> */}
                </div>
                
                {(optionNumber == 1) && (
                    <div>
                        <input placeholder="Nome" onChange={function(e){
                            setSalvaNome(e.target.value)
                        }}/>
                        <input placeholder="Descricao" onChange={function(e){
                            setSalvaDescricao(e.target.value)
                        }}/>

                        <button onClick={botaoSalvarClicado}>Inserir</button> 
                    </div>
                )}

                {(optionNumber == 2) && (
                    <div>
                        {/* <button onClick={alert(salvaId)!}>Selecionar</button>   */}
                        <input value={itemSelecionado?.nome} onChange={function(e){
                            setSalvaNome(e.target.value)
                        }}></input>

                        <input value={itemSelecionado?.descricao} onChange={function(e){
                            setSalvaDescricao(e.target.value)
                        }}></input>

                        <button>Editar</button>
                        <button onClick={() => botaoDeletarClicado(itemSelecionado?.id)}>Deletar</button>

                    </div>
                )}

                {/* {(optionNumber == 3) && (
                    <div>
                        <input placeholder="Id" onChange={function(e){
                            setSalvaId(+e.target.value);
                        }} /> 
                        <input placeholder="Nome" onChange={function(e){
                            setSalvaNome(e.target.value)
                        }}/>
                        <input placeholder="Descricao" onChange={function(e){
                            setSalvaDescricao(e.target.value)
                        }}/>

                        <button onClick={botaoEditarClicado}>Editar</button>
                    </div>
                )}  

                {(optionNumber == 4) && (
                    <div>
                        <input placeholder="Id" onChange={function(e){
                            setSalvaId(+e.target.value);
                        }} /> 

                    <button onClick={botaoDeletarClicado}>Deletar</button>   
                    </div>
                )} */}
            </div>
        </div>
    )
}