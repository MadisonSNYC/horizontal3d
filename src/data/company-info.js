// Company information and contact details
export const companyInfo = {
  name: 'Ravie.co',
  tagline: 'We create cult followings for brands',
  description: 'A motion & design studio with a soft spot for ambitious companies.',
  extendedDescription: 'We\'re a purposefully small & nimble creative studio that specializes in creating cult followings for ambitious brands in SaaS, fintech, crypto, and AI.',
  email: 'work@ravie.co',
  founded: '2020',
  specialties: ['SaaS', 'Fintech', 'Crypto', 'AI']
}

export const offices = [
  {
    id: 'raleigh',
    city: 'Raleigh, NC',
    address: '150 Fayetteville St Ste 300',
    zipcode: 'Raleigh, NC 27601',
    contact: {
      name: 'Austin Bauwens',
      title: 'Co-Founder, Chief Operations Officer',
      email: 'austin@ravie.co',
      phone: '+1-919-249-8201'
    }
  },
  {
    id: 'nyc',
    city: 'NYC',
    address: '108 Stanton St',
    zipcode: 'New York, NY 10002',
    contact: {
      name: 'Noah Wilde',
      title: 'Co-Founder, Chief Innovation Officer',
      email: 'noah@ravie.co',
      phone: '+1-929-243-4691'
    }
  }
]

export const socialLinks = [
  { 
    name: 'Instagram', 
    url: 'https://instagram.com/ravie.co', 
    icon: '📸',
    username: '@ravie.co'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com/company/ravieco', 
    icon: '💼',
    username: 'Ravie.co'
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com/ravieco', 
    icon: '🐦',
    username: '@ravieco'
  },
  { 
    name: 'Behance', 
    url: 'https://behance.net/ravieco', 
    icon: '🎨',
    username: 'Ravie.co'
  }
]

export const footerLinks = {
  legal: [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' }
  ],
  copyright: `© ${new Date().getFullYear()} Ravie.co. All rights reserved.`
}