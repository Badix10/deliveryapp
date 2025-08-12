import { useAsyncState, useForm, useLocalStorage, useToggle } from '@/hooks'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { supabase } from '../lib/supabase'
import Avatar from './Avatar'

export default function Account({ session }: { session: Session }) {
    const [saving, setSaving] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('')
    const [usernameFocused, toggleUsernameFocus, setUsernameFocused] = useToggle(false)
    const [websiteFocused, toggleWebsiteFocus, setWebsiteFocused] = useToggle(false)

    // Préférences utilisateur persistantes
    const [userPreferences, setUserPreferences] = useLocalStorage('user_preferences', {
        theme: 'light',
        language: 'fr',
        notifications: true,
        autoSave: true
    })

    // Formulaire pour username et website avec useForm
    const profileForm = useForm({
        initialValues: {
            username: '',
            website: ''
        },
        validate: (values) => {
            const errors: any = {}
            if (values.username && values.username.length < 2) {
                errors.username = 'Le nom d\'utilisateur doit contenir au moins 2 caractères'
            }
            if (values.website && !values.website.startsWith('http')) {
                errors.website = 'Le site web doit commencer par http:// ou https://'
            }
            return errors
        },
        onSubmit: async (values) => {
            await updateProfile({
                username: values.username,
                website: values.website,
                avatar_url: avatarUrl
            })
        }
    })

    // Fonction pour charger le profil
    const fetchProfile = async () => {
        if (!session?.user) throw new Error('No user on the session!')

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', session?.user.id)
            .single()

        if (error && status !== 406) {
            throw error
        }

        return data
    }

    // Utiliser useAsyncState pour gérer le chargement
    const { data: profileData, loading, error, execute: loadProfile } = useAsyncState(fetchProfile)

    // Mettre à jour les states locaux quand les données changent
    useEffect(() => {
        if (profileData) {
            profileForm.setFieldValue('username', profileData.username || '')
            profileForm.setFieldValue('website', profileData.website || '')
            setAvatarUrl(profileData.avatar_url || '')
        }
    }, [profileData])

    // Charger le profil quand la session change
    useEffect(() => {
        if (session) {
            loadProfile()
        }
    }, [session])

    // Afficher les erreurs
    useEffect(() => {
        if (error) {
            Alert.alert('Erreur', error)
        }
    }, [error])

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string
        website: string
        avatar_url: string
    }) {
        try {
            setSaving(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }

            Alert.alert('Succès', 'Profil mis à jour avec succès!')
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Erreur', error.message)
            }
        } finally {
            setSaving(false)
        }
    }

    async function handleSignOut() {
        Alert.alert(
            'Déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Déconnexion',
                    onPress: async () => {
                        await supabase.auth.signOut()
                    },
                    style: 'destructive'
                }
            ]
        )
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="mt-4 text-gray-600">Chargement du profil...</Text>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                className="flex-1"
            >
                <View className="flex-1 px-6 py-8">
                    <View>
                        <Avatar
                            size={200}
                            url={avatarUrl}
                            onUpload={(url: string) => {
                                setAvatarUrl(url)
                                updateProfile({ username, website, avatar_url: url })
                            }}
                        />
                    </View>

                    {/* Header du profil */}
                    <View className="items-center mb-8">
                        {/* Avatar placeholder */}
                        <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-4">
                            <Text className="text-3xl">👤</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-900">Mon Profil</Text>
                        <Text className="text-sm text-gray-500 mt-1">Gérez vos informations personnelles</Text>
                    </View>

                    {/* Section informations */}
                    <View className="bg-gray-50 rounded-2xl p-4 mb-6">
                        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Informations du compte
                        </Text>

                        {/* Champ Email (non éditable) */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Email
                            </Text>
                            <View className="flex-row items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-100">
                                <Text className="mr-3 text-gray-500">📧</Text>
                                <Text className="flex-1 text-base text-gray-600">
                                    {session?.user?.email || 'Non défini'}
                                </Text>
                                <View className="bg-green-100 px-2 py-1 rounded">
                                    <Text className="text-xs text-green-700">Vérifié</Text>
                                </View>
                            </View>
                        </View>

                        {/* Champ Username */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                {"Nom d'utilisateur"}
                            </Text>
                            <View className={`flex-row items-center border rounded-lg px-4 py-3 ${usernameFocused ? 'border-blue-500 bg-white' : 'border-gray-200 bg-white'
                                }`}>
                                <Text className="mr-3 text-gray-500">👤</Text>
                                <TextInput
                                    className="flex-1 text-base text-gray-900"
                                    placeholder="Entrez votre nom d'utilisateur"
                                    placeholderTextColor="#9CA3AF"
                                    value={profileForm.values.username}
                                    onChangeText={(value) => profileForm.setFieldValue('username', value)}
                                    autoCapitalize="none"
                                    onFocus={() => setUsernameFocused(true)}
                                    onBlur={() => setUsernameFocused(false)}
                                    editable={!saving}
                                />
                            </View>
                        </View>

                        {/* Champ Website */}
                        <View className="mb-2">
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Site web
                            </Text>
                            <View className={`flex-row items-center border rounded-lg px-4 py-3 ${websiteFocused ? 'border-blue-500 bg-white' : 'border-gray-200 bg-white'
                                }`}>
                                <Text className="mr-3 text-gray-500">🌐</Text>
                                <TextInput
                                    className="flex-1 text-base text-gray-900"
                                    placeholder="https://votresite.com"
                                    placeholderTextColor="#9CA3AF"
                                    value={profileForm.values.website}
                                    onChangeText={(value) => profileForm.setFieldValue('website', value)}
                                    autoCapitalize="none"
                                    keyboardType="url"
                                    autoComplete="url"
                                    onFocus={() => setWebsiteFocused(true)}
                                    onBlur={() => setWebsiteFocused(false)}
                                    editable={!saving}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Boutons d'action */}
                    <View className="space-y-3">
                        {/* Bouton Mettre à jour */}
                        <TouchableOpacity
                            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
                            disabled={saving}
                            className={`rounded-lg py-4 mb-3 ${saving ? 'bg-blue-300' : 'bg-blue-600 active:bg-blue-700'
                                }`}
                            activeOpacity={0.8}
                        >
                            {saving ? (
                                <View className="flex-row justify-center items-center">
                                    <ActivityIndicator color="white" size="small" />
                                    <Text className="ml-2 text-white font-semibold text-base">
                                        Enregistrement...
                                    </Text>
                                </View>
                            ) : (
                                <Text className="text-center text-white font-semibold text-base">
                                    Mettre à jour le profil
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Séparateur */}
                        <View className="flex-row items-center my-4">
                            <View className="flex-1 h-px bg-gray-300" />
                        </View>

                        {/* Bouton Déconnexion */}
                        <TouchableOpacity
                            onPress={handleSignOut}
                            className="rounded-lg py-4 border border-red-500 bg-white active:bg-red-50"
                            activeOpacity={0.8}
                        >
                            <Text className="text-center text-red-600 font-semibold text-base">
                                Se déconnecter
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Informations supplémentaires */}
                    <View className="mt-8 p-4 bg-blue-50 rounded-lg">
                        <Text className="text-sm text-blue-900 font-medium mb-1">
                            💡 Astuce
                        </Text>
                        <Text className="text-xs text-blue-700">
                            Gardez vos informations à jour pour une meilleure expérience de livraison
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}