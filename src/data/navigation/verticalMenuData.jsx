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
        icon: 'tabler-shopping-cart',
        href: '/dashboards/questions'
      },
      {
        label: "Response",
        icon: 'tabler-school',
        href: '/dashboards/responses'
      },
      {
        label: "Quiz",
        icon: 'tabler-school',
        href: '/dashboards/quiz'
      }
    ]
  },
  {
    label: "Utilisateur",
    isSection: true,
    children: [
      {
        label: dictionary['navigation'].formLayouts,
        icon: 'tabler-layout',
        href: '/forms/form-layouts'
      }
    ]
  },
  {
    label: "Utilité",
    isSection: true,
    children: [
      {
        label: "Catégorie",
        icon: 'tabler-layout',
        href: '/forms/form-layouts'
      },
      {
        label: "Matière",
        icon: 'tabler-layout',
        href: '/forms/form-layouts'
      },
      {
        label: "Source Document",
        icon: 'tabler-layout',
        href: '/forms/form-layouts'
      }
    ]
  }
]

export default verticalMenuData
