import React from 'react';
import InsertStudent from '../componets/InsertStudent';
import '../style/Insert.css';

function InsertPage(): JSX.Element {
  return (
    <div>
      <h2>新增學生</h2>
      <InsertStudent />
      <br />
    </div>
  );
}

export default InsertPage;