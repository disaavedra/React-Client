import axios from 'axios';

const djangoApi = axios.create({
  baseURL: 'https://web-django-api.herokuapp.com/api/v1'
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