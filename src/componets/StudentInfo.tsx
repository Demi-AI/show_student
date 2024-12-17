import { useState } from "react";
import '../style/Info.css'

// 使用您提供的介面
export interface Student {
    _id?: string;
    /**
     * 帳號
     */
    userName: string;
    /**
     * 座號
     */
    sid: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 院系
     */
    department: string;
    /**
     * 年級
     */
    grade: string;
    /**
     * 班級
     */
    class: string;
    /**
     * Email
     */
    Email: string;
    /**
     * 缺席次數
     */
    absences?: number | undefined;
}

export interface resp<E> {
    code: number,
    message: string,
    body: E
}

interface StudentInfoProps extends Omit<Student, '_id'> {
    _id?: string;
    onClick?: () => void;
    canEdit?: boolean;
    submit?: (info: Student) => Promise<resp<any>>;
    title?: string;
    submitText?: string;
    canDelete?: boolean;
    deleteHandler?: () => void;
}

export const StudentInfo: React.FC<StudentInfoProps> = ({
    onClick,
    canEdit,
    submit,
    title,
    submitText,
    canDelete,
    deleteHandler,
    ...studentData
}) => {
    const [info, setInfo] = useState<Student>(studentData);
    const [error, setError] = useState<string>('');

    const clickHandler = () => {
        onClick?.();
    };

    const handleInputChange = (
        field: keyof Student,
        value: string | number
    ) => {
        setInfo(prev => ({
            ...prev,
            [field]: field === 'absences' ? Number(value) : value
        }));
        setError(''); // 清除錯誤訊息
    };

    const handleSubmit = async () => {
        if (!submit) return;

        try {
            const response = await submit(info);
            if (response.code !== 200) {
                setError(response.message);
                return;
            }
            // 成功處理邏輯
        } catch (err) {
            setError(err instanceof Error ? err.message : '提交失敗');
        }
    };

    if (!canEdit) {
        return null;
    }

    return (
        <div className="studentEdit" key={info._id} onClick={clickHandler}>
            <div className="info">
                <h1>{title}</h1>
                {/* 顯示錯誤訊息 */}
                {error && <div className="error-message">{error}</div>}
                
                {[
                    { label: '帳號', field: 'userName' },
                    { label: '座號', field: 'sid' },
                    { label: '姓名', field: 'name' },
                    { label: '院系', field: 'department' },
                    { label: '年級', field: 'grade' },
                    { label: '班級', field: 'class' },
                    { label: 'Email', field: 'Email' }
                ].map(({ label, field }) => (
                    <div className="info" key={field}>
                        <p>{label}：</p>
                        <input
                            type="text"
                            value={info[field as keyof Student] as string}
                            onChange={(e) => handleInputChange(field as keyof Student, e.target.value)}
                        />
                    </div>
                ))}
                
                <div className="info">
                    <p>缺席次數：</p>
                    <input
                        type="number"
                        min="0"
                        value={info.absences || 0}
                        onChange={(e) => handleInputChange('absences', e.target.value)}
                    />
                </div>
            </div>

            <div className="btn">
                <button 
                    className="submit" 
                    onClick={handleSubmit}
                    disabled={!!error}
                >
                    {submitText}
                </button>
                
                {canDelete && (
                    <button 
                        className="delete" 
                        onClick={deleteHandler}
                    >
                        刪除
                    </button>
                )}
            </div>
        </div>
    );
};
