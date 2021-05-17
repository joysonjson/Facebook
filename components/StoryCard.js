import Image from "next/image";
const StoryCard = ({ name, src, profile }) => {
  return (
    <div className="relative h-14 w-14 md:w-20 md:h-20 lg:h-56 lg:w-32 cursor-pointer overflow-x px-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse ">
      <h3>{name}</h3>
      <Image
        height={50}
        width={50}
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10 h-10 w-10 object-contain"
        layout="fixed"
        src={profile}
      />
      <Image
        className="hidden sm:flex-inline object-cover filter brightness-3 rounded-full lg:rounded-3xl"
        layout="fill"
        src={src}
      />
    </div>
  );
};

export default StoryCard;
