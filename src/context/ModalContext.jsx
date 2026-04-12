import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [activeType, setActiveType] = useState(null);
  const openModal  = (type) => setActiveType(type);
  const closeModal = () => setActiveType(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, activeType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);