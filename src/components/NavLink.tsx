import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavLinkCompatProps = NavLinkProps & {
  activeClassName?: string;
  pendingClassName?: string;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName = "text-primary font-semibold",
      pendingClassName = "opacity-70",
      ...props
    },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        {...props}
        className={({ isActive, isPending }) =>
          cn(
            "transition-colors duration-200",
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };