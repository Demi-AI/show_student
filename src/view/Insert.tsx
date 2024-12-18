import { StudentInfo } from "../componets/StudentInfo";
import { api } from "../enum/api";
import { resp } from "../interface/resp";
import { Student } from "../interface/Student";
import { asyncPost } from "../utils/fetch";
import { Link } from 'react-router-dom';

export const Insert: React.FC = () => {

    const initInfo = {
        userName: "",
        sid: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        Email: "",
    }

    const submitHandler = async(info: Student)=>{
        const res = await asyncPost(api.Insert,info)
        if (res.code == 200){
            alert(`新增成功：${res.message}`);
        }else{
            alert(`新增失敗：${res.message}`)
        }
    }

    return(
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
            title="新增學生資料"
            submitText="確認新增"
            canEdit={true}
            submit={submitHandler}
            {...initInfo}/>
        <nav>
            <Link to="/" className="nav-button">返回學生列表</Link>
        </nav>
        </div>
    )
}