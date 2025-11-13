import { Home, ShoppingBag, ShoppingCart, User, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/lib/user-store";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Cart", url: "/cart", icon: ShoppingCart },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useUserStore();
  const { items } = useCartStore();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";
  
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-primary to-blue-600 text-white font-semibold shadow-lg" 
      : "hover:bg-primary/10 text-foreground hover:text-primary";

  if (!user) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" className="border-r-2 border-primary/20 bg-gradient-to-b from-background to-muted/30">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "justify-center text-xs font-bold text-primary" : "text-xs font-bold text-primary uppercase tracking-wider"}>
            {collapsed ? "☰" : "Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const showBadge = item.title === "Cart" && cartCount > 0;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} className="h-11 rounded-lg my-1">
                      <NavLink to={item.url} end className={getNavCls}>
                        <Icon className="h-5 w-5" />
                        {!collapsed && (
                          <span className="flex items-center justify-between flex-1 text-sm font-medium">
                            {item.title}
                            {showBadge && (
                              <span className="ml-auto bg-white text-primary rounded-full px-2 py-0.5 text-xs font-bold min-w-[24px] text-center shadow-md">
                                {cartCount}
                              </span>
                            )}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <>
            <Separator className="my-3 bg-primary/20" />
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="px-3 py-2">
                  {!collapsed && (
                    <div className="mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="font-bold text-foreground text-sm">{user.name}</p>
                      <p className="text-xs truncate text-gray-300">{user.email}</p>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size={collapsed ? "icon" : "sm"}
                    onClick={handleLogout}
                    className="w-full justify-start h-10 text-destructive hover:text-destructive hover:bg-destructive/20 font-medium rounded-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span className="ml-2 text-sm">Logout</span>}
                  </Button>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
