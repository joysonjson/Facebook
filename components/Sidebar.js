import { useSession } from "next-auth/client";
import SideBarRow from "./SideBarRow";

import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UserIcon,
} from "@heroicons/react/outline";
const Sidebar = () => {
  const [session] = useSession();
  return (
    <div className="pt-2 mt-5 max-w-[600px] xl:min-w-[300px] ">
      <SideBarRow src={session.user.image} title="Friends" />

      <SideBarRow Icon={UserIcon} title="Friends" />
      <SideBarRow Icon={UserGroupIcon} title="Gropus" />
      <SideBarRow Icon={ShoppingBagIcon} title="Market Place" />
      <SideBarRow Icon={DesktopComputerIcon} title="Watch" />
      <SideBarRow Icon={CalendarIcon} title="Events" />
      <SideBarRow Icon={ClockIcon} title="Memories" />
      <SideBarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
};

export default Sidebar;
