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

    // const converteDados = () => {
    //     const dados: [{ x?: number, y?: number }] = [{}];
    //     props.valores.x.forEach((x, i) => {
    //         dados.push({ x: x[i], y: props.valores.y[i] })
    //     })
    //     return dados;
    // }
    useEffect(()=>{

        // console.log(props.Yaproximado.y);
        
    },[props])

    return (
        <div>
            <Line
                data={{
                    labels : props.valores.x,
                    datasets: [
                        {
                            label: 'y',
                            data: props.valores.y,
                            backgroundColor: 'white',
                            borderColor: '#33c2ff',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false,
                        },
                        {
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
                height={500}
                width={500}
                options={{
                    responsive: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Gráfico Exponencial'
                        },
                    },
                    tension: 0.3,
                    maintainAspectRatio: false,
                    scales: {
                        x:
                        {
                            type: 'linear',
                            grace: '10%',
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        },
                        y:
                        {
                            type: 'linear',
                            grace: '10%',
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 0.5
                            }
                        },
                    }
                }}
            />
        </div>
    )
}
export default Grafico;
