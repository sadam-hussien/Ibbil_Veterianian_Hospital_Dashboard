// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const doctors = () => import('./views/index')
const addDoctor = () => import('./views/addDoctor')

// start Routes
export default [
  {
    path: '/doctors',
    name: 'doctors',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'doctors',
      meta: {
        name: 'doctors',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: doctors
    }, {
      path: 'add-doctor',
      name: 'addDoctor',
      meta: {
        name: 'addDoctor',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addDoctor
    }]
  }
]
