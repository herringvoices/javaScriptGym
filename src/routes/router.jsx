import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "../layouts/AppLayout";
import ErrorPage from "../pages/ErrorPage";

const STALE_CHUNK_RELOAD_KEY = "javascriptgym:stale-chunk-reload";

function lazyWithStaleChunkReload(load) {
  return lazy(() =>
    load().catch((error) => {
      const message = String(error?.message || error || "");
      const isChunkLoadFailure =
        message.includes("Failed to fetch dynamically imported module") ||
        message.includes("Importing a module script failed") ||
        message.includes("error loading dynamically imported module");

      if (isChunkLoadFailure && typeof window !== "undefined") {
        const alreadyReloaded = window.sessionStorage.getItem(STALE_CHUNK_RELOAD_KEY);

        if (!alreadyReloaded) {
          window.sessionStorage.setItem(STALE_CHUNK_RELOAD_KEY, "true");
          window.location.reload();
          return new Promise(() => {});
        }
      }

      throw error;
    }).then((module) => {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(STALE_CHUNK_RELOAD_KEY);
      }

      return module;
    })
  );
}

const LandingPage = lazyWithStaleChunkReload(() => import("../pages/LandingPage"));
const ChallengesPage = lazyWithStaleChunkReload(() => import("../pages/ChallengesPage"));
const ChallengePage = lazyWithStaleChunkReload(() => import("../pages/ChallengePage"));
const HandbookPage = lazyWithStaleChunkReload(() => import("../pages/HandbookPage"));
const ProjectsPage = lazyWithStaleChunkReload(() => import("../pages/ProjectsPage"));
const ProjectPage = lazyWithStaleChunkReload(() => import("../pages/ProjectPage"));
const StandardsPage = lazyWithStaleChunkReload(() => import("../pages/StandardsPage"));

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
