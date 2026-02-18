import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import LinkIO, { DeepLinkData } from '@linkio/react-native';

function App(): JSX.Element {
  const [deepLink, setDeepLink] = useState<DeepLinkData | null>(null);
  const [referralCode, setReferralCode] = useState('');
  const [userId, setUserId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    LinkIO.configure({
      domain: 'yourdomain.com',
      backendURL: 'https://api.yourdomain.com',
      autoCheckPendingLinks: true,
    });
    setIsConfigured(true);

    LinkIO.setDeepLinkListener((data: DeepLinkData) => {
      console.log('Deep link received:', data);
      setDeepLink(data);

      if (data.params.referralCode) {
        setReferralCode(data.params.referralCode);
        Alert.alert(
          'Referral Code Detected',
          `Auto-filled referral code: ${data.params.referralCode}`
        );
      }
    });

    return () => {
      LinkIO.cleanup();
    };
  }, []);

  const handleTrackReferral = async () => {
    if (!referralCode || !userId) {
      Alert.alert('Error', 'Please enter both referral code and user ID');
      return;
    }

    try {
      await LinkIO.trackReferral(referralCode, userId, {
        source: 'example-app',
        platform: 'react-native',
      });
      Alert.alert('Success', 'Referral tracked successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to track referral');
      console.error(error);
    }
  };

  const handleCheckPendingLink = async () => {
    try {
      await LinkIO.checkPendingLink();
      Alert.alert('Success', 'Checked for pending links');
    } catch (error) {
      Alert.alert('Error', 'Failed to check pending links');
      console.error(error);
    }
  };

  const handleTestDeepLink = () => {
    LinkIO.handleURL('https://yourdomain.com/ref/TEST123?campaign=summer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>LinkIO Example</Text>
          <Text style={styles.subtitle}>
            {isConfigured ? '✅ Configured' : '⏳ Configuring...'}
          </Text>
        </View>

        {deepLink && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Last Deep Link</Text>
            <Text style={styles.label}>URL:</Text>
            <Text style={styles.value}>{deepLink.url}</Text>
            <Text style={styles.label}>Deferred:</Text>
            <Text style={styles.value}>{deepLink.isDeferred ? 'Yes' : 'No'}</Text>
            <Text style={styles.label}>Params:</Text>
            <Text style={styles.value}>
              {JSON.stringify(deepLink.params, null, 2)}
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Track Referral</Text>

          <TextInput
            style={styles.input}
            placeholder="Referral Code"
            value={referralCode}
            onChangeText={setReferralCode}
            autoCapitalize="characters"
          />

          <TextInput
            style={styles.input}
            placeholder="User ID"
            value={userId}
            onChangeText={setUserId}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleTrackReferral}
          >
            <Text style={styles.buttonText}>Track Referral</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Actions</Text>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleCheckPendingLink}
          >
            <Text style={styles.buttonText}>Check Pending Links</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleTestDeepLink}
          >
            <Text style={styles.buttonText}>Test Deep Link</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📚 See EXAMPLE.md for usage instructions
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButton: {
    backgroundColor: '#5856D6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default App;
