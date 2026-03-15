import {
  NavLink as RouterNavLink,
  NavLinkProps,
} from "react-router-dom";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavLinkCompatProps = Omit<NavLinkProps, "className"> & {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children?: ReactNode;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName = "text-primary font-semibold",
      pendingClassName = "opacity-70",
      children,
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
            "relative inline-flex items-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm",
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
        data-active={({ isActive }) => (isActive ? "true" : "false")}
      >
        {({ isActive }) => (
          <>
            {children}

            {/* Active underline indicator */}
            <span
              className={cn(
                "absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-primary transition-transform duration-300",
                isActive && "scale-x-100"
              )}
            />
          </>
        )}
      </RouterNavLink>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };