import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removePhoneServer } from "./PhoneSlice";

export default function PhoneTableRow({ phone }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(`/list/${phone.id}`);
    }

    const handleRemove = () => {
        dispatch(removePhoneServer(phone.id));
    };

    return (
        <tr style={{ borderBottom: '1px solid black' }}>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{phone.brand}</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{phone.model}</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{phone.memory}</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{new Date(phone.date).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={handleUpdate}
                >Alterar
            </td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={handleRemove}
                >Excluir
            </td>
        </tr>
    );
}