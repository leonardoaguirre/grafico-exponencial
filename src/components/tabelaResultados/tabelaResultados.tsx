import { useEffect, useState } from 'react';
import styles from '../tabelaResultados/tabelaResultados.module.css'

interface Somas {
    Xi: number;
    logY: number;
    XiAoQuadrado: number;
    XiYi: number;
}
interface props {
    somas: Somas;
    n: number;
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

    useEffect(() => {
        //calcula delta, delta A e delta B e atribui a variavel
        let res: Resultados = {
            D: props.somas.XiAoQuadrado * props.n - props.somas.Xi * props.somas.Xi,
            Da: props.somas.XiYi * props.n - props.somas.Xi * props.somas.logY,
            Db: props.somas.XiAoQuadrado * props.somas.logY - props.somas.Xi * props.somas.XiYi,
        }
        //calcula A e B e atrinui a variavel
        res.A = res.Da / res.D
        res.B = res.Db / res.D

        //calcula beta e alpha e atrinuia variavel
        res.beta = Math.pow(10, res.A)
        res.alpha = Math.pow(10, res.B)

        //atribui ao hook para ser exibido os resultados no componente
        setResults(res)   
    },[props])

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
        </div>
    )
}
export default TabelaResultados;