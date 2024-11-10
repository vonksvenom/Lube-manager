import { initialOrdensServico } from './initialData';

const STORAGE_KEY = 'ordensServico';

const getAllLocal = () => {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrdensServico));
    return initialOrdensServico;
  }
  return JSON.parse(data);
};

const getById = (id) => {
  const ordensServico = getAllLocal();
  return ordensServico.find(ordem => ordem.id === id);
};

const add = (ordem) => {
  const ordensServico = getAllLocal();
  const newOrdem = {
    ...ordem,
    id: Date.now().toString(),
  };
  ordensServico.push(newOrdem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordensServico));
  return newOrdem;
};

const update = (id, ordem) => {
  const ordensServico = getAllLocal();
  const index = ordensServico.findIndex(os => os.id === id);
  if (index !== -1) {
    ordensServico[index] = { ...ordensServico[index], ...ordem };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordensServico));
    return ordensServico[index];
  }
  return null;
};

const remove = (id) => {
  const ordensServico = getAllLocal();
  const filtered = ordensServico.filter(ordem => ordem.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const ordemServicoService = {
  getAllLocal,
  getById,
  add,
  update,
  delete: remove
};