import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import { Package2 } from "lucide-react";

const NavLinks = () => {
  return (
    <>
      <Link
        to="#"
        className="mb-8 md:mb-0 flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
      </Link>
      <MenuItem to="/">Dashboard</MenuItem>
      <MenuItem to="/subscriptions">Subscriptions</MenuItem>
    </>
  );
};

export default NavLinks;
