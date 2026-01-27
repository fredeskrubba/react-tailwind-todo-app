import DateIcon from '../assets/icons/date-icon.svg?react';
import TimeIcon from '../assets/icons/time-icon.svg?react';

const ItemInfoView = ({ item, activeDescription, setActiveDescription }) => {
    return (
        <div className="fixed inset-y-0 right-0 w-[320px] bg-white border-l border-main-green p-6 overflow-y-auto shadow-lg z-50 md:flex-col md:justify-between hidden md:flex">
                        <div className='flex flex-col gap-4'>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                            <textarea className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none" value={activeDescription} onChange={(e) => setActiveDescription(e.target.value)} placeholder='Enter description'/>

                        </div>
                        <div className='flex flex-col border-t-1 border-main-green pt-4 gap-4'>
                            <div className='flex justify-between'>
                                <DateIcon className="h-6 w-6 fill-main-green"/>
                                <p className="text-main-green">{new Date(item.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className='flex justify-between'>
                                <TimeIcon className="h-6 w-6 fill-main-green"/>
                                <p className="text-main-green">{new Date(item.dueDate).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}</p>
                            </div>

                        </div>
                    </div>
    );
}

export default ItemInfoView;