import Image from "next/image";

import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { signout, useSession } from "next-auth/client";
const Header = () => {
  const [session] = useSession();
  return (
    <div className="flex sticky top-0 bg-white items-center p-2 lg:px-5 shadow-md">
      {/*left*/}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600 " />
          <input
            className="hidden  md:inline-flex flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {/*center*/}
      <div className="flex justify-center flex-grow ">
        <div className="flex space-x-6 md:space-x-6">
          <HeaderIcon active={true} Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/*right*/}
      <div className="flex items-center sm:space-x-2 justify-end">
        <Image
          className="rounded-full cursor-pointer "
          layout="fixed"
          width={40}
          height={40}
          onClick={signout}
          src={session.user.image}
        />
        <p className="font-semibold whitespace-nowrap pr-3">
          {session.user.name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
