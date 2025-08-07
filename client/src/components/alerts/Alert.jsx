import { useEffect } from 'react';

function Alert({ id, type, content, duration, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {content}
    </div>
  );
}

export default Alert;