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

const PrivacyPage = () => {
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
          {t("privacy.title")}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t("privacy.subtitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("privacy.lastUpdated")}
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
            {t("privacy.sections.collection.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("privacy.sections.collection.description")}
          </Typography>
          <List>
            {["personal", "usage", "device"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`privacy.sections.collection.items.${item}.title`)}
                  secondary={t(
                    `privacy.sections.collection.items.${item}.description`
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
            {t("privacy.sections.usage.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("privacy.sections.usage.description")}
          </Typography>
          <List>
            {["service", "communication", "improvement"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`privacy.sections.usage.items.${item}.title`)}
                  secondary={t(
                    `privacy.sections.usage.items.${item}.description`
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
            {t("privacy.sections.sharing.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("privacy.sections.sharing.description")}
          </Typography>
          <List>
            {["partners", "legal", "business"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`privacy.sections.sharing.items.${item}.title`)}
                  secondary={t(
                    `privacy.sections.sharing.items.${item}.description`
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
            {t("privacy.sections.security.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("privacy.sections.security.description")}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("privacy.sections.cookies.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("privacy.sections.cookies.description")}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("privacy.sections.rights.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("privacy.sections.rights.description")}
          </Typography>
          <List>
            {["access", "correction", "deletion"].map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={t(`privacy.sections.rights.items.${item}.title`)}
                  secondary={t(
                    `privacy.sections.rights.items.${item}.description`
                  )}
                  primaryTypographyProps={{ color: "text.primary" }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("privacy.sections.changes.title")}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {t("privacy.sections.changes.description")}
          </Typography>
        </Box>
      </Paper>

      {/* Contact Information */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          {t("privacy.contact")}
        </Typography>
        <Typography variant="body1" color="primary">
          privacy@example.com
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPage;
