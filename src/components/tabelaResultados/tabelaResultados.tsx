import { useEffect, useState } from 'react';
import Calculos from '../../utils/Calculos';
import styles from '../tabelaResultados/tabelaResultados.module.css'

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
interface props {
    somas: Somas;
    n: number;
    setY;
    setLinhaTendencia;
    setResults;
    valores : Valores;
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
const TabelaResultados: React.FC<props> = (props) => {
    const [results, setResults] = useState<Resultados>({})
    const [y, setY] = useState<number>(5)

    useEffect(() => {
        const res = Calculos.calculaResultados(props)//calcula os resultados
        setResults(res)//atribui ao hook para ser exibido os resultados no componente

        props.setResults(res)
        props.setLinhaTendencia(Calculos.calcLinhaTendencia(props,res))//calcula e atribui ao hook a linha de tendencia e envia ao grafico para exibicao
        // eslint-disable-next-line
    }, [])
    
    const calculaY = (x: number) => {
        const res = Calculos.calculaYAproximado(x,results)//calcula o Y aproximado

        setY(res);//Atribui ao hook o valor aproximado de Y
        props.setY({x : x, y : res})//Envia os valores calculados ao componente pai para exibicao no grafico

        props.setLinhaTendencia(Calculos.calcLinhaTendencia(props,results))//calcula e atribui ao hook a linha de tendencia e envia ao grafico para exibicao
    }

    return (
        <div className={styles.tabelaResultados}>
            <table id={styles.primeiraTabela}>
                <tbody>
                    <tr>
                        <th>∆</th>
                        <td className="delta">{results.D}</td>
                    </tr>
                    <tr>
                        <th>∆a</th>
                        <td className="deltaA">{results.Da}</td>
                    </tr>
                    <tr>
                        <th>∆b</th>
                        <td className="deltaB">{results.Db}</td>
                    </tr>
                    <tr>
                        <th>A</th>
                        <td className="A">{results.A}</td>
                    </tr>
                    <tr>
                        <th>B</th>
                        <td className="B">{results.B}</td>
                    </tr>
                    <tr>
                        <th>β</th>
                        <td className="beta">{results.beta}</td>
                    </tr>
                    <tr>
                        <th>α</th>
                        <td className="alfa">{results.alpha}</td>
                    </tr>
                </tbody>
            </table>
            <table id={styles.segundaTabela}>
                <thead>
                    <tr>
                        <th>Formula do gráfico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Y = {results.alpha} * {results.beta}<sup>x</sup></td>
                    </tr>
                </tbody>
            </table>
            <table id={styles.terceiraTabela}>
                <thead>
                    <tr>
                        <th colSpan={2}>Calculo valor aproximado de Y</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                    <tr>
                        <td className={styles.inputX}><input className="x" onChange={(e) => calculaY(parseFloat(e.target.value))} type="number" /></td>
                        <td className="y">{isNaN(y) ? '???' : y}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TabelaResultados;