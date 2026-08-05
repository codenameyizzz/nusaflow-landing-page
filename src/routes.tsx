import { createBrowserRouter } from "react-router-dom";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { AuthPage } from "@/pages/auth";
import { ContactPage } from "@/pages/contact";
import { CustomersPage } from "@/pages/customers";
import { HomePage } from "@/pages/home";
import { PricingPage } from "@/pages/pricing";
import { ProductPage } from "@/pages/product";

export const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/customers", element: <CustomersPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  { path: "/login", element: <AuthPage mode="login" /> },
  { path: "/register", element: <AuthPage mode="register" /> },
]);
