import { useModal } from '../../context/ModalContext';
import ContactModal from '../sections/ContactModal';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer'
import { Outlet } from 'react-router-dom';
const Layout = () => {
  const { openModal, closeModal, activeType } = useModal();

  return (
    <>
      <Navbar
        onContactClick={() => openModal('Query')}
        onFeedbackClick={() => openModal('Feedback')}
      />
      <Outlet />
      <Footer
        onContactClick={() => openModal('Query')}
        onFeedbackClick={() => openModal('Feedback')}
      />
      <ContactModal
        isOpen={!!activeType}
        onClose={closeModal}
        type={activeType}
      />
    </>
  );
};

export default Layout