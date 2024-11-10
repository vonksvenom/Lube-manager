import { initialUsers } from './initialData';

const STORAGE_KEY = 'users';
const CURRENT_USER_KEY = 'user';

const getAll = () => {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }
  return JSON.parse(data);
};

const getById = (id) => {
  const users = getAll();
  return users.find(user => user.id === id);
};

const add = (user) => {
  const users = getAll();
  const newUser = {
    ...user,
    id: Date.now().toString(),
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return newUser;
};

const update = (id, user) => {
  const users = getAll();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    
    // Atualiza o usuário atual se for o mesmo
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === id) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
    }
    
    return users[index];
  }
  return null;
};

const remove = (id) => {
  const users = getAll();
  const filtered = users.filter(user => user.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  
  // Remove o usuário atual se for o mesmo
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === id) {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

const getCurrentUser = () => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Inicializa os dados no localStorage se ainda não existirem
const init = () => {
  const users = localStorage.getItem(STORAGE_KEY);
  if (!users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
  }
};

// Executa a inicialização
init();

export const userService = {
  getAll,
  getById,
  add,
  update,
  delete: remove,
  getCurrentUser,
  setCurrentUser
};