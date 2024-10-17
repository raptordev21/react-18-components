import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Not Found</div>,
  },
])

export default router