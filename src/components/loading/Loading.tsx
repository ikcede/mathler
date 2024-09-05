import React from 'react';
import styling from './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styling.loading}>
      Loading...
      <div className={styling.loader}></div>
    </div>
  );
};

export default Loading;
