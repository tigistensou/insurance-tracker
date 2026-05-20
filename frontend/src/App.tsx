import { useEffect, useState } from 'react';
import { api } from './api';

import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import Login from './components/Login';


function App() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [editCustomer, setEditCustomer] = useState<any>(null);
  const [search, setSearch] = useState('');

  // Fetch customers from backend
  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers');
      setCustomers(res.data);
    } catch (error) {
      console.log('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem('token')
);


  // Start editing
  const handleEdit = (customer: any) => {
    setEditCustomer(customer);
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter((c) => {
    const keyword = search.toLowerCase();

    return (
      c.name.toLowerCase().includes(keyword) ||
      c.policyNumber.toLowerCase().includes(keyword) ||
      c.phone.toLowerCase().includes(keyword) ||
      c.insuranceType.toLowerCase().includes(keyword)
    );
  });
  if (!isLoggedIn) {
  return (
    <Login setIsLoggedIn={setIsLoggedIn} />
  );
}
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        padding: '30px',
        fontFamily: 'Arial',
      }}
    >
     
        <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  }}
>
  <h1
    style={{
      color: '#1d4ed8',
    }}
  >
    Insurance Customer Tracker System
  </h1>

  <button
    onClick={() => {
      localStorage.removeItem('token');
      window.location.reload();
    }}
    style={{
      background: '#dc2626',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
    }}
  >
    Logout
  </button>
</div>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search by name, policy, phone, insurance type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #60a5fa',
            marginBottom: '20px',
            outline: 'none',
            fontSize: '14px',
          }}
        />

        {/* FORM */}
        <CustomerForm
          refresh={fetchCustomers}
          editCustomer={editCustomer}
          setEditCustomer={setEditCustomer}
        />

        {/* LIST */}
        <CustomerList
          customers={filteredCustomers}
          refresh={fetchCustomers}
          onEdit={handleEdit}
        />
      </div>
     );
}

export default App;