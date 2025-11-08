import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import BlogPost from "@/pages/BlogPost";
import CategoryPage from "@/pages/CategoryPage";
import Shop from "@/pages/Shop";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/not-found";
import Analytics from "@/components/Analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/shop" component={Shop} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Analytics />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
