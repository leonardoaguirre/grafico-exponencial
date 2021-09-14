import React, { useState } from 'react';
import Calculos from '../../utils/Calculos';
import Grafico from '../grafico/grafico';
import TabelaResultados from '../tabelaResultados/tabelaResultados';
import TabelaSomas from '../tabelaSoma/TabelaSomas';

interface Valores {
    x: number[];
    y: number[];
}
interface Somas {
    Xi: number;
    logY: number;
    XiAoQuadrado: number;
    XiYi: number;
}
interface yAproximado {
    x?: number;
    y?: number;
}
interface Resultados {
    D?: number;
    Da?: number;
    Db?: number;
    A?: number;
    B?: number;
    beta?: number;
    alpha?: number;
}

function TabelaDados() {
    const [somas, setSomas] = useState<Somas>()
    const [valores, setValores] = useState<Valores>()
    const [resultados, setResultados] = useState<Resultados>()
    const [linhaTendencia, setLinhaTendencia] = useState<yAproximado[]>()
    const [n, setN] = useState<number>()
    const [yAproximado, setYAproximado] = useState<yAproximado>({ x: 0, y: 0 })
    const [reload,isReload] = useState<boolean>(false)

    const removeLinha = async (table: HTMLTableElement) => {
        if (table.rows.length <= 2) { //verifica se a tabela de dados possuem mais de duas linhas
            alert('Impossivel ter uma tabela com menos de 2 linhas')
        } else {
            table.lastElementChild.remove();//remove a ultima linha da tabela
        }
    }

    const adicionaLinha = async (table: HTMLTableElement) => {
        var linha = table.insertRow()//insere uma linha na tabela
        linha.insertCell().innerHTML = `<input type="number" />`//adiciona uma celula na tabela com um elemento HTML de input do tipo number
        linha.insertCell().innerHTML = `<input type="number" />`//adiciona uma celula na tabela com um elemento HTML de input do tipo number
    }

    const calcular = async (table: HTMLTableElement) => {
        try {
            isReload(false)
            const val: Valores = await capturaValores(table)//Captura os valores presentes na tabela
            
            setValores(val);//atribui os valores da tabela ao hook
            setSomas(Calculos.calculaSomas(val));//calcula as somas e atribui ao hook
            setN(val.x.length)//atribui n ao hook de acordo com o tamanho do vetor capturado da tabela

            isReload(true)
        } catch (error) {
            alert(error);//mostra um erro em um alert caso ocorra um
        }
    }

    const capturaValores = async (table: HTMLTableElement) => {
        const vals: Valores = { x: [], y: [] };//inicializa o objeto vals

        for await (const linha of table.children) {//for que percorre todas as linhas presentes na tabela
            const celX = linha.childNodes[0].childNodes.item(0) as HTMLInputElement;//captura valor de x da linha e atribui a variavel
            const celY = linha.childNodes[1].childNodes.item(0) as HTMLInputElement;//captura valor de Y da linha e atribui a variavel

            if (celX.value.length < 1 || celY.value.length < 1) {//verifica se alguma celula esta vazia e lanca uma excessao caso verdadeiro
                throw Error("Todas as celulas devem ser preenchidas")
            }
            vals.x.push(parseFloat(celX.value))//atribui valor de x da linha ao vetor de valores
            vals.y.push(parseFloat(celY.value))//atribui valor de y da linha ao vetor de valores

        }
        return vals;//retorna os valores da tabela de dados
    }


    const geraLinhas = (num: number) => {
        let linhas = [] //inicializa o vetor
        for (let i = 0; i < num; i++) {//loop que atribui ao vetor o numero de linhas a serem geradas de acordo com o numero passado como parametro na funcao
            linhas.push(<tr><td><input type="number" className="x" /></td><td><input type="number" className="y" /></td></tr>)
        }
        return linhas//retorna o vetor com as linhas geradas
    }

    const retornaYAproximado = (xey) => {
        setYAproximado(xey)
    }
    const retornaLinhaTendencia = (linhaT) => {
        setLinhaTendencia(linhaT)
    }
    const retornaResults = (res) =>{
        setResultados(res)
    }

    return (
        <div className="tabelaDados">
            <h1>Método dos mínimos quadrados</h1>
            <h2>Função Exponencial</h2>

            <div className="tabela">
                <div className="tabela-x-y">
                    <table>
                        <thead>
                            <tr>
                                <th className="x">X</th>
                                <th className="y">Y</th>
                            </tr>
                        </thead>
                        <tbody id="tabela">
                            {geraLinhas(3)/*gera as linhas iniciais da tabela */}
                        </tbody>
                    </table>
                </div>

                <div className="botoes">
                    <div>
                        <button className="menos" onClick={() => removeLinha(document.getElementById('tabela') as HTMLTableElement)}><p>-</p></button>
                        <button className="mais" onClick={() => adicionaLinha(document.getElementById('tabela') as HTMLTableElement)}><p>+</p></button>
                    </div>
                    <div>
                        <button className="calc" onClick={() => calcular(document.getElementById('tabela') as HTMLTableElement)}><p>Calcular</p></button>
                    </div>
                </div>
            </div>


            {reload ? <TabelaSomas somas={somas} /> : ``}
            {reload ? <TabelaResultados somas={somas} n={n} setY={retornaYAproximado} valores={valores} setLinhaTendencia={retornaLinhaTendencia} setResults={retornaResults} /> : ``}
            {linhaTendencia ? <Grafico valores={valores} Yaproximado={yAproximado} linhaTendencia={linhaTendencia} resultados={resultados}/> : ``}
        </div>
    )
}

export default TabelaDados;
