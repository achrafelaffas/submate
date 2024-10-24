import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  children: string;
}

export default function MenuLink({ children, to }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive
          ? "text-foreground transition-colors hover:text-foreground"
          : "text-muted-foreground transition-colors hover:text-foreground";
      }}
    >
      {children}
    </NavLink>
  );
}
