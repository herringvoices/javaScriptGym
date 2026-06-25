import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "../layouts/AppLayout";
import ErrorPage from "../pages/ErrorPage";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const ChallengesPage = lazy(() => import("../pages/ChallengesPage"));
const ChallengePage = lazy(() => import("../pages/ChallengePage"));
const HandbookPage = lazy(() => import("../pages/HandbookPage"));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));
const StandardsPage = lazy(() => import("../pages/StandardsPage"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={null}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/challenges",
        element: (
          <Suspense fallback={null}>
            <ChallengesPage />
          </Suspense>
        ),
      },
      {
        path: "/challenge/:challengeId",
        element: (
          <Suspense fallback={null}>
            <ChallengePage />
          </Suspense>
        ),
      },
      {
        path: "/handbook/:standardId",
        element: (
          <Suspense fallback={null}>
            <HandbookPage />
          </Suspense>
        ),
      },
      {
        path: "/handbook/:standardId/:chapterId",
        element: (
          <Suspense fallback={null}>
            <HandbookPage />
          </Suspense>
        ),
      },
      {
        path: "/projects",
        element: (
          <Suspense fallback={null}>
            <ProjectsPage />
          </Suspense>
        ),
      },
        {
          path: "/standards",
          element: (
            <Suspense fallback={null}>
              <StandardsPage />
            </Suspense>
          ),
        },
      {
        path: "/project/:projectId",
        element: (
          <Suspense fallback={null}>
            <ProjectPage />
          </Suspense>
        ),
      },
      {
        path: "/project/:projectId/:stepId",
        element: (
          <Suspense fallback={null}>
            <ProjectPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
