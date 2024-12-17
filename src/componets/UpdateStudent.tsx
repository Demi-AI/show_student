import React, { useState, useEffect, useCallback } from 'react';
import '../style/Update.css'

// Define Student interface
interface Student {
  _id?: string;
  userName: string;
  sid: string;
  name: string;
  department: string;
  grade: string;
  class: string;
  Email: string;
}

// Basic StudentInfo component
const StudentInfo: React.FC<{
  title: string;
  submitText: string;
  canEdit?: boolean;
  submit: (student: Student) => void;
  initialData?: Student;
}> = ({ 
  title, 
  submitText, 
  canEdit = true, 
  submit, 
  initialData 
}) => {
  const [student, setStudent] = useState<Student>({
    userName: "",
    sid: "",
    name: "",
    department: "",
    grade: "",
    class: "",
    Email: "",
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setStudent(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(student);
  };

  return (
    <div className="student-form">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>帳號:</label>
          <input
            type="text"
            name="userName"
            value={student.userName}
            onChange={handleChange}
            disabled={!canEdit}
            required
          />
        </div>
        <div>
          <label>座號:</label>
          <input
            type="text"
            name="sid"
            value={student.sid}
            onChange={handleChange}
            disabled={!canEdit}
            required
          />
        </div>
        <div>
          <label>姓名:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            disabled={!canEdit}
            required
          />
        </div>
        <div>
          <label>院系:</label>
          <input
            type="text"
            name="department"
            value={student.department}
            onChange={handleChange}
            disabled={!canEdit}
            required
          />
        </div>
        <div>
          <label>年級:</label>
          <input
            type="text"
            name="grade"
            value={student.grade}
            onChange={handleChange}
            disabled={!canEdit}
            required
          />
        </div>
        <div>
          <label>班級:</label>
          <input
            type="text"
            name="class"
            value={student.class}
            onChange={handleChange}
            disabled={!canEdit}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={student.Email}
            onChange={handleChange}
            disabled={!canEdit}
            required
          />
        </div>
        <button type="submit" disabled={!canEdit}>{submitText}</button>
      </form>
    </div>
  );
};

// Mock function to simulate API call
const mockUpdateStudent = async (student: Student): Promise<{ code: number, message: string, data?: Student }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful update
      resolve({
        code: 200,
        message: '修改成功',
        data: student
      });
    }, 500);
  });
};

// Main Update Student Component
export const UpdateStudent: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<Student | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate getting student ID (replace with actual routing logic)
  const _id = "mock-student-id";

  // Fetch student information
  const fetchStudent = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulate fetching student data
      const mockStudent: Student = {
        _id,
        userName: "example_user",
        sid: "12345",
        name: "張三",
        department: "資訊工程系",
        grade: "3",
        class: "A",
        Email: "student@example.com"
      };

      setStudentInfo(mockStudent);
      setIsLoading(false);
    } catch (err) {
      setError('無法獲取學生資訊');
      setIsLoading(false);
    }
  }, [_id]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  // Submit handler
  const submit = useCallback(async (info: Student) => {
    try {
      const res = await mockUpdateStudent(info);
      
      if (res.code === 200) {
        alert("修改成功");
        // Optionally update local state or navigate
        setStudentInfo(res.data);
      } else {
        alert(`修改失敗：${res.message}`);
      }
    } catch (error) {
      console.error("更新學生資訊時發生錯誤:", error);
      alert('更新失敗，請稍後再試');
    }
  }, []);

  // Loading and error states
  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>錯誤: {error}</div>;
  }

  return (
    <div className="container">
      {studentInfo && (
        <StudentInfo
          title="修改學生資訊"
          submitText="確認修改"
          canEdit={true}
          submit={submit}
          initialData={studentInfo}
        />
      )}
    </div>
  );
};

export default UpdateStudent;

