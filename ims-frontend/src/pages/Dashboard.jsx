import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {

  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const c = await API.get("/clients");
      const i = await API.get("/invoices");
      const p = await API.get("/payments");

      setClients(c.data || []);
      setInvoices(i.data || []);
      setPayments(p.data || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  // Calculations
  const totalRevenue = invoices.reduce(
    (sum, inv) => sum + Number(inv.totalAmount || 0),
    0
  );

  const totalGST = invoices.reduce(
    (sum, inv) => sum + Number(inv.gstAmount || 0),
    0
  );

  const totalPaid = payments.reduce(
    (sum, pay) => sum + Number(pay.amount || 0),
    0
  );

  const pendingAmount = totalRevenue - totalPaid;

  // Reusable Card Component
  const Card = ({ title, value = 0, isCurrency = false }) => (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #1e293b, #334155)",
        color: "#fff",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)"
        }
      }}
    >
      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {isCurrency ? `₹ ${Number(value).toFixed(2)}` : value}
      </Typography>
    </Paper>
  );

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} sm={6} md={3}>
        <Card title="Total Clients" value={clients.length} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card title="Total Revenue" value={totalRevenue} isCurrency />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card title="GST Collected" value={totalGST} isCurrency />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card title="Pending Amount" value={pendingAmount} isCurrency />
      </Grid>

    </Grid>
  );
}