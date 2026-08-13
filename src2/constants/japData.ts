export interface MantraSelectorItem {
  id: string;
  nameEn: string;
  nameHi: string;
  textEn: string;
  textHi: string;
}

export const MANTRAS_LIST: MantraSelectorItem[] = [
  {
    id: 'Radha',
    nameEn: 'Radha Mantra',
    nameHi: 'राधा मंत्र',
    textEn: 'Radha',
    textHi: 'राधा',
  },
  {
    id: 'shiva',
    nameEn: 'Shiva Mantra',
    nameHi: 'शिव मंत्र',
    textEn: 'Om Namah Shivaya',
    textHi: 'ॐ नमः शिवाय',
  },
  {
    id: 'krishna',
    nameEn: 'Krishna Mahamantra',
    nameHi: 'कृष्णा महामंत्र',
    textEn:
      'Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare',
    textHi:
      'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे\nहरे राम हरे राम राम राम हरे हरे',
  },
  {
    id: 'gayatri',
    nameEn: 'Gayatri Mantra',
    nameHi: 'गायत्री मंत्र',
    textEn:
      'Om Bhur Bhuvah Svah Tat Savitur Varenyam\nBhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat',
    textHi:
      'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
  },
  {
    id: 'mrityunjaya',
    nameEn: 'Mrityunjaya Mantra',
    nameHi: 'महामृत्युंजय मंत्र',
    textEn:
      'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam\nUrvarukam-Iva Bandhanan Mrityor-Mukshiya Maamritat',
    textHi:
      'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्',
  },
];
