import { useDispatch, useSelector } from "react-redux";
import { addPhoneServer, selectPhonesById, updatePhoneServer } from "./PhoneSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneSchema } from "./PhoneSchema";

export default function AddPhone() {
    let { id } = useParams();

    const phoneFound = useSelector(state => selectPhonesById(state, id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [actionType] = useState(id ? (phoneFound ? 'update' : 'add') : 'add');

    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(phoneSchema)
    });

    const [phoneOnLoad] = useState(
        id ? phoneFound ?? phoneSchema.cast({}) : phoneSchema.cast({})
    );

    const status = useSelector(state => state.phones.status);

    const [updateSuccess, setUpdateSuccess] = useState(false);

    async function onSubmit(phone) {
        if (actionType === 'add') {
            dispatch(addPhoneServer(phone));
            navigate('/');
        } else {
            dispatch(updatePhoneServer({ ...phone, id: phoneFound?.id }));
        }
    }

    useEffect(() => {
        if (status === "updated") {
            setUpdateSuccess(true);
            setTimeout(() => navigate('/'), 1000);
        }
    }, [status, navigate])

    let showInfo;

    if (updateSuccess) {
        showInfo = 
        <div style={{ backgroundColor: 'green', color: 'white', padding: '50px', width: '60%', borderRadius: '5px', marginBottom: '10px' }}>
            Informação atualizada com sucesso!
        </div>
    } else {
        showInfo = 
        <div style={{ border: '1px solid black', borderRadius: '8px', padding: '16px', width: '380px' }}>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Celular</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', marginBottom: '8px' }}>
                    <label htmlFor="brand">Marca</label>
                    <input
                        type="text"
                        id="brand"
                        defaultValue={phoneOnLoad.brand}
                        { ...register("brand") }
                        onChange={() => trigger('brand')}
                        style={{ width: '90%', padding: '4px' }}
                    />
                    { errors.brand && <span style={{ color: 'red' }}>{errors.brand.message}</span> }
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', marginBottom: '8px' }}>
                    <label htmlFor="model">Modelo</label>
                    <input
                        type="text"
                        id="model"
                        defaultValue={phoneOnLoad.model}
                        { ...register("model") }
                        onChange={() => trigger('model')}
                        style={{ width: '90%', padding: '4px' }}
                    />
                    { errors.model && <span style={{ color: 'red' }}>{errors.model.message}</span> }
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 70px', alignItems: 'center', marginBottom: '8px' }}>
                    <label htmlFor="memory">Memória</label>
                    <input
                        type="number"
                        id="memory"
                        min={0}
                        step={0.1}
                        defaultValue={phoneOnLoad.memory}
                        { ...register("memory") }
                        onChange={() => trigger('memory')}
                        style={{ padding: '4px' }}
                    />
                    { errors.memory && <span style={{ color: 'red' }}>{errors.memory.message}</span> }
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 130px', alignItems: 'center', marginBottom: '16px' }}>
                    <label htmlFor="date">Lançamento</label>
                    <input
                        type="date"
                        id="date"
                        defaultValue={actionType === 'add' ? "" : new Date(phoneOnLoad.date).toISOString().substring(0, 10)}
                        { ...register("date") }
                        onChange={() => trigger('date')}
                        style={{ padding: '4px' }}
                    />
                    { errors.date && <span style={{ color: 'red' }}>{errors.date.message}</span> }
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
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            { showInfo }
        </div>
    );
}