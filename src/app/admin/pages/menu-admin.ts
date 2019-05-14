export let MENU_ITEM = [
  {
      path: 'admin/userMN',
      title: 'จัดการuser',
      icon: 'users'
  },
  {
    path: 'admin',
    title: 'จัดการระบบ',
    icon: 'cog',
    children: [
      {
        path: 'decideOrders',
        title: 'สินค้ารอการตัดสิน'
      },
      {
        path: 'categoryManages',
        title: 'จัดการ Category'
      },
      {
        path: '#',
        title: 'จัดการการส่ง'
      },
      {
        path: '#',
        title: 'จัดการการจ่ายเงิน'
      }
    ]
  },
  {
    path: 'admin/business',
    title: 'จัดการธุรกิจ',
    icon: 'cog',
    children: [
      {
        path: '#',
        title: 'สินค้ารอการตัดสิน'
      }
    ]
  },
  {
    path: 'admin/profile',
    title: 'บัญชีของฉัน',
    icon: 'address-card'
  }
];

export let MENU_ITEM2 = [
  {
      path: 'admin/userMN',
      title: 'จัดการuser',
      icon: 'users'
  },
  {
    path: 'admin',
    title: 'จัดการระบบ',
    icon: 'cog',
    children: [
      {
        path: 'decideOrders',
        title: 'สินค้ารอการตัดสิน'
      },
      {
        path: 'categoryManages',
        title: 'จัดการ Category'
      },
      {
        path: 'shippingManages',
        title: 'จัดการการส่ง'
      },
      {
        path: 'payingManages',
        title: 'จัดการการจ่ายเงิน'
      }
    ]
  },
  {
    path: 'admin/business',
    title: 'จัดการธุรกิจ',
    icon: 'cog',
    children: [
      {
        path: '#',
        title: 'สินค้ารอการตัดสิน'
      }
    ]
  },
  {
    path: 'admin/profile',
    title: 'บัญชีของฉัน',
    icon: 'address-card'
  }

];

