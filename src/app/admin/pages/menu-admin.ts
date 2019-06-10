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
        path: 'categoryManages',
        title: 'จัดการประเภทสินค้า'
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
    icon: 'briefcase',
    children: [
      {
        path: 'decideOrders',
        title: 'สินค้ารอการตัดสิน'
      },
      {
        path: 'businessManages',
        title: 'บริหารธุรกิจ'
      },
      {
        path: 'accountManages',
        title: 'จัดการบัญชี'
      },
      {
        path: 'packageManages',
        title: 'จัดการแพคเก็จ'
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
        path: 'categoryManages',
        title: 'จัดการประเภทสินค้า'
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
    icon: 'briefcase',
    children: [
      {
        path: 'decideOrders',
        title: 'สินค้ารอการตัดสิน'
      },
      {
        path: 'businessManages',
        title: 'บริหารธุรกิจ'
      },
      {
        path: 'accountManages',
        title: 'จัดการบัญชี'
      },
      {
        path: 'packageManages',
        title: 'จัดการแพคเก็จ'
      }
    ]
  },
  {
    path: 'admin/profile',
    title: 'บัญชีของฉัน',
    icon: 'address-card'
  }

];

