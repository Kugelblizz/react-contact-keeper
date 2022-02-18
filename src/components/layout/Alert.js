import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';

const Alert = () => {
  const { alert, removeAlert } = useContext(AlertContext);

  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i> {alert.text}
        <i className="fas fa-close" style={{ float: 'right', cursor: 'pointer' }} onClick={removeAlert}></i>
      </div>
    )
  );
};

export default Alert;
