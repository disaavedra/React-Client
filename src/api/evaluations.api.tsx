import axios from 'axios';

const djangoApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1'
});

export const getEvaluation = (id: any) => {
    return djangoApi.get(`/evaluations/${id}`);
  };

export const getTest = (id: any) => {
  return djangoApi.get(`/tests/${id}`);
};

export const getPersons = (id: any) => {
  return djangoApi.get(`/persons/${id}`);
};

export const getGroup = (id: any) => {
  return djangoApi.get(`/groups/${id}`);
};

export const postResult = async (personaId: any, grupoId: any, preguntaId: any, evaluacionId: any, esCorrecta: boolean, difficult: any, tagz: any) => {
  try {
    const response = await djangoApi.post('/results/', {
      persona: personaId,
      grupo: grupoId,
      pregunta: preguntaId,
      evaluacion: evaluacionId,
      correcta: esCorrecta,
      dificultad: difficult,
      tag: tagz
    });
      console.log('Resultado guardado:', response.data);
  } catch (error) {
      console.error('Error al guardar el resultado:', error);
  }
};

export const postComplete = async (personaId: any, evaluacionId: any, completadoResult: number) => {
  return djangoApi.post('/complete/', {
    persona: personaId,
    evaluacion: evaluacionId,
    completado: completadoResult,
  });
}

export const getComplete = (userId: any, evaluationId: any) => {
  return djangoApi.get(`/complete/?persona=${userId}&evaluacion=${evaluationId}`);
};
