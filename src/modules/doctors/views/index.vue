<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addDoctor'})" :showAddBtn="true" :showFilter="true" :showSearch="true" :showExportation="true">الاطباء</dashboard-page-title>

    <main-table :fields="fields" list_url="merchant/orders"></main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  components: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [
        { label: 'Id', key: 'id', class: 'text-right', sortable: true },
        { label: 'الصورة', key: 'order_address.name', class: 'text-right' },
        { label: 'الدكتور', key: 'order_products', array_keys: ['product_name'], class: 'text-right', type: 'array' },
        { label: 'تكلفة الكشف', key: 'order_address.paid', class: 'text-right' },
        { label: 'عدد الكشوفات', key: 'order_address.phone', class: 'text-right' },
        { label: 'التحكم', key: 'total_amount_a', class: 'text-right' },
        { label: 'Created At', key: 'created_at', class: 'text-right' }
      ]
    }
  },
  methods: {
    addMerchant () {
      console.log('hello')
    }
  }
}
</script>
