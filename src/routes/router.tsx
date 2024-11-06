import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import SelectPage from "@/pages/SelectPage";
import SelectMultiTreeSearchContainer from "@/features/select/SelectMultiTreeSearchContainer";
import SelectTreeSearchContainer from "@/features/select/SelectTreeSearchContainer";
import SelectMultiCheckSearchContainer from "@/features/select/SelectMultiCheckSearchContainer";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/select',
    element: <SelectPage />,
    children: [
      {
        path: 'select-multi-tree-search',
        element: <SelectMultiTreeSearchContainer />,
      },
      {
        path: 'select-tree-search',
        element: <SelectTreeSearchContainer />,
      },
      {
        path: 'select-multi-check-search',
        element: <SelectMultiCheckSearchContainer />,
      },
    ],
  },
  {
    path: '/tree',
    element: <div>tree</div>,
  },
])

export default router