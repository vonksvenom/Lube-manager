import { initialInventario } from './initialData';

const STORAGE_KEY = 'inventario';
const HISTORICO_KEY = 'inventario_historico';

const getAll = () => {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialInventario));
    return initialInventario;
  }
  return JSON.parse(data);
};

const getById = (id) => {
  const inventario = getAll();
  return inventario.find(item => item.id === id);
};

const validateItem = (item) => {
  if (!item.name || !item.type || !item.quantity || !item.unit || !item.area) {
    throw new Error('Dados inválidos: todos os campos obrigatórios devem ser preenchidos');
  }
  if (item.quantity < 0) {
    throw new Error('Quantidade não pode ser negativa');
  }
  return true;
};

const add = (item) => {
  validateItem(item);
  const inventario = getAll();
  const newItem = {
    ...item,
    id: Date.now().toString(),
    dataRegistro: new Date().toISOString()
  };
  inventario.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inventario));
  
  addToHistorico({
    ...newItem,
    historicoId: Date.now().toString(),
    tipoOperacao: 'Entrada'
  });
  
  return newItem;
};

const update = (id, item) => {
  validateItem(item);
  const inventario = getAll();
  const index = inventario.findIndex(i => i.id === id);
  if (index !== -1) {
    const oldItem = inventario[index];
    const updatedItem = { ...oldItem, ...item };
    inventario[index] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventario));
    
    if (oldItem.quantity !== item.quantity) {
      addToHistorico({
        ...updatedItem,
        historicoId: Date.now().toString(),
        tipoOperacao: item.quantity > oldItem.quantity ? 'Entrada' : 'Saída'
      });
    }
    
    return updatedItem;
  }
  return null;
};

const remove = (id) => {
  const inventario = getAll();
  const item = inventario.find(i => i.id === id);
  if (item) {
    const filtered = inventario.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    
    addToHistorico({
      ...item,
      historicoId: Date.now().toString(),
      tipoOperacao: 'Remoção'
    });
  }
};

const getHistorico = () => {
  const data = localStorage.getItem(HISTORICO_KEY);
  return data ? JSON.parse(data) : [];
};

const addToHistorico = (item) => {
  const historico = getHistorico();
  historico.push(item);
  localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
};

const getHistoricoByPeriod = (startDate, endDate, area = null) => {
  const historico = getHistorico();
  return historico.filter(item => {
    const itemDate = new Date(item.dataRegistro);
    const isInDateRange = itemDate >= startDate && itemDate <= endDate;
    return area ? isInDateRange && item.area === area : isInDateRange;
  });
};

export const inventarioService = {
  getAll,
  getById,
  add,
  update,
  delete: remove,
  getHistorico,
  getHistoricoByPeriod
};