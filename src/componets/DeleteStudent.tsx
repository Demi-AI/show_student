import React, { useState, useEffect, useCallback } from 'react';
import '../style/Delete.css'

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
  initialData?: Student;
}> = ({ 
  title, 
  submitText, 
  canEdit = false, 
  initialData 
}) => {
  return (
    <div className="student-form">
      <h2>{title}</h2>
      {initialData && (
        <div className="student-details">
          <div>
            <strong>帳號:</strong> {initialData.userName}
          </div>
          <div>
            <strong>座號:</strong> {initialData.sid}
          </div>
          <div>
            <strong>姓名:</strong> {initialData.name}
          </div>
          <div>
            <strong>院系:</strong> {initialData.department}
          </div>
          <div>
            <strong>年級:</strong> {initialData.grade}
          </div>
          <div>
            <strong>班級:</strong> {initialData.class}
          </div>
          <div>
            <strong>Email:</strong> {initialData.Email}
          </div>
        </div>
      )}
    </div>
  );
};

// Mock function to simulate API calls
const mockFetchStudent = async (id: string): Promise<{ code: number, message: string, data?: Student }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful fetch
      resolve({
        code: 200,
        message: '獲取學生訊息成功',
        data: {
          _id: id,
          userName: "example_user",
          sid: "12345",
          name: "張三",
          department: "資訊工程系",
          grade: "3",
          class: "A",
          Email: "student@example.com"
        }
      });
    }, 500);
  });
};

const mockDeleteStudent = async (id: string): Promise<{ code: number, message: string, body?: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate deletion result
      resolve({
        code: 200,
        message: '刪除成功',
        body: true
      });
    }, 500);
  });
};

// Main Delete Student Component
export const DeleteStudent: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<Student | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate getting student ID (replace with actual routing logic)
  const _id = "mock-student-id";

  // Fetch student information
  const fetchStudent = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await mockFetchStudent(_id);

      if (res.code === 200 && res.data) {
        setStudentInfo(res.data);
      } else {
        throw new Error(res.message || '無法獲取學生資訊');
      }
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '無法獲取學生資訊');
      setIsLoading(false);
    }
  }, [_id]);

  // Delete handler
  const deleteHandler = useCallback(async () => {
    try {
      const confirmDelete = window.confirm('確定要刪除此學生資訊嗎？');
      
      if (confirmDelete) {
        const res = await mockDeleteStudent(_id);
        
        if (res.code === 200 && res.body) {
          alert("刪除成功");
          // Optionally navigate away or update state
        } else {
          alert(`刪除失敗：${res.message}`);
        }
      }
    } catch (error) {
      console.error("刪除學生資訊時發生錯誤:", error);
      alert('刪除失敗，請稍後再試');
    }
  }, [_id]);

  // Fetch student on component mount
  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

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
        <>
          <StudentInfo
            title="刪除學生資訊"
            submitText="確認刪除"
            canEdit={false}
            initialData={studentInfo}
          />
          <div className="delete-section">
            <button 
              onClick={deleteHandler}
              className="delete-button"
            >
              確認刪除
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteStudent;