功能

Create: 新增學生資料
Read: 查詢學生資料
Update: 更新學生資料
Delete: 刪除學生資料

安裝與執行指引

- 環境需求
前端開發 : React + ts
後端開發 : Node.js
資料庫 : MongoDB
API測試 : PostMan
安裝套件 : npm


API 規格說明

查詢學生資料(Read)：
請求方式 : GET 方法  /api/v1/user/findAll
格式 : JSON

-回應-
{
    "code": 200,
    "message": "Students retrieved successfully",
    "body": {
        "userName": "tkuim1229",
        "name": "廖霆宇",
        "department": "電機工程學系",
        "grade": "三年級",
        "class": "C",
        "Email": "anpersonliao@gmail.com"
        "_id": "6764221c016f7db4255ea947",
        "__v": 0
    }
}

新增學生資料(Create):
請求方式 : POST 方法 /api/v1/user/insertOne
格式 : JSON

-請求參數-
Body :
{
    "userName": "tkuim1229",
    "name": "廖霆宇",
    "department": "電機工程學系",
    "grade": "三年級",
    "class":"C",
    "Email": "anpersonliao@gmail.com"
}

-回應-
成功：
{
    "code": 200,
    "message": "",
    "body": {
        "userName": "tkuim1229",
        "sid": "47",
        "name": "廖霆宇",
        "department": "電機工程學系",
        "grade": "三年級",
        "class": "C",
        "Email": "anpersonliao@gmail.com",
        "_id": "6764221c016f7db4255ea947",
        "__v": 0
    }
}
失敗 :
{
    "code": 403,
    "message": "座號已存在"
}

刪除學生資料(Delete):
請求方式 : DELETE 方法 /api/v1/user/deleteById
格式 : JSON

-請求參數-
Body :
{
    "_id": "6764221c016f7db4255ea947"
}

-回應-
成功 :
{
    "code": 200,
    "message": "sucess",
    "body": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
失敗 :
{
  "code": 404,
  "message": "User not found"
}

更新學生資料(Update);
請求方式 : PUT 方法 /api/v1/user/updateNameByID
格式 : JSON

-請求參數-
Body :
{
    "_id": "6764221c016f7db4255ea947",
    "userName": "tkuim9229"
}

-回應-
成功：
{
    "code": 200,
    "message": "Update successful",
    "body": {
        "_id": "6764221c016f7db4255ea947",
        "userName": "tkuim9229",
        "sid": "47",
        "name": "廖霆宇",
        "department": "電機工程學系",
        "grade": "三年級",
        "class": "C",
        "Email": "anpersonliao@gmail.com",
        "absences": 0,
        "__v": 0
    }
}
失敗 :
{
    "code": 404,
    "message": "User not found"
}

