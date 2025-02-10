import { useState } from "react";
import { TextField, Button, MenuItem, Container, Typography } from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthcontext.jsx";

// const categories = ["Electronics", "Books", "Clothing", "Furniture", "Other"];
const categories = [
  'Electronics',
  'Books',
  'Clothing',
  'Furniture',
  'Sports',
  'Stationery',
  'Other'
].map(cat => cat.toLowerCase());

const CreateItem = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/items",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Item created successfully!");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Create New Item</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Item Name" name="name" fullWidth margin="normal" required onChange={handleChange} />
        <TextField label="Description" name="description" fullWidth margin="normal" multiline rows={3} onChange={handleChange} />
        <TextField label="Price" name="price" type="number" fullWidth margin="normal" required onChange={handleChange} />
        <TextField select label="Category" name="category" fullWidth margin="normal" required onChange={handleChange}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
        <TextField label="Image URL" name="imageUrl" fullWidth margin="normal" required onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Create Item</Button>
      </form>
    </Container>
  );
};

export default CreateItem;
