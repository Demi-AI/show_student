/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
import { resp } from "../interface/resp";
import { Student } from "../interface/Student";
export async function asyncGet<T = any>(api: string): Promise<T> {
    try {
      const res: Response = await fetch(api);
  
      // 檢查 HTTP 狀態碼是否為成功
      if (!res.ok) {
        // 返回一個帶有狀態碼與錯誤訊息的錯誤物件
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }
  
      // 嘗試解析 JSON
      try {
        const data: T = await res.json();
        return data;
      } catch (jsonError) {
        throw new Error("Failed to parse JSON response.");
      }
    } catch (error: any) {
      console.error(`Error fetching API: ${api}`, error.message || error);
      throw error; // 再次拋出錯誤以便呼叫方處理
    }
  }
  

  export async function asyncPost(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'POST',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: body instanceof FormData ? body : JSON.stringify(body),
        mode: "cors"
    });
    try {
        const data = await res.json(); // 改為 await 來處理異步操作
        return data;
    } catch (error) {
        console.error('Error parsing response JSON:', error);
        return { success: false, message: '系統錯誤，請稍後再試！' }; // 返回统一格式的错误信息
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// utils/fetch.ts

export async function asyncDelete(api: string): Promise<resp<boolean>> {
    try {
        const response = await fetch(api, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            mode: 'cors',
        });

        const result: resp<boolean> = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting:', error);
        return { code: 500, message: '系統錯誤，請稍後再試！', body: false }; // 返回统一格式的错误信息
    }
}


export async function asyncPut(api: string, body: Student): Promise<resp<Student | null>> {
    try {
        const res: Response = await fetch(api, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(body),
            mode: 'cors',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || '更新請求失敗');
        }

        if (data && data.body) {
            return data;
        } else {
            return {
                code: 500,
                message: '服務器端返回數據不符合預期',
                body: null
            };
        }
    } catch (error) {
        console.error('Update request failed', error);
        return {
            code: 500,
            message: '服務器端錯誤',
            body: null
        };
    }
}
