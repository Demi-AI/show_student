import React from 'react';
import GetStudent from '../componets/GetStudent';
import '../style/Get.css';

function GetPage(): JSX.Element {
  return (
    <div>
      <h2>查詢學生</h2>
      <GetStudent />
      <br />
    </div>
  );
}

export default GetPage;