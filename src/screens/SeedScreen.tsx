// // screens/SeedScreen.tsx (TEMPORARY — kaam hone ke baad delete kar dena)
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
// } from 'react-native';
// import { uploadNaamJapDataToFirestore } from '@services/firebaseServices/seedNaamJapService';
// import { uploadCalendar2026ToFirestore } from '@services/seedFestivalService';
// import colors from '@theme/colors';

// export default function SeedScreen() {
//   const [status, setStatus] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const log = (msg: string) => setStatus(prev => [...prev, msg]);

//   async function seedFestivals() {
//     setLoading(true);
//     setStatus([]);
//     try {
//       await uploadCalendar2026ToFirestore({
//         onProgress: log,
//       });
//     } catch (error: any) {
//       log(`❌ Error seeding festivals: ${error?.message || error}`);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function seedCategories() {
//     setLoading(true);
//     setStatus([]);
//     try {
//       log('ℹ️ Categories collection is already seeded in Firestore.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function seedGods() {
//     setLoading(true);
//     setStatus([]);
//     try {
//       await uploadNaamJapDataToFirestore({
//         onProgress: log,
//       });
//     } catch (error: any) {
//       log(`❌ Error seeding naamJapData: ${error?.message || error}`);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function seedJapMantras() {
//     setLoading(true);
//     setStatus([]);
//     try {
//       log('ℹ️ JapMantras collection is already seeded in Firestore.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function seedAll() {
//     await seedCategories();
//     await seedGods();
//     await seedJapMantras();
//     await seedFestivals();
//   }

//   return (
//     <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
//         🌱 Firestore Seed Tool
//       </Text>

//       {/* Button: Seed JapMantras */}
//       <TouchableOpacity
//         onPress={seedJapMantras}
//         disabled={loading}
//         style={{
//           backgroundColor: loading ? colors.switchTrackFalse : colors.chart5,
//           padding: 14,
//           borderRadius: 10,
//           alignItems: 'center',
//           marginBottom: 12,
//         }}
//       >
//         {loading ? (
//           <ActivityIndicator color={colors.white} />
//         ) : (
//           <Text style={{ color: colors.white, fontWeight: 'bold' }}>
//             Seed Jap Mantras Collection
//           </Text>
//         )}
//       </TouchableOpacity>

//       {/* Button: Seed GodMantras */}
//       <TouchableOpacity
//         onPress={seedGods}
//         disabled={loading}
//         style={{
//           backgroundColor: loading ? colors.switchTrackFalse : colors.chart4,
//           padding: 14,
//           borderRadius: 10,
//           alignItems: 'center',
//           marginBottom: 12,
//         }}
//       >
//         {loading ? (
//           <ActivityIndicator color={colors.white} />
//         ) : (
//           <Text style={{ color: colors.white, fontWeight: 'bold' }}>
//             Seed naamJapData (godData) Collection
//           </Text>
//         )}
//       </TouchableOpacity>

//       {/* Button: Seed Categories */}
//       <TouchableOpacity
//         onPress={seedCategories}
//         disabled={loading}
//         style={{
//           backgroundColor: loading ? colors.switchTrackFalse : colors.success,
//           padding: 14,
//           borderRadius: 10,
//           alignItems: 'center',
//           marginBottom: 12,
//         }}
//       >
//         {loading ? (
//           <ActivityIndicator color={colors.white} />
//         ) : (
//           <Text style={{ color: colors.white, fontWeight: 'bold' }}>
//             Seed Categories Collection
//           </Text>
//         )}
//       </TouchableOpacity>

//       {/* Button: Seed Festivals */}
//       <TouchableOpacity
//         onPress={seedFestivals}
//         disabled={loading}
//         style={{
//           backgroundColor: loading ? colors.switchTrackFalse : colors.ring,
//           padding: 14,
//           borderRadius: 10,
//           alignItems: 'center',
//           marginBottom: 12,
//         }}
//       >
//         {loading ? (
//           <ActivityIndicator color={colors.white} />
//         ) : (
//           <Text style={{ color: colors.white, fontWeight: 'bold' }}>
//             Seed Festivals (2026)
//           </Text>
//         )}
//       </TouchableOpacity>

//       {/* Button: Seed All */}
//       <TouchableOpacity
//         onPress={seedAll}
//         disabled={loading}
//         style={{
//           backgroundColor: loading ? colors.switchTrackFalse : colors.chart1,
//           padding: 14,
//           borderRadius: 10,
//           alignItems: 'center',
//           marginBottom: 20,
//         }}
//       >
//         {loading ? (
//           <ActivityIndicator color={colors.white} />
//         ) : (
//           <Text style={{ color: colors.white, fontWeight: 'bold' }}>
//             Seed All (Jap + Gods + Categories + Festivals)
//           </Text>
//         )}
//       </TouchableOpacity>

//       <ScrollView style={{ flex: 1 }}>
//         {status.map((msg, i) => (
//           <Text key={i} style={{ fontSize: 12, marginBottom: 4 }}>
//             {msg}
//           </Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }
