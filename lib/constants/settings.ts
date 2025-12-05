import { Theme } from '@/types'

export const ThemeMap = (theme: Theme) => {
  switch (theme) {
    case Theme.LIGHT:
      return 'Light'
    case Theme.SILENT_PEAKS:
      return 'Silent Peaks'
    case Theme.GOLDEN_HOUR:
      return 'Golden Hour'
    case Theme.VINTAGE_PAPER:
      return 'Vintage Paper'
    case Theme.ZEN_MIND:
      return 'Zen Mind'
    case Theme.BALANCE:
      return 'Balance'
    case Theme.LEAF_SCAPE:
      return 'Leaf Scape'
    case Theme.PASTEL_COLLAGE:
      return 'Pastel Collage'
    case Theme.SEA_WHISPER:
      return 'Sea Whisper'
    case Theme.WHITE_LOTUS:
      return 'White Lotus'
    case Theme.PINK_WHISPER:
      return 'Pink Whisper'
    case Theme.PAPER_ROSE:
      return 'Paper Rose'
    case Theme.BLUE_BLOOM:
      return 'Blue Bloom'
    case Theme.SOFT_WAVES:
      return 'Soft Waves'
    case Theme.CALM_MIND:
      return 'Calm Mind'
    case Theme.ORANGE:
      return 'Orange'
    case Theme.BALL:
      return 'Ball'
    case Theme.COMPASS:
      return 'Compass'
    case Theme.OCEAN_DEPTHS:
      return 'Ocean Depths'
    case Theme.NEON_FOCUS:
      return 'Neon Focus'
    case Theme.CIPHERED_NIGHT:
      return 'Ciphered Night'
    case Theme.DREAM_ACHIEVE:
      return 'Dream Achieve'
    case Theme.TIME_TO_LIVE:
      return 'Time To Live'
    case Theme.DARK:
      return 'Dark'
    default:
      return 'Unknown Theme'
  }
}
