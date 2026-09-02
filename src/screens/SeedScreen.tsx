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
  getDocs,
  Timestamp,
} from '@react-native-firebase/firestore';
import { ekadashi2026Data } from '../constants/ekadashiData';

export default function SeedScreen() {
  const [status, setStatus] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const log = (msg: string) => setStatus(prev => [...prev, msg]);

  async function seedEkadashi() {
    setLoading(true);
    setStatus([]);
    try {
      log(
        '⏳ Cleaning & seeding 12 Monthly Ekadashi documents to Firestore...',
      );
      const db = getFirestore();

      // 1. Fetch all existing documents in collection to delete old/flat/year docs
      const existingSnapshot = await getDocs(
        collection(db, ekadashi2026Data.collection),
      );
      const validMonthDocIds = new Set(
        ekadashi2026Data.months.map(m => `month_${m.month}`),
      );

      const batch = writeBatch(db);

      // Delete any doc that is not month_1 ... month_12
      existingSnapshot.docs.forEach((docSnap: any) => {
        if (!validMonthDocIds.has(docSnap.id)) {
          batch.delete(docSnap.ref);
        }
      });

      // 2. Set exactly 12 month documents
      for (const monthData of ekadashi2026Data.months) {
        const docId = `month_${monthData.month}`;
        const docRef = doc(db, ekadashi2026Data.collection, docId);
        const monthDocData = {
          month: monthData.month,
          monthName: monthData.monthName,
          year: ekadashi2026Data.year,
          ekadashis: monthData.ekadashis.map(e => ({
            date: e.date,
            day: e.day,
            dayOfWeek: e.dayOfWeek,
            paksha: e.paksha,
            name: e.name,
          })),
          updatedAt: Timestamp.now(),
        };
        batch.set(docRef, monthDocData, { merge: true });
      }

      await batch.commit();
      log(
        `✅ Successfully saved exactly 12 monthly documents (month_1 to month_12) in '${ekadashi2026Data.collection}'!`,
      );
    } catch (error: any) {
      log(`❌ Error seeding Ekadashi: ${error?.message || error}`);
      console.error('Error seeding ekadashi:', error);
    } finally {
      setLoading(false);
    }
  }

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
    await seedEkadashi();
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

      {/* Button: Seed Ekadashi 2026 */}
      <TouchableOpacity
        onPress={seedEkadashi}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#009688',
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
            Seed Ekadashi (2026)
          </Text>
        )}
      </TouchableOpacity>

      {/* Button: Fetch & Console Ekadashi */}
      <TouchableOpacity
        onPress={async () => {
          setLoading(true);
          setStatus([]);
          try {
            log('🔍 Fetching Ekadashi data from Firestore...');
            const {
              getEkadashiMonthsData,
              clearEkadashiDataCache,
            } = require('../utile/ekadashiDataCache');
            clearEkadashiDataCache();
            const data = await getEkadashiMonthsData();
            log(
              `📄 Fetched ${data.length} months from Firestore! Check console for full JSON.`,
            );
            data.forEach((m: any) => {
              log(
                `📅 ${m.monthName}: ${m.ekadashis
                  .map((e: any) => `${e.name} (${e.date})`)
                  .join(', ')}`,
              );
            });
          } catch (error: any) {
            log(`❌ Error: ${error?.message || error}`);
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#673AB7',
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
            🔍 Fetch & Console Log Ekadashi Data
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
            Seed All (Jap + Gods + Categories + Festivals + Ekadashi)
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
