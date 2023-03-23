import React from 'react';
import ReactModal from 'react-modal';
import styles from './style.module.css';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    WebkitOverflowScrolling: 'touch',
    overflow: 'auto',
    width: '900px',
    maxWidth: '90vw',
    paddingInline: '5vw',
    paddingBlock: 45,
    maxHeight: '90vh',
    backgroundColor: '#ECEEFF',
    color: '#000',
    transition: 'all 0.3s',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    overscrollBehavior: 'contain',
    zIndex: 20,
    // position: 'fixed',
  },
};

function CustomModal({
  title,
  modalState,
  closeModal,
  children,
  ...rest
}: {
  title: string;
  modalState: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  [x: string]: any;
}) {
  React.useEffect(() => {
    // Check if modal is open and prevent body from scrolling
    if (typeof window !== 'undefined') {
      const body = document.body;

      if (modalState) {
        // Disable scroll
        body.style.overflow = 'hidden';
        body.style.height = '100vh';
      } else {
        body.style.overflowY = 'auto';
        body.style.height = 'auto';
      }
    }
  }, [modalState]);

  return (
    <ReactModal
      isOpen={modalState}
      onRequestClose={closeModal}
      style={{
        // @ts-ignore
        content: {
          ...customStyles.content,
          opacity: modalState ? 1 : 0,
        },
        overlay: customStyles.overlay,
      }}
      closeTimeoutMS={500}
      className={styles.modal}
      {...rest}
    >
      <div className={styles.modalTitleContainer}>
        <h1>{title}</h1>
        <button
          onClick={closeModal}
          style={{
            backgroundColor: 'transparent',
          }}
        >
          &#x2715;
        </button>
      </div>
      {children}
    </ReactModal>
  );
}

export default CustomModal;
