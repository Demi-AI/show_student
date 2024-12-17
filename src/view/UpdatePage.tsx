import React from 'react';
import UpdateStudent from '../componets/UpdateStudent';
import '../style/Update.css';

function UpdatePage(): JSX.Element {
  return (
    <div>
      <h2>修改學生</h2>
      <UpdateStudent />
      <br />
    </div>
  );
}

export default UpdatePage;