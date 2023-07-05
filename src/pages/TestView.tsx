import { getTest, postResult, getComplete } from '../api/evaluations.api';
import { useState, useEffect } from 'react';
import '../styles.css';

interface Pregunta {
    id: number;
    orden: string;
    enunciados: Enunciado[];
    tipo: string;
    dificultad: string;
    tags: string;
}

interface Enunciado {
    id: number;
    id_pregunta: number;
    alternativas: Alternativa[];
    contenido: string;
}

interface Alternativa {
    id: number;
    contenido: string;
    correcta: boolean;
}

function TestView() {
  const savedIdTest = localStorage.getItem('id_test');
  const savedIdGroup = localStorage.getItem('id_group');
  const savedIdUsuario = localStorage.getItem('id_usuario');
  const savedIdEvaluacion = localStorage.getItem('id_evaluacion');

  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [indicePregunta, setIndicePregunta] = useState<number>(() => {
        const savedIndex = localStorage.getItem('current_index');
        return savedIndex ? parseInt(savedIndex) : 0;
  });

  const [respuestasCorrectas, setRespuestasCorrectas] = useState<number>(0);

  useEffect(() => {
        const obtenerPreguntas = async () => {
            try {
                const response = await getTest(savedIdTest);
                setPreguntas(response.data.preguntas);
            } catch (error) {
                // Manejar el error de recuperación de preguntas
            }
    };

    obtenerPreguntas();
  }, [savedIdTest]);

  useEffect(() => {
        localStorage.setItem('current_index', (indicePregunta + 1).toString());
  }, [indicePregunta]);

  useEffect(() => {
    const obtenerCompletado = async () => {
      try {
        const response = await getComplete(savedIdUsuario, savedIdEvaluacion);
        console.log('Completado:', response.data.completado);
      } catch (error) {
        // Manejar el error de recuperación del estado de completado
      }
    };

    obtenerCompletado();
  }, [savedIdUsuario, savedIdEvaluacion]);

  const handleRespuesta = (esCorrecta: boolean) => {
        if (esCorrecta) {
        setRespuestasCorrectas(respuestasCorrectas + 1);
            }
        console.log(preguntaActual)
        console.log(preguntaActual.dificultad)
        console.log(preguntaActual.tags)
        postResult(savedIdUsuario, savedIdGroup, preguntaActual.id, savedIdEvaluacion, esCorrecta, preguntaActual.dificultad, preguntaActual.tags);
        setIndicePregunta(indice => indice + 1);
  };

  if (preguntas.length === 0) {
        return <div className='container'><p className='subtitle'>Cargando preguntas...</p>;</div>
  }

  if (indicePregunta >= preguntas.length) {
        let porcentajeCorrectas = Math.floor((respuestasCorrectas/preguntas.length)*100)
        return (
            <div className='container'>
                <p className='title'>Correctas:</p>
                <p className='title'>{porcentajeCorrectas}%</p>
            </div>
        );
  }

  const preguntaActual: Pregunta = preguntas[indicePregunta];
  const alternativas: Alternativa[] = preguntaActual.enunciados[0].alternativas;

  return (
    <div className='container'>
        <h3 className='subtitle'>Pregunta {indicePregunta + 1}</h3>
        <p className='title'>{preguntaActual.enunciados[0].contenido}</p>
            {alternativas.map((alternativa: Alternativa, index: number) => (
        <button className='btn-questions' key={`${indicePregunta}_${index}`} onClick={() => handleRespuesta(alternativa.correcta)}>
            {alternativa.contenido}
        </button>
        ))}
    </div>
    );
}

export default TestView;
