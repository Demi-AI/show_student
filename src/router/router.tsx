import { createHashRouter } from "react-router";
import Get from "../view/Get.tsx";
import { Insert } from "../view/Insert.tsx";
import { Update } from "../view/Update.tsx";


export const router = createHashRouter([
    {
        path: "/",
        element: <Get />,
    },
    {
        path: '/Get',
        element: <Get />,
      },
    {
        path: "/Insert",
        element: <Insert />,
    },
    {
        path: "/Update/:id",
        element: <Update />,
    },
])