import DateIcon from "../../assets/icons/date-icon.svg?react";
import TimeIcon from "../../assets/icons/time-icon.svg?react";
import TrashIcon from "../../assets/icons/trash-icon.svg?react";
import EditIcon from "../../assets/icons/edit-icon.svg?react";
import CrossIcon from "../../assets/icons/cross-icon.svg?react";


const TodoItemDetailsModal = ({ item, onClose, showEditModal, showDeleteModal }) => {
    const dateObj = new Date(item.dueDate);

    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>

        <div className="relative z-10 w-full max-w-lg rounded-md bg-white border-2 shadow-xl max-h-[85vh] min-h-130 flex flex-col" style={{ borderColor: item.color }}>
            <div className="flex flex-col flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-between border-b-1 py-2" style={{borderColor: item.color}}>
                    <h2 className="text-xl font-semibold text-gray-800 break-words">
                        {item.title}
                    </h2>
                    <button onClick={onClose}>
                        <CrossIcon className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                <div className="flex flex-col flex-1">
                    <p className="text-gray-700">
                        {item.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <DateIcon className="w-4 h-4 fill-neutral-500" />
                            <span>{dateObj.toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <TimeIcon className="w-4 h-4 fill-neutral-500" />
                            <span>
                                {dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                })}
                            </span>
                        </div>
                    </div>

                </div>
        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-4" style={{ borderColor: item.color }}>
            <button onClick={(e) => {
                e.stopPropagation();
                showEditModal();
            }} className="rounded-full p-3 transition hover:opacity-90" style={{ backgroundColor: item.color }}>
                <EditIcon className="w-4 h-4 fill-white" />
            </button>

            <button onClick={(e) => {
            e.stopPropagation();
            showDeleteModal();
            }} className="rounded-full p-3 transition hover:opacity-90" style={{ backgroundColor: item.color }}>
                <TrashIcon className="w-4 h-4 fill-white" />
            </button>
        </div>
    </div>

</div>
)}

export default TodoItemDetailsModal