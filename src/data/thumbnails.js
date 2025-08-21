// Map of thumbnail filenames to public paths
export const thumbnailMap = {
  'CoinbaseThumbnail.webp': '/Thumbs/CoinbaseThumbnail.webp',
  'Loopsthumb.webp': '/Thumbs/Loopsthumb.webp',
  'kwthmb.webp': '/Thumbs/kwthmb.webp',
  'JheneThmb.webp': '/Thumbs/JheneThmb.webp',
  'Ozonethmb1.webp': '/Thumbs/Ozonethmb1.webp',
  'ososthmb.webp': '/Thumbs/ososthmb.webp',
  'cfathmb.webp': '/Thumbs/cfathmb.webp',
  's&tthmb.webp': '/Thumbs/s&tthmb.webp',
  'Pubthmb.webp': '/Thumbs/Pubthmb.webp',
  'crunchyrollthmb.webp': '/Thumbs/crunchyrollthmb.webp',
  'growThmb.webp': '/Thumbs/growThmb.webp',
  'gameplanthmb.webp': '/Thumbs/gameplanthmb.webp'
}

// Helper function to get thumbnail with fallback
export const getThumbnail = (filename) => {
  return thumbnailMap[filename] || '/Thumbs/CoinbaseThumbnail.webp' // Default fallback
}