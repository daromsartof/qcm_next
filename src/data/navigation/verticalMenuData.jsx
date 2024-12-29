const verticalMenuData = dictionary => [
  // This is how you will normally render submenu
  {
    label: "Page d'accueil",
    suffix: {
      label: '5',
      color: 'error'
    },
    href: '/dashboards/crm',
    icon: 'tabler-smart-home'
  },

  // This is how you will normally render menu section
  {
    label: "Question & Reponse",
    isSection: true,
    children: [
      {
        label: "Question",
        icon: 'tabler-question-mark',
        href: '/dashboards/questions'
      },
      {
        label: "Response",
        icon: 'tabler-receipt',
        href: '/dashboards/responses'
      },
      {
        label: "Quiz",
        icon: 'tabler-clipboard-check',
        href: '/dashboards/quiz'
      }
    ]
  },
 /* {
    label: "Utilisateur",
    isSection: true,
    children: [
    
    ]
  },*/
  {
    label: "Utilité",
    isSection: true,
    children: [
      {
        label: "Catégorie",
        icon: 'tabler-category',
        href: '/dashboards/categories'
      },
      {
        label: "Matière",
        icon: 'tabler-book',
        href: '/dashboards/matieres'
      },
      {
        label: "Source Document",
        icon: 'tabler-database',
        href: '/dashboards/sources'
      }
    ]
  }
]

export default verticalMenuData
