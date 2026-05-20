interface Props {
  setPage: (page: string) => void;
}

const Navbar = ({ setPage }: Props) => {
  return (
    <div style={navStyle}>
      <h2 style={{ color: 'white' }}>
        Insurance Tracker
      </h2>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setPage('add')} style={btn}>
          Add
        </button>

        <button onClick={() => setPage('view')} style={btn}>
          View
        </button>
      </div>
    </div>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#1d4ed8',
  padding: '15px 20px',
  borderRadius: '10px',
  marginBottom: '20px',
};

const btn = {
  background: 'white',
  color: '#1d4ed8',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default Navbar;