import { useNavigate, useParams } from "react-router";
import { StudentInfo } from "../componets/StudentInfo";
import { api } from "../enum/api";
import { resp } from "../interface/resp";
import { Student } from "../interface/Student";
import { asyncDelete, asyncGet, asyncPut } from "../utils/fetch";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

export const Update: React.FC = () => {

    const _id  = useParams().id; // 獲取学生 ID
    const [studentInfo, setStudent] = useState<Student | null>(null); // 初始值設為 null
    const cache = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // 加載狀態
    const navigate = useNavigate();

    // 修改
    const submitHandler = async (info: Student) => {
        const data = {
            _id: info._id,
            userName: info.userName,
            sid: info.sid,
            name: info.name,
            department: info.department,
            grade: info.grade,
            class: info.class,
            Email: info.Email,
            absences: info.absences
        };

        const res: resp<Student | null> = await asyncPut(`${api.Update}`, data);
        if (res.code == 200) {
            alert("修改成功");
            setStudent(res.body); // 更新本地數據
        } else {
            alert(`修改失敗：${res.message}`);
        }
    };

    // 刪除
    const deleteHandler = async () => {
        const res: resp<boolean> = await asyncDelete(`${api.Delete}?id=${_id}`);
        if (res.code == 200) {
            if (res.body) {
                alert("刪除成功");
                navigate("/Get"); // 返回學生列表頁面
            } else {
                alert(`刪除失敗：${res.message}`);
            }
        } else {
            alert(`刪除失敗：${res.message}`);
        }
    };

    // 加載學生數據
    useEffect(() => {
        if (!_id) {
            alert("未找到有效的學生 ID，請返回學生列表重試。");
            navigate("/Get");
            return;
        }

        setLoading(true);

        asyncGet(`${api.Get}?id=${_id}`)
            .then((res: resp<Student | null>) => {
                if (res.code == 200) {
                    if (res.body) {
                        setStudent(res.body); // 确保 body 不为 null 后再使用
                    } else {
                        alert("未找到該學生資料，請確認 ID 是否正確。");
                        navigate("/Get");
                    }
                } else {
                    alert(`無法加載學生數據：${res.message}`);
                    navigate("/Get");
                }
            })
            .catch(err => {
                console.error("Error fetching student:", err);
                alert("加載學生數據時發生錯誤，請稍後重試。");
                navigate("/Get");
            })
            .finally(() => setLoading(false));
    }, [_id, navigate]);

    // 顯示加載狀態
    if (loading) {
        return <div>加載中...</div>;
    }

    // 顯示無學生數據的情況
    if (!studentInfo) {
        return <div>未找到該學生資料</div>;
    }

    return (
        <div className="container">
            <div className="top-nav">
                <h2>StudentHub</h2>
                <nav>
                    <Link to="/" className="nav-button">首頁</Link>
                    <Link to="/Get" className="nav-button">所有學生列表</Link>
                    <Link to="/Insert" className="nav-button">新增學生資料</Link>
                    <Link to="/Update" className="nav-button">修改學生資料</Link>
                </nav>
            </div>
            <StudentInfo
                {...studentInfo} // 傳入學生數據
                title="修改學生資料"
                submitText="確認修改"
                deleteText="確認刪除"
                canDelete={true}
                canEdit={true}
                submit={submitHandler}
                deleteHandler={deleteHandler}
            />
            <nav>
                <Link to="/" className="nav-button">返回學生列表</Link>
            </nav>
        </div>
    );
};
