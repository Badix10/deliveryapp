import type { CartItem, Product, Restaurant } from '@/database.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartStore {
  restaurant: Restaurant | null;
  items: CartItem[];
  // Computed values
  itemsCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  // Actions
  addItem: (product: Product, restaurant: Restaurant, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  updateSpecialInstructions: (productId: string, instructions: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      restaurant: null,
      items: [],
      itemsCount: 0,
      subtotal: 0,
      deliveryFee: 0,
      total: 0,
      
      addItem: (product, restaurant, quantity = 1) => {
        const state = get();
        
        // Si c'est un restaurant différent, vider le panier
        if (state.restaurant && state.restaurant.id !== restaurant.id) {
          set({
            restaurant,
            items: [{
              product,
              quantity,
            }],
          });
        } else {
          // Vérifier si le produit existe déjà
          const existingItem = state.items.find(
            item => item.product.id === product.id
          );
          
          if (existingItem) {
            // Augmenter la quantité
            set((state) => ({
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }));
          } else {
            // Ajouter le nouveau produit
            set((state) => ({
              restaurant: restaurant,
              items: [...state.items, { product, quantity }],
            }));
          }
        }
        
        // Recalculer les totaux
        const newState = get();
        const subtotal = newState.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const deliveryFee = restaurant.delivery_fee;
        
        set({
          itemsCount: newState.items.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
          deliveryFee,
          total: subtotal + deliveryFee,
        });
      },
      
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(
            item => item.product.id !== productId
          );
          
          if (newItems.length === 0) {
            return {
              restaurant: null,
              items: [],
              itemsCount: 0,
              subtotal: 0,
              deliveryFee: 0,
              total: 0,
            };
          }
          
          const subtotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const itemsCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          
          return {
            items: newItems,
            itemsCount,
            subtotal,
            total: subtotal + state.deliveryFee,
          };
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => {
          const newItems = state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          );
          
          const subtotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const itemsCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          
          return {
            items: newItems,
            itemsCount,
            subtotal,
            total: subtotal + state.deliveryFee,
          };
        });
      },
      
      updateSpecialInstructions: (productId, instructions) => {
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, special_instructions: instructions }
              : item
          ),
        }));
      },
      
      clearCart: () =>
        set({
          restaurant: null,
          items: [],
          itemsCount: 0,
          subtotal: 0,
          deliveryFee: 0,
          total: 0,
        }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
