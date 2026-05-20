import { api } from '../api';

interface Customer {
  _id: string;
  name: string;
  policyNumber: string;
  phone: string;
  insuranceType: string;
  premium: number;
}

interface Props {
  customers: Customer[];
  refresh: () => void;
  onEdit: (customer: Customer) => void;
}

const CustomerList = ({ customers, refresh, onEdit }: Props) => {
  const deleteCustomer = async (id: string) => {
    await api.delete(`/customers/${id}`);
    refresh();
  };

  return (
    <div>
      <h2>Customer List</h2>

      {customers.map((c) => (
        <div
          key={c._id}
          style={{
            background: 'white',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '10px',
            border: '1px solid #93c5fd',
          }}
        >
          <h3>{c.name}</h3>
          <p>{c.policyNumber}</p>
          <p>{c.phone}</p>
          <p>{c.insuranceType}</p>
          <p>{c.premium}</p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onEdit(c)}
              style={{
                background: '#1d4ed8',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteCustomer(c._id)}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;