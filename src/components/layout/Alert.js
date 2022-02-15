import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alert, onClose }) => {
  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i> {alert.text}
        <i className="fas fa-close" style={{ float: 'right', cursor: 'pointer' }} onClick={onClose}></i>
      </div>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
