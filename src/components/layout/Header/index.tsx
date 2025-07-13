import { Button } from "@/components/ui/button";
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Menu, Home, DoorOpen } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-50">
      <div className="flex items-center">
        {isAuthenticated && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 cursor-pointer">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60">
              <nav className="flex flex-col gap-2 mt-10">
                <Button variant="ghost" className="justify-start text-lg cursor-pointer" onClick={() => navigate('/')}>
                  <Home className="h-5 w-5 mr-1" /> Página Inicial
                </Button>
                <Button variant="ghost" className="justify-start text-lg cursor-pointer" onClick={() => navigate('/agent/item/list')}>
                  <DoorOpen className="h-5 w-5 mr-1" /> Portaria
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        )}
        <img src="/src/assets/UFC-logo.png" alt="UFC Logo" className="h-[50px] w-[50px] mr-2" />
        <span className="text-xl font-bold">Achados UFC</span>
      </div>
      <nav>
        {isAuthenticated ? (
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <User className="h-5 w-5 sm:mr-1" />
                  <span className="hidden sm:inline">{user?.email || "Agente"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button className="cursor-pointer" onClick={() => navigate('/agent/item/list')}>
            Acessar portaria
          </Button>
        )}
      </nav>
    </header>
  );
}; 