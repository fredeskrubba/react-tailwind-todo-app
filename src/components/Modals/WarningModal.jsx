

const WarningModal = ({ text, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm ">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center border-1 border-red-600">
            <p className="text-center text-gray-800 max-w-sm">{text}</p>
            <div className="flex gap-4">
                <button onClick={onConfirm} className="mt-4 px-6 py-2 border-1 border-red-600 bg-white text-red-600 rounded-lg "> Confirm </button>
                <button onClick={onCancel} className="mt-4 px-6 py-2 border-1 border-neutral-600 bg-white text-neutral-600 rounded-lg "> Cancel </button>
            </div>
        </div>
    </div>
  );
};

export default WarningModal;