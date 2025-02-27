import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhones, selectAllPhones } from '../phones/PhoneSlice';
import PhoneTableRow from '../phones/PhoneTableRow';
import { Link } from 'react-router-dom';

export default function MainPage() {
    const phones = useSelector(selectAllPhones);
    const status = useSelector(state => state.phones.status);
    const error = useSelector(state => state.phones.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "not_loaded" || status === "added" || status === "deleted" || status === "updated") {
            dispatch(fetchPhones());
        } else if (status === "failed") {
            setTimeout(() => dispatch(fetchPhones()), 2000);
        }
    }, [status, dispatch]);

    let phonesTable = null;
    if (status === "loaded") {
        phonesTable = (
            <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid black', marginTop: '16px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Marca</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Modelo</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Capacidade de Memória (GB)</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Data de Lançamento</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alterar</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map(phone => <PhoneTableRow key={phone.id} phone={phone} />)}
                </tbody>
            </table>
        );
    } else if (status === "loading") {
        phonesTable = <div>Carregando os celulares...</div>;
    } else if (status === "failed") {
        phonesTable = <div>Erro ao tentar carregar os celulares: {error}</div>;
    }

    return (
        <div style={{ margin: '20px', textAlign: 'left'}}>
            <Link to={'/list'}>
                <button style={{ border: '1px solid black', backgroundColor: '#f0f0f0', padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>Novo Celular</button>
            </Link>
            {phonesTable}
        </div>
    );
}