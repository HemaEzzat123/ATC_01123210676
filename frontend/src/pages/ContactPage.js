import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/contact", formData);
      toast.success(t("contact.form.success"));
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || t("contact.form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: 8,
          color: "text.primary",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {t("contact.title")}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t("contact.subtitle")}
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color="primary"
            >
              {t("contact.form.title")}
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("contact.form.name")}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("contact.form.email")}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t("contact.form.subject")}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t("contact.form.message")}
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading
                      ? t("contact.form.sending")
                      : t("contact.form.send")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color="primary"
            >
              {t("contact.info.title")}
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={t("contact.info.email")}
                  secondary="support@example.com"
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={t("contact.info.phone")}
                  secondary="+1 (555) 123-4567"
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <LocationIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={t("contact.info.address")}
                  secondary="123 Event Street, City, Country"
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <TimeIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={t("contact.info.hours")}
                  secondary="Mon-Fri: 9:00 AM - 6:00 PM"
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
