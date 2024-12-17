import React from 'react';
import DeleteStudent from '../componets/DeleteStudent';
import '../style/Delete.css';

function DeletePage(): JSX.Element {
  return (
    <div>
      <h2>刪除學生</h2>
      <DeleteStudent />
      <br />
    </div>
  );
}

export default DeletePage;