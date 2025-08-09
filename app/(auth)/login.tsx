import { View } from 'react-native';
import Auth from '../../components/Auth';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Auth />
    </View>
  );
}