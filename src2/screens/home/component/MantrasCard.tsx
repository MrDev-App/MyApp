//

// import React, { useRef, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Dimensions,
// } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   interpolate,
//   Extrapolation,
//   Easing,
// } from 'react-native-reanimated';
// import { useTranslation } from 'react-i18next';
// import colors from '../../../utile/colors';
// import fonts from '../../../utile/fonts';
// import { fs, scale } from '../../../utile/sizes';
// import { Translation } from '../../../i18n/language';
// import { godData } from '../../../constants/godData';
// import { runOnJS } from 'react-native-worklets';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// const MantrasCard = () => {
//   const { t, i18n } = useTranslation();
//   const currentLanguage = i18n.language || 'en';

//   const [selectedGod, setSelectedGod] = useState<any>(null);
//   const [origin, setOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
//   const [modalVisible, setModalVisible] = useState(false);
//   const progress = useSharedValue(0);
//   const avatarRefs = useRef<Record<string, any>>({});

//   const pairedGods = React.useMemo(() => {
//     const pairs = [];
//     for (let i = 0; i < godData.length; i += 2) {
//       pairs.push([godData[i], godData[i + 1]].filter(Boolean));
//     }
//     return pairs;
//   }, []);

//   const handleOpen = (god: any, godId: string) => {
//     const avatarRef = avatarRefs.current[godId];
//     avatarRef?.measureInWindow(
//       (x: number, y: number, width: number, height: number) => {
//         setOrigin({ x, y, width, height });
//         setSelectedGod(god);
//         setModalVisible(true);
//         progress.value = withTiming(1, {
//           duration: 400,
//           easing: Easing.out(Easing.cubic),
//         });
//       },
//     );
//   };

//   const handleClose = () => {
//     progress.value = withTiming(
//       0,
//       { duration: 350, easing: Easing.in(Easing.cubic) },
//       finished => {
//         if (finished) {
//           runOnJS(setModalVisible)(false);
//           runOnJS(setSelectedGod)(null);
//         }
//       },
//     );
//   };

//   const scale20 = scale(20);
//   const scale40 = scale(40);

//   const imageAnimatedStyle = useAnimatedStyle(() => {
//     const top = interpolate(progress.value, [0, 1], [origin.y, 60]);
//     const left = interpolate(progress.value, [0, 1], [origin.x, scale20]);
//     const width = interpolate(
//       progress.value,
//       [0, 1],
//       [origin.width, SCREEN_WIDTH - scale40],
//     );
//     const height = interpolate(progress.value, [0, 1], [origin.height, 280]);
//     const borderRadius = interpolate(
//       progress.value,
//       [0, 1],
//       [origin.width / 2, scale20],
//     );

//     return { top, left, width, height, borderRadius };
//   });

//   const contentAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: interpolate(progress.value, [0.6, 1], [0, 1], Extrapolation.CLAMP),
//   }));

//   const backdropAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: interpolate(progress.value, [0, 1], [0, 0.6]),
//   }));

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{t(Translation.MANTRAS_BY_DEITIES)}</Text>

//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         data={pairedGods}
//         keyExtractor={(_, index) => String(index)}
//         contentContainerStyle={styles.listContent}
//         renderItem={({ item }) => (
//           <View style={styles.column}>
//             {item.map(god => {
//               const name =
//                 currentLanguage === 'hi' ? god.hindiName : god.englishName;
//               return (
//                 <TouchableOpacity
//                   key={god.id}
//                   style={styles.godContainer}
//                   activeOpacity={0.7}
//                   onPress={() => handleOpen(god, god.id)}
//                 >
//                   <View
//                     ref={el => {
//                       avatarRefs.current[god.id] = el;
//                     }}
//                     collapsable={false}
//                     style={styles.avatarContainer}
//                   >
//                     <Image source={god.image} style={styles.avatarImage} />
//                   </View>
//                   <Text
//                     style={styles.godName}
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                   >
//                     {name}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         )}
//       />

//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <View style={styles.modalRoot}>
//           <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />

//           {selectedGod && (
//             <Animated.Image
//               source={selectedGod.image}
//               style={[styles.expandedImage, imageAnimatedStyle]}
//             />
//           )}

//           {selectedGod && (
//             <Animated.View
//               style={[styles.expandedContent, contentAnimatedStyle]}
//             >
//               <Text style={styles.expandedName}>
//                 {currentLanguage === 'hi'
//                   ? selectedGod.hindiName
//                   : selectedGod.englishName}
//               </Text>
//               <Text style={styles.expandedDescription}>
//                 {selectedGod.description || ''}
//               </Text>
//               <TouchableOpacity style={styles.backButton} onPress={handleClose}>
//                 <Text style={styles.backButtonText}>{t('BACK') || 'Back'}</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           )}
//         </View>
//       </Modal>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     marginVertical: scale(16),
//   },
//   title: {
//     fontSize: fs(16),
//     fontFamily: fonts.Marcellus,
//     color: colors.secondary,
//     marginBottom: scale(14),
//     paddingHorizontal: scale(4),
//   },
//   listContent: {
//     paddingHorizontal: scale(4),
//   },
//   column: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     marginRight: scale(10),
//   },
//   godContainer: {
//     alignItems: 'center',
//     width: scale(100),
//     borderRadius: scale(4),
//     marginBottom: scale(15),
//   },
//   avatarContainer: {
//     width: scale(85),
//     height: scale(85),
//     borderRadius: scale(50),
//     overflow: 'hidden',
//     backgroundColor: colors.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   avatarImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   godName: {
//     fontSize: fs(10.5),
//     fontFamily: fonts.PoppinsMedium,
//     color: colors.secondary,
//     marginTop: scale(4),
//     textAlign: 'center',
//     width: '100%',
//   },
//   // --- Modal / expanded states ---
//   modalRoot: {
//     flex: 1,
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFill,
//     backgroundColor: colors.black,
//   },
//   expandedImage: {
//     position: 'absolute',
//     resizeMode: 'cover',
//     backgroundColor: colors.white,
//   },
//   expandedContent: {
//     position: 'absolute',
//     top: 360,
//     left: scale(20),
//     right: scale(20),
//   },
//   expandedName: {
//     fontSize: fs(22),
//     fontFamily: fonts.Marcellus,
//     color: colors.white,
//     marginBottom: scale(10),
//   },
//   expandedDescription: {
//     fontSize: fs(13),
//     fontFamily: fonts.PoppinsRegular,
//     color: colors.white,
//     lineHeight: fs(20),
//     marginBottom: scale(20),
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: scale(20),
//     paddingVertical: scale(10),
//     borderRadius: scale(20),
//     backgroundColor: colors.ring,
//   },
//   backButtonText: {
//     color: colors.white,
//     fontFamily: fonts.PoppinsMedium,
//     fontSize: fs(13),
//   },
// });

// export default MantrasCard;

import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';
import { godData } from '../../../constants/godData';
import ExpandableCard, {
  ExpandableCardHandle,
} from '../../../components/ExpandableCard';
import { useExpandTrigger } from '../../../hook/useExpandTrigger';

const MantrasCard = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const cardRef = useRef<ExpandableCardHandle>(null);
  const { registerRef, trigger } = useExpandTrigger(cardRef);

  const pairedGods = React.useMemo(() => {
    const pairs = [];
    for (let i = 0; i < godData.length; i += 2) {
      pairs.push([godData[i], godData[i + 1]].filter(Boolean));
    }
    return pairs;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(Translation.MANTRAS_BY_DEITIES)}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={pairedGods}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.map(god => {
              const name =
                currentLanguage === 'hi' ? god.hindiName : god.englishName;
              return (
                <TouchableOpacity
                  key={god.id}
                  style={styles.godContainer}
                  activeOpacity={0.7}
                  onPress={() => trigger(god.id, god)}
                >
                  <View
                    ref={registerRef(god.id)}
                    collapsable={false}
                    style={styles.avatarContainer}
                  >
                    <Image source={god.image} style={styles.avatarImage} />
                  </View>
                  <Text
                    style={styles.godName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />

      <ExpandableCard
        ref={cardRef}
        imageMargin={scale(16)}
        getImage={(god: any) => god.image}
        renderContent={(god: any, close) => (
          <>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.expandedName}>
                {currentLanguage === 'hi' ? god.hindiName : god.englishName}
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
            >
              {god.mantras && god.mantras.length > 0 ? (
                god.mantras.map((m: any, index: number) => (
                  <View key={index} style={styles.mantraItemCard}>
                    <Text style={styles.mantraName}>{m.name}</Text>
                    <Text style={styles.mantraTextHi}>{m.mantraHi}</Text>
                    {m.mantraEn && (
                      <Text style={styles.mantraTextEn}>{m.mantraEn}</Text>
                    )}
                  </View>
                ))
              ) : (
                <View style={styles.mantraItemCard}>
                  <Text style={styles.mantraName}>Mantra</Text>
                  <Text style={styles.mantraTextHi}>{god.mantraHi}</Text>
                  {god.mantraEn && (
                    <Text style={styles.mantraTextEn}>{god.mantraEn}</Text>
                  )}
                </View>
              )}
            </ScrollView>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: scale(16) },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(14),
    paddingHorizontal: scale(4),
  },
  listContent: { paddingHorizontal: scale(4) },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: scale(10),
  },
  godContainer: {
    alignItems: 'center',
    width: scale(100),
    borderRadius: scale(4),
    marginBottom: scale(15),
  },
  avatarContainer: {
    width: scale(85),
    height: scale(85),
    borderRadius: scale(50),
    overflow: 'hidden',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  godName: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    marginTop: scale(4),
    textAlign: 'center',
    width: '100%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(15),
  },
  topLeftBackButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(251, 148, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  topLeftBackButtonText: {
    color: colors.ring,
    fontSize: fs(20),
    lineHeight: fs(22),
  },
  expandedName: {
    fontSize: fs(22),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },

  modalContent: {
    flex: 1,
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {},
  mantraItemCard: {
    backgroundColor: 'rgba(252, 224, 180, 0.2)',
    borderRadius: scale(16),
    padding: scale(14),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.15)',
  },
  mantraName: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginBottom: scale(6),
  },
  mantraTextHi: {
    fontSize: fs(15),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(22),
  },
  mantraTextEn: {
    fontSize: fs(12.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    marginTop: scale(4),
    fontStyle: 'italic',
  },
});

export default MantrasCard;
