import { FaWindowMinimize, FaWindowMaximize, FaTimes } from 'react-icons/fa';

declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;
    };
  }
}

const CustomTitleBar = () => {
  const handleMinimize = () => {
    window.electronAPI.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electronAPI.maximizeWindow();
  };

  const handleClose = () => {
    window.electronAPI.closeWindow();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222',
        height: '30px',
        padding: '0 10px',
        color: 'white',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 9999,
        // @ts-ignore
        WebkitAppRegion: 'drag', // Enable dragging
      }}
    >
      <div style={{ fontSize: '6px', marginLeft: "10px", color: 'gray', fontWeight: 'bold' }}>BURGER<span style={{color: "orange"}}>ANIME</span></div>
      <div style={{ display: 'flex', WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button
          onClick={handleMinimize}
          style={{
            margin: '0 5px',
            fontSize: '10px',
            background: 'none',
            border: 'none',
            color: 'orange',
            cursor: 'pointer',
          }}
        >
          <FaWindowMinimize />
        </button>
        <button
          onClick={handleMaximize}
          style={{
            margin: '0 5px',
            fontSize: '10px',
            background: 'none',
            border: 'none',
            color: 'orange',
            cursor: 'pointer',
          }}
        >
          <FaWindowMaximize />
        </button>
        <button
          onClick={handleClose}
          style={{
            margin: '0 5px',
            fontSize: '12px',
            background: 'none',
            border: 'none',
            color: 'orange',
            cursor: 'pointer',
          }}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default CustomTitleBar;