import { createHashRouter } from "react-router";
import GetStudent from "../componets/GetStudent.tsx";
import InsertStudent from "../componets/InsertStudent.tsx";
import DeleteStudent from "../componets/DeleteStudent.tsx";
import UpdateStudent from "../componets/UpdateStudent.tsx";


export const router = createHashRouter([
    {
        path: "/",
        element: <GetStudent />,
    },
    {
        path: "/add",
        element: <InsertStudent />,
    },
    {
        path: "/delete",
        element: <DeleteStudent />,
    },
    {
        path: "/update",
        element: <UpdateStudent />,
    },
])