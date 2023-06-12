import { useParams, useNavigate } from 'react-router-dom';
import {getEvaluation, getPersons} from '../api/evaluations.api'
import { useState, useEffect } from 'react';
import '../styles.css';

function MainView() {
    const { id_evaluacion, id_usuario } = useParams();
    const navigate = useNavigate();
    const [id_test, setIdTest] = useState();
    const [evaluation, setEvaluation] = useState<any>(null);
    const [person, setPerson] = useState<any>(null);
    localStorage.removeItem('current_index');

    const evaluacion = id_evaluacion ?? '';
    const usuario = id_usuario ?? '';

    const handleStartTest = () => {
        localStorage.setItem('id_evaluacion', evaluacion);
        localStorage.setItem('id_usuario', usuario);
        navigate('/${id_evaluacion}/${id_usuario}/test');
    }

    const idTest = async () => {
        const response = await getEvaluation(evaluacion);
        setIdTest(response.data.prueba.id);
        setEvaluation(response.data)
    };

    const personsData = async () => {
        const response = await getPersons(usuario);
        setPerson(response.data)
    };

    useEffect(() => {
        idTest();
        personsData();
    }, [id_evaluacion]);

    useEffect(() => {
        const test = id_test ?? '';
        localStorage.setItem('id_test', test);
    }, [id_test]);

    return (
      <div className='container'>
          <h1 className="title">Bienvenido!</h1>
          <p className="subtitle">{evaluation?.nombre}</p>
          <p className="subtitle">{person?.nombre} {person?.apellido}</p>
          <button className="btn" onClick={handleStartTest}>Comenzar</button>
      </div>
    );
}

export default MainView;
