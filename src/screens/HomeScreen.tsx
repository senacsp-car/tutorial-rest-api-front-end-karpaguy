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

    const [itemSelecionado, setItemSelecionado] = useState<Item>();
    const [optionNumber, setOptionNumber] = useState<number>();

    function recarregar (){
        axios.get('http://localhost:4000/api/itens')
        .then(function (response) {
            setItens(response.data);
        })
        .catch(function (error) {
            alert(error);   
        });
    };

    useEffect(() => recarregar(), []);

    function botaoSalvarClicado() {
        if((salvaNome !== undefined) && (salvaDescricao !== undefined)){
            const itemToSave: Item = {
                nome:salvaNome,
                descricao:salvaDescricao
            }

            axios.post('http://localhost:4000/api/itens',itemToSave)
            .then(() => recarregar())
            .catch();
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
        recarregar();
    }

    function botaoEditarClicado(id: number | undefined, nomeV: string | undefined, descricaoV: string | undefined) {

        let nomezinho;
        (salvaNome === undefined)?(nomezinho = nomeV):(nomezinho = salvaNome)

        let descricaozinha;
        (salvaDescricao === undefined)?(descricaozinha = descricaoV):(descricaozinha = salvaDescricao)


        const itemToEdit: Item = {nome: nomezinho, descricao: descricaozinha}

         if ((id !== undefined)) {
            console.log(id, salvaNome, salvaDescricao)

            console.log({itemToEdit})
            axios.put(`http://localhost:4000/api/itens/${id}`, itemToEdit)
            .then(() => recarregar())
            .catch();
    }}

    function botaoDeletarClicado(id : number | undefined) {
        if(id !== undefined) {
             axios.delete(`http://localhost:4000/api/itens/${id}`)
             .then(() => recarregar())
             .catch();
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
                        <input defaultValue={itemSelecionado?.nome} onChange={function(e){
                            setSalvaNome(e.target.value)
                        }}></input>

                        <input defaultValue={itemSelecionado?.descricao} onChange={function(e){
                            setSalvaDescricao(e.target.value)
                        }}></input>

                        <button onClick={() => botaoEditarClicado(itemSelecionado?.id, itemSelecionado?.nome, itemSelecionado?.descricao)}>Editar</button>
                        <button onClick={() => botaoDeletarClicado(itemSelecionado?.id)}>Deletar</button>

                    </div>
                )}
            </div>
        </div>
    )
}