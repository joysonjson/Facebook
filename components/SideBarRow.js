import Image from "next/image";
const SideBarRow = ({ src, Icon, title, active }) => {
  return (
    <div className="flex items-center space-x-2 p-4 cursor-pointer rounded-xl hover:bg-gray-300">
      {src && (
        <Image
          className="rounded-full cursor-pointer "
          layout="fixed"
          width={40}
          height={40}
          src={src}
        />
      )}
      {Icon && <Icon className="h-6 w-6 text-blue-500" />}

      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SideBarRow;
