import { useEffect, useState } from 'react';
import { api } from '../api';

interface Props {
  refresh: () => void;
  editCustomer: any;
  setEditCustomer: (c: any) => void;
}

const CustomerForm = ({
  refresh,
  editCustomer,
  setEditCustomer,
}: Props) => {
  const [form, setForm] = useState({
    name: '',
    policyNumber: '',
    phone: '',
    insuranceType: '',
    premium: '',
  });

  useEffect(() => {
    if (editCustomer) {
      setForm(editCustomer);
    }
  }, [editCustomer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editCustomer) {
      await api.put(`/customers/${editCustomer._id}`, {
        ...form,
        premium: Number(form.premium),
      });

      setEditCustomer(null); // IMPORTANT
    } else {
      await api.post('/customers', {
        ...form,
        premium: Number(form.premium),
      });
    }

    setForm({
      name: '',
      policyNumber: '',
      phone: '',
      insuranceType: '',
      premium: '',
    });

    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editCustomer ? 'Edit Customer' : 'Add Customer'}</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Policy Number"
        value={form.policyNumber}
        onChange={(e) =>
          setForm({
            ...form,
            policyNumber: e.target.value,
          })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        placeholder="Insurance Type"
        value={form.insuranceType}
        onChange={(e) =>
          setForm({
            ...form,
            insuranceType: e.target.value,
          })
        }
      />

      <input
        placeholder="Premium"
        value={form.premium}
        onChange={(e) =>
          setForm({ ...form, premium: e.target.value })
        }
      />

      <button type="submit">
        {editCustomer ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default CustomerForm;