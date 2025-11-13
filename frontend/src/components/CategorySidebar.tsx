import { Gamepad2, Keyboard, Mouse, Headphones, Monitor, Armchair, Cable } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CategorySidebarProps {
  isOpen: boolean;
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: "all", name: "All Products", icon: Gamepad2 },
  { id: "keyboards", name: "Keyboards", icon: Keyboard },
  { id: "mice", name: "Mice", icon: Mouse },
  { id: "headsets", name: "Headsets", icon: Headphones },
  { id: "monitors", name: "Monitors", icon: Monitor },
  { id: "chairs", name: "Gaming Chairs", icon: Armchair },
  { id: "accessories", name: "Accessories", icon: Cable },
];

export const CategorySidebar = ({ isOpen, selectedCategory, onSelectCategory }: CategorySidebarProps) => {
  return (
    <aside
      className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] z-40 transition-all duration-300 glass border-r ${
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      }`}
    >
      {isOpen && (
        <ScrollArea className="h-full">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-primary">Categories</h2>
            <Separator className="mb-4" />
            <nav className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-primary text-primary-foreground glow-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                    onClick={() => onSelectCategory(category.id)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {category.name}
                  </Button>
                );
              })}
            </nav>
          </div>
        </ScrollArea>
      )}
    </aside>
  );
};
