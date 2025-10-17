import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "../layouts/AppLayout";

const ChallengesPage = lazy(() => import("../pages/ChallengesPage"));
const ChallengePage = lazy(() => import("../pages/ChallengePage"));
const HandbookPage = lazy(() => import("../pages/HandbookPage"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
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
    ],
  },
]);

export default router;
