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
import { jsPDF } from "jspdf";

export default function Invoices() {

  const [invoices, setInvoices] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [form, setForm] = useState({
    date: "",
    baseAmount: "",
    estimate: { id: "" }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const i = await API.get("/invoices");
    const e = await API.get("/estimates");
    setInvoices(i.data);
    setEstimates(e.data);
  };

  const handleSubmit = async () => {
    await API.post("/invoices", form);
    fetchData();
  };

  // PDF GENERATOR
  const generatePDF = (invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 90, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice.id}`, 20, 40);
    doc.text(`Date: ${invoice.date}`, 20, 50);
    doc.text(`Base Amount: ₹ ${invoice.baseAmount}`, 20, 60);
    doc.text(`GST (18%): ₹ ${invoice.gstAmount}`, 20, 70);
    doc.text(`Total Amount: ₹ ${invoice.totalAmount}`, 20, 80);

    doc.save(`invoice_${invoice.id}.pdf`);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <h2>Invoices (GST 18%)</h2>

      <TextField
        type="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        sx={{ mr: 2 }}
      />

      <TextField
        label="Base Amount"
        onChange={(e) =>
          setForm({ ...form, baseAmount: e.target.value })
        }
        sx={{ mr: 2 }}
      />

      <TextField
        select
        label="Estimate"
        onChange={(e) =>
          setForm({ ...form, estimate: { id: e.target.value } })
        }
        sx={{ mr: 2 }}
      >
        {estimates.map((e) => (
          <MenuItem key={e.id} value={e.id}>
            Estimate #{e.id}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleSubmit}>
        Generate Invoice
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Base</TableCell>
            <TableCell>GST</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>PDF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((i) => (
            <TableRow key={i.id}>
              <TableCell>₹ {i.baseAmount}</TableCell>
              <TableCell>₹ {i.gstAmount}</TableCell>
              <TableCell>₹ {i.totalAmount}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => generatePDF(i)}
                >
                  Download PDF
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}