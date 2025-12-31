const Modal = ({ title, children, onClose, onSubmit }) => {
  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // prevent overlay close
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>

        {children}

        <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer" onClick={onClose}>
                    Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-main-green text-white cursor-pointer" onClick={() => {
                    onSubmit()
                }}>
                    Confirm
                </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;