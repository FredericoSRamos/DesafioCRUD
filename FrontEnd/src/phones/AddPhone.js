import { useDispatch, useSelector } from "react-redux";
import { addPhoneServer, selectPhonesById, updatePhoneServer } from "./PhoneSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function AddPhone() {
    let { id } = useParams();

    const phoneFound = useSelector(state => selectPhonesById(state, id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const actionType = id ? (phoneFound ? 'update' : 'add') : 'add';

    const emptyPhone = {
        brand: "",
        model: "",
        memory: "",
        date: null
    };

    const [phone, setPhone] = useState(id ? phoneFound ?? emptyPhone : emptyPhone);

    function handleChange(e) {
        const { id, value } = e.target;
        setPhone(prev => ({ ...prev, [id]: value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (actionType === 'add') {
            dispatch(addPhoneServer(phone));
        } else {
            dispatch(updatePhoneServer({ ...phone, id: phoneFound?.id }));
        }

        navigate('/');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ border: '1px solid black', borderRadius: '8px', padding: '16px', width: '380px' }}>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Celular</h1>
                <form onSubmit={onSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', marginBottom: '8px' }}>
                        <label htmlFor="brand">Marca</label>
                        <input
                            type="text"
                            id="brand"
                            required={true}
                            value={phone.brand}
                            onChange={handleChange}
                            style={{ width: '90%', padding: '4px' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', marginBottom: '8px' }}>
                        <label htmlFor="model">Modelo</label>
                        <input
                            type="text"
                            id="model"
                            required={true}
                            value={phone.model}
                            onChange={handleChange}
                            style={{ width: '90%', padding: '4px' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 70px', alignItems: 'center', marginBottom: '8px' }}>
                        <label htmlFor="memory">Memória</label>
                        <input
                            type="number"
                            id="memory"
                            step={0.1}
                            min={1}
                            required={true}
                            value={phone.memory}
                            onChange={handleChange}
                            style={{ padding: '4px' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 130px', alignItems: 'center', marginBottom: '16px' }}>
                        <label htmlFor="date">Lançamento</label>
                        <input
                            type="date"
                            id="date"
                            required={true}
                            value={phone.date ? new Date(phone.date).toISOString().substring(0, 10) : ""}
                            onChange={handleChange}
                            style={{ padding: '4px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            style={{ padding: '4px 12px', border: '1px solid black', borderRadius: '4px', backgroundColor: '#f0f0f0', cursor: 'pointer', minWidth: '80px' }}
                        >Cancelar</button>
                        <button
                            type="submit"
                            style={{ padding: '4px 12px', border: '1px solid black', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', minWidth: '80px' }}
                        >Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}