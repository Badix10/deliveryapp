import { View } from 'react-native';
import Auth from '../../components/auth/Auth';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Auth />
    </View>
  );
}