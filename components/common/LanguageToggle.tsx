import { Text, TouchableOpacity } from 'react-native';
import { changeLanguage, useTranslation } from '../../i18n';

interface LanguageToggleProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function LanguageToggle({ 
  size = 'medium', 
  showText = true 
}: LanguageToggleProps) {
  const { language } = useTranslation();

  const handleToggle = async () => {
    const newLanguage = language === 'fr' ? 'ar' : 'fr';
    await changeLanguage(newLanguage);
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-3 py-2 text-base',
    large: 'px-4 py-3 text-lg'
  };

  const currentFlag = language === 'fr' ? '🇫🇷' : '🇸🇦';
  const currentText = language === 'fr' ? 'FR' : 'ع';

  return (
    <TouchableOpacity
      onPress={handleToggle}
      className={`bg-white border border-gray-300 rounded-lg flex-row items-center space-x-2 ${sizeClasses[size]} shadow-sm`}
      activeOpacity={0.7}
    >
      <Text className="text-lg">{currentFlag}</Text>
      {showText && (
        <Text className={`font-semibold text-gray-700 ${size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm'}`}>
          {currentText}
        </Text>
      )}
    </TouchableOpacity>
  );
}