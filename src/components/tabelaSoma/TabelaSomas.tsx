import styles from '../tabelaSoma/tabelaSoma.module.css';

interface Somas {
    Xi: number;
    logY: number;
    XiAoQuadrado: number;
    XiYi: number;
}
interface props{ 
    somas : Somas;
}

const TabelaSomas : React.FC<props> = (props) => {

    return (
        <div className={styles.tabelaSomas}>
            <table>
                <thead>
                    <tr>
                        <td>∑ Xi</td>
                        <td>∑ Yi =log Yi</td>
                        <td>∑ Xi² </td>
                        <td>∑ XiYi</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.somas.Xi}</td>
                        <td>{props.somas.logY}</td>
                        <td>{props.somas.XiAoQuadrado}</td>
                        <td>{props.somas.XiYi}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TabelaSomas;