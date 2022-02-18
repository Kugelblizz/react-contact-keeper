import { useReducer } from 'react';
import { REMOVE_ALERT, SET_ALERT } from '../types';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = (props) => {
    const initalState = {
        alert: null
    }

    const [state, dispatch] = useReducer(AlertReducer, initalState);


    const setAlert = (text, type) =>{        
        dispatch({ type: SET_ALERT, payload: {text, type} });
        
        setTimeout(() => {
            removeAlert();
        }, 8000);
    }

    const removeAlert = () => {
        dispatch({type: REMOVE_ALERT});
    }


    return (<AlertContext.Provider value={{alert: state.alert, setAlert, removeAlert}}>{props.children}</AlertContext.Provider>)


}

export default AlertState;