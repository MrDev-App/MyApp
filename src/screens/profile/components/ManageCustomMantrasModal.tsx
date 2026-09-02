import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import OverlayModal, {
  OverlayModalHandle,
} from '@components/OverlayModal';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale, verticalScale } from '@theme/sizes';
import imagePath from '@assets/index';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';

interface CustomMantra {
  id: string;
  nameEn: string;
  nameHi: string;
  textEn: string;
  textHi: string;
}

interface ManageCustomMantrasModalProps {
  modalRef: React.RefObject<OverlayModalHandle | null>;
  customMantras: CustomMantra[];
  onDeleteCustomMantra: (id: string, name: string) => void;
  currentLanguage: 'en' | 'hi';
}

const ManageCustomMantrasModal: React.FC<ManageCustomMantrasModalProps> = ({
  modalRef,
  customMantras,
  onDeleteCustomMantra,
  currentLanguage,
}) => {
  const { t } = useTranslation();

  return (
    <OverlayModal ref={modalRef} closeOnBackdropPress={true}>
      <View style={styles.modalCenterContainer}>
        <View
          style={[
            styles.modalCard,
            {
              maxHeight: verticalScale(420),
              paddingBottom: scale(20),
            },
          ]}
        >
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => modalRef.current?.close()}
            activeOpacity={0.7}
          >
            <Text style={styles.modalCloseBtnText}>✕</Text>
          </TouchableOpacity>

          <View
            style={[
              styles.titleRow,
              { justifyContent: 'center', marginBottom: scale(8) },
            ]}
          >
            <Image source={imagePath.mala} style={styles.titleIcon} />
            <Text style={[styles.modalTitle, { marginBottom: 0 }]}>
              {t(Translation.PROFILE_MANAGE_CUSTOM_MANTRAS)}
            </Text>
          </View>

          {customMantras.length === 0 ? (
            <View style={styles.emptyCustomBox}>
              <Text style={styles.emptyCustomText}>
                {t(Translation.PROFILE_NO_CUSTOM_MANTRAS_FOUND)}
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ width: '100%', marginTop: scale(10) }}
              contentContainerStyle={{ paddingBottom: scale(10) }}
            >
              {customMantras.map(mantra => {
                const name =
                  currentLanguage === 'hi' ? mantra.nameHi : mantra.nameEn;
                const text =
                  currentLanguage === 'hi' ? mantra.textHi : mantra.textEn;
                return (
                  <View key={mantra.id} style={styles.customMantraRow}>
                    <View style={styles.customMantraInfo}>
                      <Text style={styles.customMantraName}>{name}</Text>
                      <Text style={styles.customMantraText} numberOfLines={1}>
                        {text}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteMantraBtn}
                      onPress={() => onDeleteCustomMantra(mantra.id, name)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.deleteMantraBtnText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </OverlayModal>
  );
};

const styles = StyleSheet.create({
  modalCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(20),
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(10) },
    shadowOpacity: 0.1,
    shadowRadius: scale(20),
    elevation: 5,
  },
  modalCloseBtn: {
    backgroundColor: colors.ring,
    borderRadius: scale(100),
    position: 'absolute',
    width: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    top: scale(14),
    right: scale(14),
    zIndex: 10,
    padding: scale(4),
  },
  modalCloseBtnText: {
    fontSize: fs(12),
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(14),
  },
  titleIcon: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  emptyCustomBox: {
    paddingVertical: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCustomText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  customMantraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderVerySubtle,
  },
  customMantraInfo: {
    flex: 1,
    paddingRight: scale(12),
  },
  customMantraName: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
  },
  customMantraText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    marginTop: scale(2),
  },
  deleteMantraBtn: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: colors.dangerSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteMantraBtnText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsBold,
    color: colors.danger,
  },
});

export default React.memo(ManageCustomMantrasModal);
