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
    },[])
    
    const calculaY = (x: number) => {
        const res = Calculos.calculaYAproximado(x,results)//calcula o Y aproximado

        setY(res);//Atribui ao hook o valor aproximado de Y
        props.setY({x : x, y : res})//Envia os valores calculados ao componente pai para exibicao no grafico

        props.setLinhaTendencia(Calculos.calcLinhaTendencia(props,results))//calcula e atribui ao hook a linha de tendencia e envia ao grafico para exibicao
    }

    return (
        <div className={styles.tabelaResultados}>
            <table>
                <thead>
                    <tr>
                        <td>∆</td>
                        <td>∆a</td>
                        <td>∆b</td>
                        <td>A</td>
                        <td>B</td>
                        <td>β</td>
                        <td>α</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{results.D}</td>
                        <td>{results.Da}</td>
                        <td>{results.Db}</td>
                        <td>{results.A}</td>
                        <td>{results.B}</td>
                        <td>{results.beta}</td>
                        <td>{results.alpha}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>Formula do gráfico</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Y = {results.alpha} * {results.beta}<sup>x</sup></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td colSpan={2}>Calculo valor aproximado de Y</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>X</td>
                        <td>Y</td>
                    </tr>
                    <tr>
                        <td><input onChange={(e) => calculaY(parseFloat(e.target.value))} type="number" /></td>
                        <td>{y}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TabelaResultados;