import React from 'react';
import styling from './Notification.module.css';

export interface NotificationProps {
  text: string,
  type?: 'error' | 'success'
}

const Notification: React.FC<NotificationProps> = ({
  text,
  type = 'error',
}) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Set to true after load for transition to render
    setShow(true);

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div className={styling.wrapper + ' ' + (show ? styling.show : '')}>
      <div className={`${styling.notification} ${styling[type]}`}
           role='alert'>
        {text}
      </div>
    </div>
  )
}

export default Notification