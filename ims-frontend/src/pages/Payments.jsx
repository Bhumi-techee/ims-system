import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem
} from "@mui/material";
import API from "../api/axios";

export default function Payments() {

  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    paymentDate: "",
    amount: "",
    paymentMode: "",
    invoice: { id: "" }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const p = await API.get("/payments");
    const i = await API.get("/invoices");
    setPayments(p.data);
    setInvoices(i.data);
  };

  const handleSubmit = async () => {
    await API.post("/payments", form);
    fetchData();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <h2>Payments</h2>

      <TextField
        type="date"
        onChange={(e) =>
          setForm({ ...form, paymentDate: e.target.value })
        }
      />

      <TextField
        label="Amount"
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <TextField
        label="Payment Mode"
        onChange={(e) =>
          setForm({ ...form, paymentMode: e.target.value })
        }
      />

      <TextField
        select
        label="Invoice"
        onChange={(e) =>
          setForm({ ...form, invoice: { id: e.target.value } })
        }
      >
        {invoices.map((i) => (
          <MenuItem key={i.id} value={i.id}>
            {i.id}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleSubmit}>
        Add Payment
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Mode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.paymentDate}</TableCell>
              <TableCell>{p.amount}</TableCell>
              <TableCell>{p.paymentMode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}