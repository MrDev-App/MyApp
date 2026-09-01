// screens/SeedScreen.tsx (TEMPORARY — kaam hone ke baad delete kar dena)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  getFirestore,
  writeBatch,
  doc,
  collection,
  Timestamp,
} from '@react-native-firebase/firestore';
const YEARS_TO_SEED = [2026];

export default function SeedScreen() {
  const [status, setStatus] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const log = (msg: string) => setStatus(prev => [...prev, msg]);

  async function seedFestivals() {
    setLoading(true);
    setStatus([]);
    try {
      log('ℹ️ Festivals collection is already seeded in Firestore.');
    } finally {
      setLoading(false);
    }
  }

  async function seedCategories() {
    setLoading(true);
    setStatus([]);
    try {
      log('ℹ️ Categories collection is already seeded in Firestore.');
    } finally {
      setLoading(false);
    }
  }

  async function seedGods() {
    setLoading(true);
    setStatus([]);
    try {
      log('ℹ️ GodMantras collection is already seeded in Firestore.');
    } finally {
      setLoading(false);
    }
  }

  async function seedJapMantras() {
    setLoading(true);
    setStatus([]);
    try {
      log('ℹ️ JapMantras collection is already seeded in Firestore.');
    } finally {
      setLoading(false);
    }
  }

  async function seedAll() {
    await seedCategories();
    await seedGods();
    await seedJapMantras();
    await seedFestivals();
  }

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        🌱 Firestore Seed Tool
      </Text>

      {/* Button: Seed Jap Mantras */}
      <TouchableOpacity
        onPress={seedJapMantras}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#E91E63',
          padding: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Seed Jap Mantras Collection
          </Text>
        )}
      </TouchableOpacity>

      {/* Button: Seed GodMantras */}
      <TouchableOpacity
        onPress={seedGods}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#9C27B0',
          padding: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Seed GodMantras Collection
          </Text>
        )}
      </TouchableOpacity>

      {/* Button: Seed Categories */}
      <TouchableOpacity
        onPress={seedCategories}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          padding: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Seed Categories Collection
          </Text>
        )}
      </TouchableOpacity>

      {/* Button: Seed Festivals */}
      <TouchableOpacity
        onPress={seedFestivals}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#FB9437',
          padding: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Seed Festivals (2026)
          </Text>
        )}
      </TouchableOpacity>

      {/* Button: Seed All */}
      <TouchableOpacity
        onPress={seedAll}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#2196F3',
          padding: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Seed All (Jap + Gods + Categories + Festivals)
          </Text>
        )}
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {status.map((msg, i) => (
          <Text key={i} style={{ fontSize: 12, marginBottom: 4 }}>
            {msg}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
