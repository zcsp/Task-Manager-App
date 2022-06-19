import ReactModal from 'react-modal';

const Modal = ({ style, ...rest }: ReactModal.Props) => {
  return (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', // to center the content
          justifyContent: 'center',
          alignItems: 'center',
          ...style?.overlay,
        },
        content: {
          position: 'unset',
          color: '#000',
          borderRadius: '8px',
          width: 'fit-content',
          ...style?.content,
        }
      }}
      {...rest}
    />
  )
}

export default Modal;