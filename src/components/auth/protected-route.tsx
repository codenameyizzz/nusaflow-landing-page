import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import type { PublicUser } from "@/lib/auth-api";

type ProtectedRouteProps = {
  allowedRoles?: PublicUser["role"][];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isCheckingSession } = useAuth();
  const location = useLocation();

  if (isCheckingSession) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas px-4 pt-16 text-ink">
        <div className="rounded-[24px] border border-hairline bg-paper p-5 text-sm text-mid-gray shadow-subtle">
          Checking session...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/app"} replace />;
  }

  return <Outlet />;
}
