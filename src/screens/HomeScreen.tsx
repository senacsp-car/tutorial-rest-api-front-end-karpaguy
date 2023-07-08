import axios from "axios";
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

    function botaoSelecionarItem() {
        if(salvaId !== undefined) {
            axios.get(`http://localhost:4000/itens/${salvaId}`)
            .then()
            .catch();

            location.reload()

        }
    }

    function botaoEditarClicado() {
        if ((salvaNome !== undefined) && (salvaDescricao !== undefined) && (salvaId !== undefined)) {
            const itemToEdit: Item = {
                nome: salvaNome,
                descricao: salvaDescricao
            }

            axios.post(`http://localhost:4000/api/itens/${salvaId}`, itemToEdit)
            .then()
            .catch();

            location.reload();
    }}

    function botaoDeletarClicado() {
        if(salvaId !== undefined) {

             axios.delete(`http://localhost:4000/api/itens/${salvaId}`)
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
                    return <li>{item.id} → {item.nome} - {item.descricao}</li>
                })}
            </ul>
            <div>
                <div>   
                    <button onClick={() => setOptionNumber(1)}>Criar</button>
                    <button onClick={() => setOptionNumber(2)}>Editar</button>
                    <button onClick={() => setOptionNumber(3)}>Deletar</button>
                    <button onClick={() => setOptionNumber(4)}>Selecionar</button>
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

                {(optionNumber == 3) && (
                    <div>
                        <input placeholder="Id" onChange={function(e){
                            setSalvaId(+e.target.value);
                        }} /> 

                    <button onClick={botaoDeletarClicado}>Deletar</button>   
                    </div>
                )}

                {(optionNumber == 4) && (
                    <div>
                        <input placeholder="Id" onChange={function(e){
                            setSalvaId(+e.target.value);
                        }} /> 

                    <button onClick={botaoSelecionarItem}>Selecionar</button>   
                    </div>
                )}

            </div>
        </div>
    )
}