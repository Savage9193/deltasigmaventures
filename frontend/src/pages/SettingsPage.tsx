import React from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, List, ListItem, ListItemText, Switch, ListItemSecondaryAction } from '@mui/material';
import { Security, Notifications, AccountCircle, Palette } from '@mui/icons-material';

const SettingsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your application preferences and account settings
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 3 }}>
        {/* Account Settings */}
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccountCircle sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Account Settings
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive email updates about your account" 
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Two-Factor Authentication" 
                  secondary="Add an extra layer of security to your account" 
                />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Security sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Privacy & Security
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Profile Visibility" 
                  secondary="Make your profile visible to other users" 
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Data Sharing" 
                  secondary="Share anonymous usage data to improve the service" 
                />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Palette sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Appearance
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Dark Mode" 
                  secondary="Use dark theme across the application" 
                />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Compact View" 
                  secondary="Use more compact layout to save screen space" 
                />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Notifications sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Notifications
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Push Notifications" 
                  secondary="Receive push notifications in your browser" 
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Sound Effects" 
                  secondary="Play sounds for notifications" 
                />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SettingsPage;
