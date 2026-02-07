import React from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { People, TrendingUp, Assignment, Notifications, Settings } from '@mui/icons-material';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's an overview of your system
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h4" fontWeight={600}>
                  24
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 2, color: 'success.main', fontSize: 32 }} />
                <Typography variant="h4" fontWeight={600}>
                  +12%
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Growth Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ mr: 2, color: 'warning.main', fontSize: 32 }} />
                <Typography variant="h4" fontWeight={600}>
                  8
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Active Tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 2, color: 'info.main', fontSize: 32 }} />
                <Typography variant="h4" fontWeight={600}>
                  3
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Notifications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <People color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="New user registered" 
                  secondary="John Doe joined the platform 2 hours ago"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Assignment color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Task completed" 
                  secondary="Database backup completed successfully 5 hours ago"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Notifications color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="System update" 
                  secondary="Security patches applied yesterday"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="View Reports" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="System Settings" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
