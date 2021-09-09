import React, { useState } from 'react';
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

function TabelaDados() {
    const [somas, setSomas] = useState<Somas>()
    const [valores, setValores] = useState<Valores>()
    const [n, setN] = useState<number>()

    const removeLinha = async (table: HTMLTableElement) => {
        if (table.rows.length <= 2) {
            alert('Impossivel ter uma tabela com menos de 2 linhas')
        } else {
            table.lastElementChild.remove();
        }
    }


    const adicionaLinha = async (table: HTMLTableElement) => {
        var linha = table.insertRow()
        linha.insertCell().innerHTML = `<input type="number" />`
        linha.insertCell().innerHTML = `<input type="number" />`
    }

    const calcular = async (table: HTMLTableElement) => {
        try {
            const val: Valores = await capturaValores(table)
        
            setValores(val);
            setSomas(await calculaSomas(val));
            setN(val.x.length)

        } catch (error) {
            alert(error);
        }
    }

    const capturaValores = async (table: HTMLTableElement) => {
        const vals: Valores = { x: [], y: [] };

        for await (const linha of table.children) {
            const celX = linha.childNodes[0].childNodes.item(0) as HTMLInputElement;
            const celY = linha.childNodes[1].childNodes.item(0) as HTMLInputElement;

            if (celX.value.length < 1 || celY.value.length < 1) {
                throw Error("Todas as celulas devem ser preenchidas")
            }
            vals.x.push(parseFloat(celX.value))
            vals.y.push(parseFloat(celY.value))

        }
        return vals;
    }

    const calculaSomas = async (valores: Valores) => {
        let somaXi: number = 0, somaLogY: number = 0, somaX2: number = 0, somaXiYi: number = 0;

        for (const xi of valores.x) {
            somaXi += xi
            somaX2 += Math.pow(xi, 2)
        }
        for (let i = 0; i < valores.y.length; i++) {
            somaLogY += Math.log10(valores.y[i])
            somaXiYi += valores.x[i] * (Math.log10(valores.y[i]))
        }
        const somas: Somas = ({ Xi: somaXi, logY: somaLogY, XiAoQuadrado: somaX2, XiYi: somaXiYi });
        return somas;
    }

    const geraLinhas = (num: number) => {
        let linhas = []
        for (let i = 0; i < num; i++) {
                linhas.push(<tr><td><input type="number" /></td><td><input type="number" /></td></tr>)
        }
        return linhas
    }

    return (
        <div className="tabelaDados">

            <div className="tabela-x-y">
                <table>
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                        </tr>
                    </thead>
                    <tbody id="tabela">
                        {geraLinhas(3)/*gera as linhas iniciais da tabela */} 
                    </tbody>
                </table>
            </div>

            <div className="botoes">
                <button onClick={() => removeLinha(document.getElementById('tabela') as HTMLTableElement)}>-</button>
                <button onClick={() => adicionaLinha(document.getElementById('tabela') as HTMLTableElement)}>+</button>
                <button onClick={() => calcular(document.getElementById('tabela') as HTMLTableElement)}>Calcular</button>
            </div>
            {somas ? <TabelaSomas somas={somas} /> : ``}
            {somas ? <TabelaResultados somas={somas} n={n}/> : ``}
            {somas ? <Grafico valores={valores} /> : ``}
        </div>
    )
}

export default TabelaDados;
