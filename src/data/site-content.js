// Site-wide content and statistics
import { Users, Award, Globe, Zap } from 'lucide-react'

export const companyStats = [
  { 
    icon: Users, 
    label: "Team Members", 
    value: "10+",
    description: "Creative professionals"
  },
  { 
    icon: Award, 
    label: "Projects Delivered", 
    value: "50+",
    description: "Successful campaigns"
  },
  { 
    icon: Globe, 
    label: "Global Clients", 
    value: "25+",
    description: "Worldwide brands"
  },
  { 
    icon: Zap, 
    label: "Years Experience", 
    value: "5+",
    description: "In the industry"
  }
]

export const services = [
  {
    id: 'motion-graphics',
    title: "Motion Graphics",
    description: "Bringing brands to life through compelling animation and visual storytelling.",
    color: "neon-blue",
    capabilities: [
      "2D/3D Animation",
      "Explainer Videos",
      "Social Media Content",
      "Product Demos"
    ]
  },
  {
    id: 'brand-identity',
    title: "Brand Identity",
    description: "Creating distinctive visual identities that resonate with your audience.",
    color: "vivid-purple",
    capabilities: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Systems",
      "Brand Strategy"
    ]
  },
  {
    id: 'creative-direction',
    title: "Creative Direction",
    description: "Strategic creative leadership for campaigns that make an impact.",
    color: "neon-blue",
    capabilities: [
      "Campaign Strategy",
      "Art Direction",
      "Concept Development",
      "Creative Consulting"
    ]
  },
  {
    id: 'product-marketing',
    title: "Product Marketing",
    description: "Expertise in positioning and promoting SaaS, fintech, and AI products.",
    color: "vivid-purple",
    capabilities: [
      "Launch Campaigns",
      "Product Videos",
      "Marketing Strategy",
      "Growth Marketing"
    ]
  }
]

export const heroContent = {
  headline: {
    line1: "We create",
    emphasis1: "cult",
    emphasis2: "followings",
    line2: "for brands"
  },
  subtitle: "A creative agency focused on scaling brands through strategy and design.",
  cta: {
    primary: {
      text: "Watch Reel",
      action: "playReel"
    },
    secondary: {
      text: "work@ravie.co",
      action: "mailto:work@ravie.co"
    }
  }
}

export const aboutContent = {
  headline: "About Ravie.co",
  description: "We're a purposefully small & nimble creative studio that specializes in creating cult followings for ambitious brands in SaaS, fintech, crypto, and AI.",
  cta: {
    headline: "Ready to build something great?",
    description: "Let's discuss how we can help your brand stand out in a crowded market.",
    primaryButton: "Start a Project",
    email: "work@ravie.co"
  }
}

export const projectDirectoryContent = {
  title: "Project Directory",
  aboutUs: {
    title: "About us",
    description: "We create cult followings for brands. A motion & design studio with a soft spot for ambitious companies in SaaS, fintech, crypto, and AI."
  },
  stats: {
    projects: "12+",
    totalViews: "50M+"
  }
}