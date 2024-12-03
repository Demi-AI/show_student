import { createHashRouter } from "react-router";
import App from '../view/App.tsx';

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
])