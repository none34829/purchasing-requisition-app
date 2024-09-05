import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function NewItemForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplierName: '',
    productInfo: '',
    websiteUrl: '', // Added websiteUrl field
    category: '',
    quantity: 1, // Set a default quantity
    timeline: '',
    location: '',
    requiredFor: '',
  });
  
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch categories and locations from backend
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('/api/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form and submit
    axios.post('/api/submit-form', formData)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
        navigate('/success'); // Navigate to success page after submission
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <BackButton
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        variant="outlined"
      >
        Back
      </BackButton>
      <StyledForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="supplierName"
              variant="outlined"
              required
              fullWidth
              label="Name of Supplier"
              value={formData.supplierName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="productInfo"
              variant="outlined"
              required
              fullWidth
              label="Product Information"
              value={formData.productInfo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="websiteUrl" // Website URL input field
              variant="outlined"
              fullWidth
              label="Product Website URL"
              value={formData.websiteUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="category"
              select
              variant="outlined"
              required
              fullWidth
              label="Category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="quantity"
              variant="outlined"
              required
              fullWidth
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="timeline"
              variant="outlined"
              required
              fullWidth
              label="Timeline"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.timeline}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="location"
              select
              variant="outlined"
              required
              fullWidth
              label="Location"
              value={formData.location}
              onChange={handleChange}
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.name}>
                  {location.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="requiredFor"
              variant="outlined"
              required
              fullWidth
              label="Required For"
              value={formData.requiredFor}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Submit
        </SubmitButton>
      </StyledForm>
    </>
  );
}

export default NewItemForm;
