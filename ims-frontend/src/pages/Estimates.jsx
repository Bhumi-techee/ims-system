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

export default function Estimates() {

  const [estimates, setEstimates] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    status: "",
    client: { id: "" }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const e = await API.get("/estimates");
    const c = await API.get("/clients");
    setEstimates(e.data);
    setClients(c.data);
  };

  const handleSubmit = async () => {
    await API.post("/estimates", form);
    fetchData();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <h2>Estimates</h2>

      <TextField
        type="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <TextField
        label="Amount"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <TextField
        label="Status"
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />

      <TextField
        select
        label="Client"
        onChange={(e) =>
          setForm({ ...form, client: { id: e.target.value } })
        }
      >
        {clients.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleSubmit}>
        Add Estimate
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Client</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estimates.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.date}</TableCell>
              <TableCell>{e.amount}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell>{e.client?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}