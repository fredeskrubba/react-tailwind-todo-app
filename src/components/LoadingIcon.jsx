import LoadingSvg from "../assets/icons/Loading-icon.svg?react";

const LoadingIcon = ({height = 12, width = 12}) => {
  return (
    <LoadingSvg className={`animate-spin w-${width} h-${height} m-auto mt-12`}/>
)}

export default LoadingIcon;