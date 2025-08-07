import Alert from "@/components/alerts/Alert"
import {
    useState,
    useEffect,
    createContext,
    useContext,
    useLayoutEffect,
} from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);

    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (type, content, duration) => {
    setAlerts([...alerts, {"id": Date.now(), "type": type, "content": content, "duration": duration}]);
    }

    const removeAlert = (id) => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    };

    useEffect(() => {
      console.log(alerts);
    }, [alerts]);

    return (
        <AlertContext.Provider value={{ alerts, setAlerts, addAlert }}>
          {alerts.map(alert => (
            <Alert id={alert.id} type={alert.type} content={alert.content} duration={alert.duration} onClose={removeAlert}/>
          ))}
          {children}
        </AlertContext.Provider>
    );
};

