import { useEffect, useRef, useState } from 'react';
import "../style/App.css";
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import { resp } from '../interface/resp';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// 提取子組件
const StudentCard = ({ student, onClick }: { student: Student; onClick:() => void }) => (
  <div className='student' key={student._id} onClick={onClick}>
    <p>帳號: {student.userName}</p>
    <p>座號: {student.sid}</p>
    <p>姓名: {student.name}</p>
    <p>院系: {student.department}</p>
    <p>年級: {student.grade}</p>
    <p>班級: {student.class}</p>
    <p>Email: {student.Email}</p>
    <p>缺席次數: {student.absences ? student.absences : 0}</p>
  </div>
);

function Get() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const cache = useRef<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 避免多次發起請求的緩存邏輯
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.Get).then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
          console.log(res.body); // Debug 確認返回的數據
          setStudents(res.body);
        } else {
          console.error("Failed to fetch students:", res.message);
        }
      }).catch(err => {
        console.error("Error fetching students:", err);
      });
    }
  }, []);

  const studentList = students.length > 0 ? students.map(student => (
    <StudentCard key={student._id}
    student={student}
    onClick={() => navigate(`/update/${student._id}`)} // 點擊跳轉到修改頁面
    />
  )) : (
    <div className="no-data"><p>目前無學生資料</p></div>
  );

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
      <div className="main-content">
        {studentList}
      </div>
      <nav>
        <Link to="/" className="nav-button">返回學生列表</Link>
      </nav>
    </div>
  );
}

export default Get;
