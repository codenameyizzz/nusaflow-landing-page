import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { AdminDashboardPage } from "@/pages/admin-dashboard";
import { AppDashboardPage } from "@/pages/app-dashboard";
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
  {
    element: <MarketingLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [{ path: "/app", element: <AppDashboardPage /> }],
      },
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [{ path: "/admin", element: <AdminDashboardPage /> }],
      },
    ],
  },
  { path: "/login", element: <AuthPage mode="login" /> },
  { path: "/register", element: <AuthPage mode="register" /> },
]);
