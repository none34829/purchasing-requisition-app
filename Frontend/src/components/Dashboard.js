import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { TextField, Button, Grid, InputAdornment, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CategoryButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  // Handle search functionality
  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length > 2) {
      try {
        const response = await axios.get(`/api/products?search=${event.target.value}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    } else {
      setProducts([]); // Clear the product list if search query is too short
    }
  };

  return (
    <div>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder="Good Morning Sanjay. Would you like to place a new request?"
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Render search results */}
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>{product.name}</ListItem>
        ))}
      </List>

      <Grid container spacing={3}>
        <Grid item>
          <CategoryButton component={Link} to="/new-item" variant="contained" color="primary">
            Laptop
          </CategoryButton>
        </Grid>
        <Grid item>
          <CategoryButton component={Link} to="/new-item" variant="contained" color="primary">
            Software
          </CategoryButton>
        </Grid>
        <Grid item>
          <CategoryButton component={Link} to="/new-item" variant="contained" color="primary">
            New Supplier
          </CategoryButton>
        </Grid>
        <Grid item>
          <CategoryButton component={Link} to="/new-item" variant="contained" color="primary">
            New Item
          </CategoryButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
