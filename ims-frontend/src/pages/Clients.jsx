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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import API from "../api/axios";

export default function Clients() {

  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await API.get("/clients");
    setClients(res.data);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await API.put(`/clients/${editingId}`, form);
        showSnackbar("Client updated successfully");
        setEditingId(null);
      } else {
        await API.post("/clients", form);
        showSnackbar("Client added successfully");
      }

      setForm({ name: "", email: "", phone: "", address: "" });
      fetchClients();

    } catch {
      showSnackbar("Operation failed", "error");
    }
  };

  const handleEdit = (client) => {
    setForm(client);
    setEditingId(client.id);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/clients/${deleteId}`);
      showSnackbar("Client deleted successfully");
      fetchClients();
    } catch {
      showSnackbar("Delete failed", "error");
    }
    setOpenDialog(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <h2>Clients</h2>

      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        sx={{ mr: 2 }}
      />

      <Button variant="contained" onClick={handleSubmit}>
        {editingId ? "Update" : "Add"}
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clients.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.address}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(c)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(c.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this client?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Paper>
  );
}