import React from 'react';
import selectedproduct from '../../store/SelectedProduct';
import { Link } from 'react-router-dom';

function ShowDetails({value}) {
  return (
    <div>
      <Link to="/productinfo">
        <button onClick={() => selectedproduct.addItem(value)}>
          Show details
        </button>
      </Link>
    </div>
  );
}

export default ShowDetails;
