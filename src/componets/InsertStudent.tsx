import React, { useState, useCallback } from 'react';
import { StudentInfo } from '../componets/StudentInfo';
import { asyncPost } from '../utils/fetch';
import { api } from '../enum/api';
import { resp } from '../interface/resp';
import { Student } from '../interface/Student';
import '../style/Insert.css'

export const InsertStudent: React.FC = () => {
  // Initial student information template
  const initInfo: Student = {
    userName: "",
    sid: "",
    name: "",
    department: "",
    grade: "",
    class: "",
    Email: "",
  };

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = useCallback(async (info: Student): Promise<resp<any>> => {
    const requiredFields: (keyof Student)[] = ['userName', 'name', 'department', 'grade', 'class', 'Email'];
    const missingFields = requiredFields.filter(field => !info[field]);
  
    if (missingFields.length > 0) {
      alert(`請填寫以下必填欄位: ${missingFields.join(', ')}`);
      return Promise.reject({
        code: 400,
        message: `缺少必填欄位: ${missingFields.join(', ')}`,
        data: null,
      });
    }
  
    try {
      if (isSubmitting) {
        return Promise.reject({
          code: 429,
          message: "正在提交，請稍候再試",
          data: null,
        });
      }
  
      setIsSubmitting(true);
  
      const res: resp<Student> = await asyncPost(api.InsertStudent, info);
  
      if (res.code === 200) {
        alert('學生新增成功');
        return res;
      } else {
        alert(`新增失敗：${res.message}`);
        return Promise.reject(res);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('500')) {
          alert('伺服器錯誤，請稍後再試');
          return Promise.reject({
            code: 500,
            message: "伺服器錯誤",
            data: null,
          });
        } else {
          console.error("新增學生時發生錯誤:", error);
          return Promise.reject({
            code: 500,
            message: "新增學生失敗，請稍後再試",
            data: null,
          });
        }
      } else {
        console.error("非 Error 類型的錯誤:", error);
        return Promise.reject({
          code: 500,
          message: "新增學生失敗，請稍後再試",
          data: null,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return (
    <div className="container">
      <StudentInfo
        title="新增學生"
        submitText="確認新增"
        canEdit={true}
        submit={submitHandler}
        {...initInfo}
      />
    </div>
  );
};

export default InsertStudent;
