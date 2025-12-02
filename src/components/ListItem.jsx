import TrashIcon from "../assets/icons/trash-icon.svg?react";

const ListItem = ({text, description, onDelete}) => {
    return ( 
    <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center">
        {text}

        <div className="flex gap-4">
            <TrashIcon className="w-6 h-6 fill-red-500 cursor-pointer" onClick={onDelete} />

        </div>
    </div> );
}
 
export default ListItem;