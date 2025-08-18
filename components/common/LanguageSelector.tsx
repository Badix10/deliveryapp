import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { changeLanguage, useTranslation } from '../../i18n';

interface LanguageSelectorProps {
  style?: 'button' | 'card';
  showLabel?: boolean;
}

export default function LanguageSelector({ 
  style = 'card', 
  showLabel = true 
}: LanguageSelectorProps) {
  const { t, language } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ] as const;

  const handleLanguageChange = async (newLanguage: 'fr' | 'ar') => {
    if (newLanguage === language) return;

    try {
      const needsRestart = await changeLanguage(newLanguage);
      
      if (needsRestart) {
        Alert.alert(
          t('settings.restartRequired'),
          'L\'application doit être redémarrée pour appliquer les changements RTL.',
          [
            { 
              text: t('common.cancel'), 
              style: 'cancel' 
            },
            { 
              text: t('common.confirm'), 
              onPress: () => {
                // Note: Dans une vraie app, on pourrait utiliser RNRestart
                console.log('Restart needed for RTL changes');
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        t('common.error'),
        'Erreur lors du changement de langue'
      );
    }
  };

  if (style === 'button') {
    return (
      <View className="flex-row space-x-2">
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => handleLanguageChange(lang.code as 'fr' | 'ar')}
            className={`px-4 py-2 rounded-lg border ${
              language === lang.code 
                ? 'bg-blue-600 border-blue-600' 
                : 'bg-white border-gray-300'
            }`}
          >
            <View className="flex-row items-center space-x-2">
              <Text>{lang.flag}</Text>
              <Text className={`font-medium ${
                language === lang.code ? 'text-white' : 'text-gray-700'
              }`}>
                {lang.code.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View className="bg-gray-50 rounded-2xl p-4">
      {showLabel && (
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {t('settings.language')}
        </Text>
      )}
      
      <View className="space-y-2">
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => handleLanguageChange(lang.code as 'fr' | 'ar')}
            className={`flex-row items-center justify-between p-4 rounded-xl border ${
              language === lang.code 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white'
            }`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center space-x-3">
              <Text className="text-2xl">{lang.flag}</Text>
              <Text className={`text-base font-medium ${
                language === lang.code ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {lang.name}
              </Text>
            </View>
            
            {language === lang.code && (
              <View className="w-6 h-6 bg-blue-600 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      <Text className="text-xs text-gray-500 mt-3 text-center">
        {t('settings.languageChanged')}
      </Text>
    </View>
  );
}