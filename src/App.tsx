import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { type CartItem } from "@/components/CartDrawer";

const queryClient = new QueryClient();

const AppContent = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/product/:id"
        element={<ProductDetail cart={cart} setCart={setCart} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;