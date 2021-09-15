import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'
import Calculos from '../../utils/Calculos';

import styles from './styles.module.css';

interface Valores {
    x?: number[];
    y?: number[];
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
interface props {
    valores: Valores;
    Yaproximado: yAproximado;
    linhaTendencia: yAproximado[];
    resultados : Resultados;
}

const Grafico: React.FC<props> = (props) => {
    const [linhaTendencia, setLinhaTendencia] = useState<yAproximado[]>()

    useEffect(()=>{
        setLinhaTendencia(Calculos.calcLinhaTendencia(props,props.resultados))//calcula e atribui a linha de tendencia ao hook para exibição
    },[props])

    return (
        <div className={styles.grafico}>
            <Line
                data={{
                    labels: props.valores.x,
                    datasets: [// dados a serem representados graficamente
                        {//dados da tabela a ser preenchida
                            label: 'y',
                            data: props.valores.y,
                            backgroundColor: 'white',
                            borderColor: '#4eeb3d',
                            borderWidth: 2,
                            borderDash: [0, 0],
                            showLine: false,
                            fill: false,
                        },
                        {//dados do calculo aproximado de y
                            label: 'y aproximado',
                            data: [props.Yaproximado],
                            backgroundColor: 'white',
                            borderColor: '#ff5757',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false,
                        },
                        {//dados da linha de tendencia
                            label: 'linha de tendencia',
                            data: linhaTendencia,
                            backgroundColor: 'white',
                            borderColor: '#33c2ff',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            pointBorderWidth : 0,
                            fill: false,
                        },
                    ],
                }}
                height={500}//taamanho do grafico em px
                width={500}
                options={{
                    responsive: false,//responsividade do grafico
                    plugins: {
                        title: {//titulo do grafico
                            display: true,
                            text: 'Gráfico Exponencial'
                        },
                    },
                    tension: 0.3,//tensao da linha
                    maintainAspectRatio: false,
                    scales: {
                        x:
                        {
                            type: 'linear',
                            grace: '10%',
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1 //intervalo de amostragem nos ticks do graafico
                            }
                        },
                        y:
                        {
                            type: 'linear',
                            grace: '10%',
                            ticks: {
                                beginAtZero: true,
                            }
                        },
                    }
                }}
            />
        </div>
    )
}
export default Grafico;
