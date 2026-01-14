export type Settings = {
  aiModel: string
  appBuild: number
  appVersion: string
  conversationLanguage: string
  dateFormat: string
  font: string
  id: number
  lang: string
  locale: string
  model: string
  osBuildId: string
  osVersion: string
  platform: string
  theme: string
  timeFormat: string
  uniqueId: string
}

export enum Theme {
  LIGHT = 'light',
  SILENT_PEAKS = 'silentPeaks',
  GOLDEN_HOUR = 'goldenHour',
  VINTAGE_PAPER = 'vintagePaper',
  ZEN_MIND = 'zenMind',
  BALANCE = 'balance',
  LEAF_SCAPE = 'leafScape',
  PASTEL_COLLAGE = 'pastelCollage',
  SEA_WHISPER = 'seaWhisper',
  WHITE_LOTUS = 'whiteLotus',
  PINK_WHISPER = 'pinkWhisper',
  PAPER_ROSE = 'paperRose',
  BLUE_BLOOM = 'blueBloom',
  SOFT_WAVES = 'softWaves',
  CALM_MIND = 'calmMind',
  ORANGE = 'orange',
  BALL = 'ball',
  COMPASS = 'compass',
  OCEAN_DEPTHS = 'oceanDepths',
  NEON_FOCUS = 'neonFocus',
  CIPHERED_NIGHT = 'cipheredNight',
  DREAM_ACHIEVE = 'dreamAchieve',
  TIME_TO_LIVE = 'timeToLive',
  DARK = 'dark',
}

export enum Font {
  ROBOTO = 'Roboto',
  OPEN_SANS = 'OpenSans',
  SF_PRO_DISPLAY = 'SFProDisplay',
  MONSERRAT = 'Montserrat',
  INTER = 'Inter',
  LATO = 'Lato',
  NUNITO = 'Nunito',
  SOURCE_CODE_PRO = 'SourceCodePro',
  FIRA_SANS = 'FiraSans',
  MANROPE = 'Manrope',
  TINOS = 'Tinos',
  UBUNTU = 'Ubuntu',
  EXO2 = 'Exo2',
  OSWALD = 'Oswald',
  RUBIK = 'Rubik',
}
