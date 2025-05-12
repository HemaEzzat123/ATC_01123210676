import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";
import SecurityIcon from "@mui/icons-material/Security";
import SupportIcon from "@mui/icons-material/Support";
import SpeedIcon from "@mui/icons-material/Speed";

const AboutPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const features = [
    {
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      title: t("about.features.easyBooking.title"),
      description: t("about.features.easyBooking.description"),
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: t("about.features.secure.title"),
      description: t("about.features.secure.description"),
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: t("about.features.support.title"),
      description: t("about.features.support.description"),
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: t("about.features.fast.title"),
      description: t("about.features.fast.description"),
    },
  ];

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
          {t("about.title")}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t("about.subtitle")}
        </Typography>
      </Box>

      {/* Mission Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 6,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          {t("about.mission.title")}
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          {t("about.mission.description")}
        </Typography>
      </Paper>

      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="primary"
          sx={{ mb: 4 }}
        >
          {t("about.features.title")}
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="primary"
          sx={{ mb: 4 }}
        >
          {t("about.team.title")}
        </Typography>
        <Grid container spacing={4}>
          {["member1", "member2", "member3"].map((member) => (
            <Grid item xs={12} md={4} key={member}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={t(`about.team.${member}.image`)}
                  alt={t(`about.team.${member}.name`)}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    color="primary"
                  >
                    {t(`about.team.${member}.name`)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    {t(`about.team.${member}.role`)}
                  </Typography>
                  <Typography color="text.secondary">
                    {t(`about.team.${member}.bio`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
