import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { supabase } from '../lib/supabase'

interface Props {
  size?: number
  url: string | null
  onUpload: (filePath: string) => void
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      setImageLoading(true)
      const { data, error } = await supabase.storage.from('avatars').download(path)
      
      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result as string)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    } finally {
      setImageLoading(false)
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true)

      // Demander les permissions si nécessaire
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission requise',
          'Nous avons besoin de votre permission pour accéder à la galerie photo.'
        )
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [1, 1], // Forcer un ratio carré pour l'avatar
        quality: 0.8, // Légère compression pour optimiser l'upload
        exif: false,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.')
        return
      }

      const image = result.assets[0]
      console.log('Got image', image)

      if (!image.uri) {
        throw new Error('No image uri!')
      }

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())
      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
      const path = `${Date.now()}.${fileExt}`
      
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        })

      if (uploadError) {
        throw uploadError
      }

      Alert.alert('Succès', 'Photo de profil mise à jour avec succès!')
      onUpload(data.path)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erreur', error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }

  async function takePhoto() {
    try {
      setUploading(true)

      // Demander les permissions de caméra
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission requise',
          'Nous avons besoin de votre permission pour accéder à la caméra.'
        )
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled camera.')
        return
      }

      const image = result.assets[0]

      if (!image.uri) {
        throw new Error('No image uri!')
      }

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())
      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
      const path = `${Date.now()}.${fileExt}`
      
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        })

      if (uploadError) {
        throw uploadError
      }

      Alert.alert('Succès', 'Photo de profil mise à jour avec succès!')
      onUpload(data.path)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erreur', error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }

  function showImageOptions() {
    Alert.alert(
      'Changer la photo de profil',
      'Comment voulez-vous ajouter une photo ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Prendre une photo',
          onPress: takePhoto
        },
        {
          text: 'Choisir de la galerie',
          onPress: uploadAvatar
        }
      ],
      { cancelable: true }
    )
  }

  return (
    <View className="items-center">
      {/* Container de l'avatar */}
      <Pressable
        onPress={showImageOptions}
        disabled={uploading}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Loading overlay */}
        {(uploading || imageLoading) && (
          <View 
            className="absolute inset-0 bg-black/50 rounded-full items-center justify-center z-10"
            style={{ width: size, height: size }}
          >
            <ActivityIndicator size="large" color="white" />
          </View>
        )}

        {/* Avatar Image ou Placeholder */}
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            className="rounded-full bg-gray-200"
            style={{ width: size, height: size }}
            resizeMode="cover"
          />
        ) : (
          <View 
            className="rounded-full bg-gray-100 border-2 border-gray-300 border-dashed items-center justify-center"
            style={{ width: size, height: size }}
          >
            <Text className="text-4xl mb-1">📷</Text>
            <Text className="text-xs text-gray-500">Ajouter</Text>
          </View>
        )}

        {/* Badge d'édition */}
        <View className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 shadow-lg border-2 border-white">
          <Text className="text-white text-xs">✏️</Text>
        </View>
      </Pressable>

      {/* Boutons d'action */}
      <View className="mt-4 w-full px-4">
        <TouchableOpacity
          onPress={showImageOptions}
          disabled={uploading}
          className={`rounded-lg py-3 px-6 ${
            uploading 
              ? 'bg-gray-300' 
              : 'bg-blue-600 active:bg-blue-700'
          }`}
          activeOpacity={0.8}
        >
          {uploading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator size="small" color="white" />
              <Text className="ml-2 text-white font-medium">
                Téléchargement...
              </Text>
            </View>
          ) : (
            <Text className="text-white text-center font-medium">
              Changer la photo
            </Text>
          )}
        </TouchableOpacity>

        {/* Texte d'aide */}
        <Text className="text-xs text-gray-500 text-center mt-2">
          {"Touchez l'image ou le bouton pour modifier"}
        </Text>
      </View>
    </View>
  )
}