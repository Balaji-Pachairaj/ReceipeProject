import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import Home from "./pages/Home";
import OtherReceipe from "./components/OtherReceipe";
import Signup from "./pages/Signup";
import AddRecipes from "./pages/AddRecipes";
import DynamicRecipe from "./pages/DynamicRecipe";
import Error from "./pages/Error";
const router = createBrowserRouter([
     {
          path: "/",
          element: <Root />,
          errorElement: <Error />,
          children: [
               { index: true, element: <Home /> },
               {
                    path: "recipes",
                    children: [
                         { index: true, element: <OtherReceipe /> },
                         { path: ":recipeId", element: <DynamicRecipe /> },
                    ],
               },
               { path: "login", element: <Signup /> },
               { path: "addrecipe", element: <AddRecipes /> },
          ],
     },
]);

function App() {
     return (
          <>
               <RouterProvider router={router}></RouterProvider>
          </>
     );
}

export default App;
