import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AdminLayout } from "@/layouts/admin-layout";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { AdminActivityPage } from "@/pages/admin-activity";
import { AdminDashboardPage } from "@/pages/admin-dashboard";
import { AdminProductsPage } from "@/pages/admin-products";
import { AdminSettingsPage } from "@/pages/admin-settings";
import { AdminUsersPage } from "@/pages/admin-users";
import { AppDashboardPage } from "@/pages/app-dashboard";
import { AuthPage } from "@/pages/auth";
import { ContactPage } from "@/pages/contact";
import { CustomersPage } from "@/pages/customers";
import { HomePage } from "@/pages/home";
import { PricingPage } from "@/pages/pricing";
import { ProductDetailPage } from "@/pages/product-detail";
import { ProductPage } from "@/pages/product";

export const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/product/:slug", element: <ProductDetailPage /> },
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
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "products", element: <AdminProductsPage /> },
          { path: "users", element: <AdminUsersPage /> },
          { path: "activity", element: <AdminActivityPage /> },
          { path: "settings", element: <AdminSettingsPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <AuthPage mode="login" /> },
  { path: "/register", element: <AuthPage mode="register" /> },
]);
