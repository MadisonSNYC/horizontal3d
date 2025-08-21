// Interfaces
export interface TileContent {
  type: 'hero' | 'summary' | 'video' | 'image' | 'stats'
  data: any
}

export interface ProjectData {
  id: string
  name: string
  client: string
  year: string
  team: string[]
  overview: string
  awards: string[]
  services: string[]
  tiles: TileContent[]
}

// Projects data
export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'specter-berlin',
    name: 'SPECTER BERLIN',
    client: 'Specter Fashion',
    year: '2024',
    team: ['AZAR STRATO', 'DAN CARR', 'EVGENI BAKIROV'],
    overview: 'A revolutionary fashion platform connecting Berlin\'s underground culture with cutting-edge streetwear design.',
    awards: ['Awwwards Site of the Day', 'FWA Site of the Month'],
    services: ['BRANDING', 'WEB DESIGN', 'MOTION', 'STRATEGY'],
    tiles: [
      {
        type: 'hero',
        data: {
          title: 'SPECTER BERLIN',
          subtitle: 'Revolutionary Fashion Platform',
          image: 'https://picsum.photos/1920/1080?random=1'
        }
      },
      {
        type: 'summary',
        data: {
          title: 'Project Overview',
          description: 'Fashion meets technology in Berlin\'s underground scene',
          tags: ['BRANDING', 'DIGITAL', 'MOTION']
        }
      },
      {
        type: 'video',
        data: {
          title: 'Brand Film',
          poster: 'https://picsum.photos/1920/1080?random=2'
        }
      },
      {
        type: 'image',
        data: {
          url: 'https://picsum.photos/1920/1080?random=3',
          caption: 'Campaign Photography'
        }
      },
      {
        type: 'stats',
        data: {
          title: 'Impact Metrics',
          stats: [
            { value: '300%', label: 'GROWTH' },
            { value: '45K', label: 'USERS' },
            { value: '92%', label: 'RETENTION' },
            { value: '4.9', label: 'RATING' }
          ]
        }
      }
    ]
  },
  {
    id: 'urban-landscapes',
    name: 'URBAN LANDSCAPES',
    client: 'City Development',
    year: '2024',
    team: ['NOAH WILDE', 'AUSTIN BAUWENS', 'SARAH CHEN'],
    overview: 'Sustainable urban development meets innovative architectural design.',
    awards: ['AIGA Design Excellence'],
    services: ['ARCHITECTURE', 'BRANDING', 'ENVIRONMENTAL'],
    tiles: [
      {
        type: 'hero',
        data: {
          title: 'URBAN LANDSCAPES',
          subtitle: 'Future City Design',
          image: 'https://picsum.photos/1920/1080?random=4'
        }
      },
      {
        type: 'summary',
        data: {
          title: 'Vision',
          description: 'Reimagining urban spaces for sustainable living',
          tags: ['ARCHITECTURE', 'SUSTAINABILITY']
        }
      },
      {
        type: 'image',
        data: {
          url: 'https://picsum.photos/1920/1080?random=5',
          caption: 'Concept Visualization'
        }
      }
    ]
  },
  {
    id: 'ocean-horizons',
    name: 'OCEAN HORIZONS',
    client: 'Maritime Corp',
    year: '2024',
    team: ['ALEX RIVERA', 'EMMA WATSON'],
    overview: 'Exploring the intersection of marine conservation and luxury coastal development.',
    awards: ['Environmental Design Award'],
    services: ['STRATEGY', 'BRANDING', 'DIGITAL'],
    tiles: [
      {
        type: 'hero',
        data: {
          title: 'OCEAN HORIZONS',
          subtitle: 'Coastal Excellence',
          image: 'https://picsum.photos/1920/1080?random=6'
        }
      },
      {
        type: 'summary',
        data: {
          title: 'Mission',
          description: 'Balancing luxury with environmental responsibility',
          tags: ['CONSERVATION', 'LUXURY']
        }
      }
    ]
  }
]