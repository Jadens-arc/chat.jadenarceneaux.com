import { useEffect } from 'react';

function Alert({ id, type, content, duration, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  let className = "alert-" + type;

  return (
    <div class={className}>
      {content}
    </div>
  );
}

export default Alert;