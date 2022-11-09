<template>
  <div>
    <dashboard-page-title
      @addEvent="$router.push({name: 'addDoctor'})"
      :showAddBtn="true"
      :showFilter="true"
      :showSearch="true"
      :showExportation="true"
    >الاطباء</dashboard-page-title>

    <main-table :fields="fields" list_url="clinic/doctors"></main-table>
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
        // { label: 'الصورة', key: 'order_address.name', class: 'text-right' },
        { label: 'الدكتور', key: 'full_name', class: 'text-right' },
        { label: 'تكلفة الكشف', key: 'prices', class: 'text-right' },
        { label: 'عدد الكشوفات', key: 'examinations_count', class: 'text-right' },
        {
          label: 'التحكم',
          key: 'actions',
          type: 'actions',
          class: 'text-right',
          actions: [
            {
              text: 'Delete',
              icon: 'ri-delete-bin-line',
              color: 'danger',
              url: 'merchant/products',
              titleHeader: 'منتج',
              question: 'هل متأكد أنك تريد مسح هذا المنتج',
              textContent: 'name',
              textDeleteButton: 'بالتأكيد, مسح',
              textCancelButton: 'الغاء',
              showAlert: true
            }
          ]
        },
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
