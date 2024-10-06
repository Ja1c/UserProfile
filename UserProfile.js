import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, Alert, Linking, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const accentColor = '#44ffb1'; // Define your accent color here
const iconColor = '#44ffb1'; // Define a common icon color

const UserProfile = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false); // State for settings dropdown
  const [stars, setStars] = React.useState([]); // State for stars

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => {
      const newIsDarkMode = !previousState;
      if (newIsDarkMode) {
        // Generate random positions for multiple stars when dark mode is enabled
        const { width, height } = Dimensions.get('window'); // Get the screen dimensions
        const newStars = Array.from({ length: 100 }, () => ({
          top: Math.random() * (height - 10), // Adjust height accordingly
          left: Math.random() * (width - 10), // Adjust width accordingly
        }));
        setStars(newStars);
      } else {
        setStars([]); // Clear stars when switching back to light mode
      }
      return newIsDarkMode;
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: () => Alert.alert('Logged Out', 'You have successfully logged out.', [{ text: 'OK' }]),
          style: 'default',
        },
      ],
      { cancelable: false }
    );
  };

  // Function to open links
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open link:", err));
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Stars Component */}
      {isDarkMode && (
        <View style={styles.starsContainer}>
          {stars.map((star, index) => (
            <View key={index} style={[styles.star, { top: star.top, left: star.left }]} >
              <Text style={styles.starText}>⭐</Text>
            </View>
          ))}
        </View>
      )}

      {/* Cover Photo */}
      <View style={styles.coverPhotoContainer}>
        <Image
          style={styles.coverPhoto}
          source={require('./assets/cover.jpg')} // Replace with your cover photo image
        />
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          style={styles.avatar}
          source={require('./assets/profile.jpg')}  // Replace with your profile image
        />
      </View>

      {/* User Info Section */}
      <View style={styles.profileInfo}>
        <Text style={[styles.name, isDarkMode ? styles.darkText : styles.lightText]}>Ezra Mariñas</Text>
        <Text style={[styles.joined, isDarkMode ? styles.darkText : styles.lightText]}>BSIT-3R10</Text>
        <Text style={[styles.bio, isDarkMode ? styles.darkText : styles.lightText]}>
          Rawr🦖
        </Text>
      </View>

      {/* External Links Section */}
      <View style={styles.externalLinksSection}>
        <TouchableOpacity style={styles.menuItem} onPress={() => openLink('https://github.com/Ja1c')}>
          <View style={styles.iconContainer}>
            <Icon name="logo-github" size={24} color={iconColor} />
          </View>
          <Text style={[styles.menuText, isDarkMode ? styles.darkText : styles.lightText]}>GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => openLink('https://expo.dev/accounts/ja1c')}>
          <View style={styles.iconContainer}>
            <Icon name="logo-electron" size={24} color={iconColor} />
          </View>
          <Text style={[styles.menuText, isDarkMode ? styles.darkText : styles.lightText]}>Expo Go</Text>
        </TouchableOpacity>
      </View>

      {/* Lowered Settings Section */}
      <TouchableOpacity onPress={() => setIsSettingsOpen(!isSettingsOpen)} style={[styles.menuItem, { marginTop: 30 }]}>
        <View style={styles.iconContainer}>
          <Icon name="settings-outline" size={24} color={iconColor} />
        </View>
        <Text style={[styles.menuText, isDarkMode ? styles.darkText : styles.lightText]}>Settings</Text>
      </TouchableOpacity>

      {isSettingsOpen && (
        <View style={styles.settingsDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.iconContainer}>
              <Icon name="person-outline" size={24} color={iconColor} />
            </View>
            <Text style={[styles.menuText, isDarkMode ? styles.darkText : styles.lightText]}>Manage User</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.iconContainer}>
              <Icon name="notifications-outline" size={24} color={iconColor} />
            </View>
            <Text style={[styles.menuText, isDarkMode ? styles.darkText : styles.lightText]}>Notifications</Text>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.iconContainer}>
              <Icon 
                name="moon-outline" 
                size={24} 
                color={isDarkMode ? '#FFD700' : iconColor} // Change color to yellow (#FFD700) in dark mode
                style={isDarkMode ? styles.glow : null} // Add glow effect in dark mode
              />
            </View>
            <Text style={[styles.menuText, isDarkMode ? styles.darkText : styles.lightText]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              style={styles.switch}
            />
          </View>
        </View>
      )}

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Icon name="log-out-outline" size={20} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start', // Align to the left
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  starsContainer: {
    position: 'absolute', // Position it to cover the background
    top: 0,
    left: 0,
    width: Dimensions.get('window').width, // Full screen width
    height: Dimensions.get('window').height, // Full screen height
    pointerEvents: 'none', // Allow touches to pass through
    zIndex: -1, // Send to the back
  },
  star: {
    position: 'absolute',
    width: 10, // Smaller star width
    height: 10, // Smaller star height
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    fontSize: 6, // Smaller font size for stars
    color: '#FFD700', // Gold color for stars
  },
  coverPhotoContainer: {
    position: 'relative',
    width: '100%',
    height: 150, // Height for the cover photo
    overflow: 'hidden',
    borderRadius: 10, // Optional: rounded corners
    marginTop: 20,
    marginBottom: -80, // Overlap the profile picture
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profilePictureContainer: {
    alignItems: 'center', // Center align the profile picture
    marginBottom: 10, // Space below the profile picture
  },
  avatar: {
    width: 120, // Increase the width for the avatar
    height: 120, // Increase the height for the avatar
    borderRadius: 60, // Keep it half of the width/height for a circular shape
    borderWidth: 2,
    borderColor: accentColor, 
  },
  profileInfo: {
    alignItems: 'flex-start', // Align user info to the left
    marginBottom: 20, // Space below user info
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  joined: {
    fontSize: 18, // Font size for joined section
    marginBottom: 5,
  },
  bio: {
    fontSize: 16, // Font size for bio
    marginBottom: 10,
  },
  externalLinksSection: {
    marginTop: -20, // Space above the external links section
    width: '100%', // Adjust width to 100%
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0, // No horizontal padding
    width: '100%',
  },
  settingsDropdown: {
    paddingLeft: 50, // Indent the settings dropdown items
    width: '100%',
  },
  menuText: {
    fontSize: 20,
    marginLeft: 10, // Adjusted margin for better alignment
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
  },
  switch: {
    marginLeft: 'auto',
  },
  logoutButton: {
    position: 'absolute', // Position it in the bottom left
    left: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: accentColor, // Use accent color for the button background
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14, // Smaller font size
    marginLeft: 5, // Space between icon and text
  },
  logoutIcon: {
    marginRight: 5,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  glow: {
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default UserProfile;
