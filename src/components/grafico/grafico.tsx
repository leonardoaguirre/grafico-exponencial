import { useEffect } from 'react';
import  { Line } from 'react-chartjs-2'

interface Valores {
    x: number[];
    y: number[];
}
interface yAproximado {
    x?: number;
    y?: number;
}
interface props {
    valores: Valores;
    Yaproximado : yAproximado;
}

const Grafico: React.FC<props> = (props) => {

    return (
        <div>
            <Line
                data={{
                    labels : props.valores.x,
                    datasets: [// dados a serem representados graficamente
                        {//dados da tabela a ser preenchida
                            label: 'y',
                            data: props.valores.y,
                            backgroundColor: 'white',
                            borderColor: '#33c2ff',
                            borderWidth: 2,
                            borderDash: [5, 5],
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
