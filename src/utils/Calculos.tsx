interface Resultados {
    D?: number;
    Da?: number;
    Db?: number;
    A?: number;
    B?: number;
    beta?: number;
    alpha?: number;
}
interface yAproximado {
    x?: number;
    y?: number;
}
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

export default class Calculos{
    static calculaResultados (props){
         //calcula delta, delta A e delta B e atribui a variavel
         let res: Resultados = {
            D: props.somas.XiAoQuadrado * props.n - props.somas.Xi * props.somas.Xi,
            Da: props.somas.XiYi * props.n - props.somas.Xi * props.somas.logY,
            Db: props.somas.XiAoQuadrado * props.somas.logY - props.somas.Xi * props.somas.XiYi,
        }
        //calcula A e B e atribui a variavel
        res.A = res.Da / res.D
        res.B = res.Db / res.D

        //calcula beta e alpha e atribuia variavel
        res.beta = Math.pow(10, res.A)
        res.alpha = Math.pow(10, res.B)

        console.log(res);
        return res;
    }

    static calculaYAproximado(x : number, results){
        //Formula Y = Alpha * Beta^X
        return (results.alpha) * Math.pow(results.beta,x) //Calcula o valor aproximado de Y
    }

    static calcLinhaTendencia (props,results){
        let linhaTendencia: yAproximado[] = []//inicializa vetor vazio

        props.valores.x.forEach((x, i) => {//percorre o vetor de valores da tabela x e y
            linhaTendencia.push({x , y : (results.alpha) * Math.pow(results.beta, props.valores.x[i])})//calcula o valor de y aproximado de acordo com a formula alpha*beta^x
        })
        
        return linhaTendencia;//retorna a linha de tendencia
    }

    
    static calculaSomas (valores: Valores) {
        let somaXi: number = 0, somaLogY: number = 0, somaX2: number = 0, somaXiYi: number = 0;//inicializa todas as variaveis

        for (const xi of valores.x) {//loop que percorre o vetor com todos os valores de x
            somaXi += xi //calcula a soma de Xi
            somaX2 += Math.pow(xi, 2) // calcula a soma de X ao quadrado
        }
        for (let i = 0; i < valores.y.length; i++) {//loop que percorre o vetor com todos os valores de y
            somaLogY += Math.log10(valores.y[i])//calcula a soma de Log de Y
            somaXiYi += valores.x[i] * (Math.log10(valores.y[i]))//calcula a soma de Xi * Yi
        }
        const somas: Somas = ({ Xi: somaXi, logY: somaLogY, XiAoQuadrado: somaX2, XiYi: somaXiYi });//atribui as somas calculadas ao objeto de somas
        return somas;//retorna as somas calculadas
    }
}