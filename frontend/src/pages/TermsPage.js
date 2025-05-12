import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const TermsPage = () => {
  const { t } = useTranslation();


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
          {t("terms.title")}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t("terms.subtitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("terms.lastUpdated")}
        </Typography>
      </Box>

      {/* Main Content */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.acceptance.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.acceptance.description")}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.accounts.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.accounts.description")}
          </Typography>
          <List>
            {["registration", "security", "termination"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`terms.sections.accounts.items.${item}.title`)}
                  secondary={t(
                    `terms.sections.accounts.items.${item}.description`
                  )}
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.bookings.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.bookings.description")}
          </Typography>
          <List>
            {["availability", "pricing", "modification"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`terms.sections.bookings.items.${item}.title`)}
                  secondary={t(
                    `terms.sections.bookings.items.${item}.description`
                  )}
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.payments.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.payments.description")}
          </Typography>
          <List>
            {["methods", "refunds", "taxes"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`terms.sections.payments.items.${item}.title`)}
                  secondary={t(
                    `terms.sections.payments.items.${item}.description`
                  )}
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.cancellations.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.cancellations.description")}
          </Typography>
          <List>
            {["policy", "refunds", "exceptions"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(
                    `terms.sections.cancellations.items.${item}.title`
                  )}
                  secondary={t(
                    `terms.sections.cancellations.items.${item}.description`
                  )}
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.prohibited.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.prohibited.description")}
          </Typography>
          <List>
            {["activities", "content", "behavior"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`terms.sections.prohibited.items.${item}.title`)}
                  secondary={t(
                    `terms.sections.prohibited.items.${item}.description`
                  )}
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.liability.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.liability.description")}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("terms.sections.changes.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("terms.sections.changes.description")}
          </Typography>
        </Box>
      </Paper>

      {/* Contact Information */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          {t("terms.contact")}
        </Typography>
        <Typography variant="body1" color="primary">
          legal@example.com
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsPage;
