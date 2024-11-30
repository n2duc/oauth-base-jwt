import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "../layouts/Root";
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));

const SignInPage = lazy(() => import("@/pages/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const UserProfilePage = lazy(() => import("@/pages/UserProfilePage"));
const CardPage = lazy(() => import("@/pages/CardPage"));

import PrivateRoute from "./PrivateRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ROLE } from "@/type/roles";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: "signin",
              element: <SignInPage />,
            },
            {
              path: "signup",
              element: <SignUpPage />,
            },
            {
              path: "*",
              element: <NotFoundPage />
            }
          ]
        },
        {
          element: <MainLayout />,
          children: [
            {
              element: <PrivateRoute allowRoles={[ROLE.Admin]} />,
              children: [
                {
                  path: "dashboard",
                  element: <DashboardPage />
                }
              ]
            },
            {
              element: <PrivateRoute allowRoles={[ROLE.User, ROLE.Admin]} />,
              children: [
                {
                  index: true,
                  element: <HomePage />
                },
                {
                  path: "card",
                  element: <CardPage />
                },
                {
                  path: "profile",
                  element: <UserProfilePage />
                }
              ]
            },
            {
              path: "*",
              element: <NotFoundPage />
            }
          ]
        }
      ]
    }
  ])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}