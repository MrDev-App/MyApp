import { StyleSheet } from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  BOOK_WIDTH,
  BOOK_HEIGHT,
  GOLD_ACCENT,
  GOLD_BORDER,
} from './FlipBookCover.constants';

export const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    marginVertical: scale(8),
    flex: 1,
    justifyContent: 'center',
  },
  bookWrapper: {
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    position: 'relative',
    borderRadius: scale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  // Simulated stacked paper thickness under the book
  paperPageLayer1: {
    position: 'absolute',
    top: scale(4),
    left: scale(4),
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1,
    zIndex: 1,
  },
  paperPageLayer2: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1,
    zIndex: 0,
  },

  // BASE RIGHT INSIDE PAGE
  insidePageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1.5,
    padding: scale(10),
    paddingLeft: scale(14),
    zIndex: 2,
    overflow: 'hidden',
  },
  ornateBorder: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(10),
    justifyContent: 'space-between',
    position: 'relative',
  },
  cornerFlourish: {
    position: 'absolute',
    fontSize: fs(11),
    color: GOLD_ACCENT,
    fontWeight: 'bold',
  },
  flourishTL: { top: scale(3), left: scale(4) },
  flourishTR: { top: scale(3), right: scale(4) },
  flourishBL: { bottom: scale(3), left: scale(4) },
  flourishBR: { bottom: scale(3), right: scale(4) },

  insideHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(6),
    paddingHorizontal: scale(4),
  },
  pageSourceBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(2.5),
    borderRadius: scale(6),
  },
  pageSourceText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(9),
  },

  pageScrollView: {
    flex: 1,
    marginVertical: scale(2),
  },
  pageScrollContent: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(2),
  },
  pageImagesContainer: {
    width: '100%',
    gap: scale(8),
    marginBottom: scale(8),
  },
  pageImageCard: {
    width: '100%',
    height: scale(160),
    borderRadius: scale(8),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: GOLD_BORDER,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    marginVertical: scale(4),
  },
  pageImage: {
    width: '100%',
    height: '100%',
  },

  shlokaBox: {
    marginVertical: scale(6),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
  },
  shlokaHeaderPill: {
    alignItems: 'center',
    marginBottom: scale(4),
  },
  shlokaTagText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(9),
    letterSpacing: 1,
  },
  shlokaVerseText: {
    fontFamily: fonts.Marcellus,
    lineHeight: fs(19),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  shlokaDivider: {
    borderTopWidth: 0.8,
    marginTop: scale(6),
    paddingTop: scale(4),
  },
  shlokaMeaningText: {
    fontFamily: fonts.PoppinsRegular,
    lineHeight: fs(15),
    textAlign: 'center',
  },

  narrativeParagraph: {
    fontFamily: fonts.PoppinsRegular,
    marginBottom: scale(10),
    letterSpacing: 0.2,
    textAlign: 'justify',
  },

  moralCard: {
    marginVertical: scale(8),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
  },
  moralCardHeader: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(10),
    marginBottom: scale(3),
    textAlign: 'center',
  },
  moralCardText: {
    fontFamily: fonts.PoppinsMedium,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  insideFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(4),
    paddingHorizontal: scale(4),
  },
  footerCategoryText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(8.5),
  },

  // THE TURNING LEAF
  turningLeaf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
  },
  coverFaceFront: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(14),
    overflow: 'hidden',
    borderColor: '#1E1E1E',
    borderLeftWidth: 6,
  },
  coverFaceContainer: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    padding: scale(14),
    paddingLeft: scale(20),
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryGlassBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderColor: 'rgba(255, 215, 0, 0.5)',
    borderWidth: 1,
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(8),
  },
  categoryGlassBadgeText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(9.5),
    color: '#FFD700',
  },

  coverBottomInfo: {
    marginBottom: scale(4),
  },
  coverTitleText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(18),
    color: '#FFF',
    lineHeight: fs(24),
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 4,
  },
  coverSubtitleText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(11),
    color: '#E0E0E0',
    marginTop: scale(2),
    marginBottom: scale(10),
  },
  openBookPromptBadge: {
    backgroundColor: colors.ring,
    alignSelf: 'flex-start',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  openBookPromptText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(10.5),
    color: '#FFF',
  },

  ribbonBookmark: {
    position: 'absolute',
    top: -scale(6),
    right: scale(32),
    width: scale(14),
    height: scale(28),
    backgroundColor: colors.ring,
    zIndex: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  ribbonTail: {
    position: 'absolute',
    bottom: -scale(4),
    left: 0,
    right: 0,
    borderLeftWidth: scale(7),
    borderRightWidth: scale(7),
    borderBottomWidth: scale(4),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  curlShadowOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
  },

  // BACK FACE
  coverFaceBackWrap: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(14),
    overflow: 'hidden',
  },
  coverFaceBack: {
    flex: 1,
    borderRadius: scale(14),
    padding: scale(14),
    paddingRight: scale(18),
    transform: [{ scaleX: -1 }],
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    justifyContent: 'center',
  },
  backFaceInnerBorder: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backFaceOm: {
    fontSize: fs(24),
    color: GOLD_ACCENT,
    fontFamily: fonts.Marcellus,
  },
  backFaceMantra: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(9.5),
    letterSpacing: 0.8,
    marginTop: scale(3),
    textAlign: 'center',
  },
  backFaceDivider: {
    width: scale(70),
    height: 1,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.4,
    marginVertical: scale(8),
  },
  backFaceDedicationTitle: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(12),
    textAlign: 'center',
  },
  backFaceDedicationBody: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(9.5),
    lineHeight: fs(14),
    textAlign: 'center',
    marginTop: scale(3),
  },
  backFaceSourceNote: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(8.5),
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // Bottom Nav Bar
  bottomNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: BOOK_WIDTH,
    marginTop: scale(40),
    paddingHorizontal: scale(4),
  },
  navPageBtn: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(38),
    minHeight: scale(30),
    backgroundColor: colors.ring,
  },
  forwardIconWrap: {
    transform: [{ scaleX: -1 }],
  },
  navBtnDisabled: {
    opacity: 0.35,
  },
  navBtnText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(11),
  },
  pageDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  pageDot: {
    paddingHorizontal: scale(7),
    paddingVertical: scale(3),
    borderRadius: scale(6),
  },
  pageDotActive: {
    borderRadius: scale(6),
  },
  dotLabel: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(9),
  },

  // Loading Status Pill Overlay
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 10,
    gap: scale(8),
  },
  loadingSpinner: {
    marginRight: scale(2),
  },
  loadingText: {
    color: '#FFF',
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(11),
  },
});
