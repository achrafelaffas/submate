import MenuItem from "./MenuItem";

const NavLinks = () => {
  return (
    <>
      <MenuItem to="/me">Dashboard</MenuItem>
      <MenuItem to="/me/subscriptions">Subscriptions</MenuItem>
    </>
  );
};

export default NavLinks;
