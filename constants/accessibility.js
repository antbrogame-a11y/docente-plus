// Accessibility constants for consistent labeling and roles
// Following WCAG 2.1 Level AA guidelines

export const ACCESSIBILITY_LABELS = {
  // Login Screen
  LOGIN_EMAIL_INPUT: 'Campo email per accedere',
  LOGIN_PASSWORD_INPUT: 'Campo password per accedere',
  LOGIN_SUBMIT_BUTTON: 'Accedi alla piattaforma',
  
  // Welcome Screen
  WELCOME_TITLE: 'Schermata di benvenuto',
  WELCOME_TEST_API_BUTTON: 'Ripeti test API DeepSeek',
  WELCOME_PROFILE_BUTTON: 'Vai alla schermata profilo',
  WELCOME_CLASSES_BUTTON: 'Vai alle mie classi',
  WELCOME_MATERIALS_BUTTON: 'Vai ai materiali didattici',
  WELCOME_LOGOUT_BUTTON: 'Esci dalla piattaforma',
  
  // Materials Screen
  MATERIALS_ADD_BUTTON: 'Aggiungi nuovo materiale didattico',
  MATERIALS_TITLE_INPUT: 'Titolo del materiale',
  MATERIALS_DESCRIPTION_INPUT: 'Descrizione del materiale',
  MATERIALS_URL_INPUT: 'URL del link al materiale',
  MATERIALS_TYPE_LINK: 'Seleziona tipo link',
  MATERIALS_TYPE_PDF: 'Seleziona tipo PDF',
  MATERIALS_TYPE_IMAGE: 'Seleziona tipo immagine',
  MATERIALS_TYPE_DOCUMENT: 'Seleziona tipo documento',
  MATERIALS_FILE_PICKER: 'Seleziona file da caricare',
  MATERIALS_DELETE_BUTTON: 'Elimina materiale',
  MATERIALS_OPEN_BUTTON: 'Apri materiale',
  MATERIALS_CANCEL_BUTTON: 'Annulla aggiunta materiale',
  MATERIALS_SUBMIT_BUTTON: 'Conferma aggiunta materiale',
  MATERIALS_CLASS_SELECTOR: 'Seleziona classe per il materiale',
};

export const ACCESSIBILITY_HINTS = {
  // Login Screen
  LOGIN_EMAIL_INPUT: 'Inserisci la tua email per accedere',
  LOGIN_PASSWORD_INPUT: 'Inserisci la tua password per accedere',
  LOGIN_SUBMIT_BUTTON: 'Tocca per accedere alla piattaforma',
  
  // Welcome Screen
  WELCOME_TEST_API_BUTTON: 'Tocca per ripetere il test API DeepSeek',
  WELCOME_PROFILE_BUTTON: 'Tocca per aprire la schermata del tuo profilo',
  WELCOME_CLASSES_BUTTON: 'Tocca per vedere l\'elenco delle tue classi',
  WELCOME_MATERIALS_BUTTON: 'Tocca per gestire i materiali didattici',
  WELCOME_LOGOUT_BUTTON: 'Tocca per uscire dalla piattaforma',
  
  // Materials Screen
  MATERIALS_ADD_BUTTON: 'Tocca per aprire il modulo di aggiunta materiale',
  MATERIALS_DELETE_BUTTON: 'Tocca per eliminare questo materiale',
  MATERIALS_OPEN_BUTTON: 'Tocca per aprire questo materiale',
  MATERIALS_CANCEL_BUTTON: 'Tocca per annullare e tornare alla lista',
  MATERIALS_SUBMIT_BUTTON: 'Tocca per confermare e aggiungere il materiale',
};

export const ACCESSIBILITY_ROLES = {
  HEADER: 'header',
  BUTTON: 'button',
  TEXT_INPUT: 'none', // React Native uses 'none' for TextInput to avoid double announcement
  LINK: 'link',
  IMAGE: 'image',
  ADJUSTABLE: 'adjustable',
};

// WCAG AA minimum contrast ratios
export const CONTRAST_RATIOS = {
  NORMAL_TEXT: 4.5, // 14pt and above
  LARGE_TEXT: 3.0,  // 18pt and above or 14pt bold
};

// Touch target minimum size (WCAG 2.5.5)
export const MINIMUM_TOUCH_TARGET = 44;

// Focus management
export const FOCUS_ORDER = {
  LOGIN_SCREEN: ['email', 'password', 'submit'],
  WELCOME_SCREEN: ['testApi', 'profile', 'classes', 'materials', 'logout'],
  MATERIALS_SCREEN: ['add', 'list'],
};
