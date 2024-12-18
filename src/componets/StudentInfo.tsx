import { useState } from "react";
import { Student } from "../interface/Student";

type info = {
    onClick?: Function;
    canEdit?: boolean;
    submit?: (info: Student) => Promise<any>;
    title?: string;
    submitText?: string;
    deleteText?: string;
    canDelete?: boolean;
    deleteHandler?: Function;
}

export const StudentInfo: React.FC<Student & info> = (student: Student & info) => {
    const clickHandler = () => {
        if (student.onClick) {
            student.onClick();
        }
    }

    if (student.canEdit) {
        const [info, setInfo] = useState<Student>(student);

        const submit = () => {
            if (student.submit) {
                student.submit(info);
            }
        }

        const deleteStudent = () => {
            if (student.deleteHandler) {
                student.deleteHandler(info._id);
            }
        };

        return (
            <div className="studentEdit" key={info._id} onClick={clickHandler}>
                <div className="info">
                    <h1>{student.title}</h1>
                    <p>帳號：</p>
                    <input
                        type="text"
                        value={info.userName}
                        onChange={(e) => {
                            const temp = { ...info };
                            temp.userName = e.target.value;
                            setInfo(temp);
                        }}
                    />
                </div>
                <div className="info">
                    <p>姓名：</p>
                    <input
                        type="text"
                        value={info.name}
                        onChange={(e) => {
                            const temp = { ...info };
                            temp.name = e.target.value;
                            setInfo(temp);
                        }}
                    />
                </div>
                <div className="info">
                    <p>院系：</p>
                    <input
                        type="text"
                        value={info.department}
                        onChange={(e) => {
                            const temp = { ...info };
                            temp.department = e.target.value;
                            setInfo(temp);
                        }}
                    />
                </div>
                <div className="info">
                    <p>年级：</p>
                    <input
                        type="text"
                        value={info.grade}
                        onChange={(e) => {
                            const temp = { ...info };
                            temp.grade = e.target.value;
                            setInfo(temp);
                        }}
                    />
                </div>
                <div className="info">
                    <p>班级：</p>
                    <input
                        type="text"
                        value={info.class}
                        onChange={(e) => {
                            const temp = { ...info };
                            temp.class = e.target.value;
                            setInfo(temp);
                        }}
                    />
                </div>
                <div className="info">
                    <p>Email:</p>
                    <input
                        type="text"
                        value={info.Email}
                        onChange={(e) => {
                            const temp = { ...info };
                            temp.Email = e.target.value;
                            setInfo(temp);
                        }}
                    />
                </div>
                <div className="info">
                    <p>缺席次数：</p>
                    <input
                        type="number"
                        value={info.absences ? info.absences : 0}
                        onChange={(e) => {
                            const temp = { ...info };
                            temp.absences = Number(e.target.value);
                            setInfo(temp);
                        }}
                    />
                </div>
                <div className="btn">
                    <div className="submit" onClick={submit}>
                        {student.submitText}
                    </div>
                    {student.canDelete && (
                        <div className="delete" onClick={deleteStudent}>
                            {student.deleteText}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};
