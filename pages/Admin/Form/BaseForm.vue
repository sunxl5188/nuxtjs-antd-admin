<template>
  <MyCard
    title="基础表单"
  >
    <MyBaseForm
      :item-list="itemList"
      :rules="rules"
      @onSubmit="onSubmit"
    >
    </MyBaseForm>
  </MyCard>
</template>

<script>
  import MyCard from '~/components/MyCard'
  import MyBaseForm from '~/components/MyBaseForm'

  const options = [
    {
      label: '产品一',
      value: 1
    },
    {
      label: '产品二',
      value: 2
    },
    {
      label: '产品3',
      value: 3
    },
    {
      label: '产品4',
      value: 4
    },
    {
      label: '产品5',
      value: 5
    },
    {
      label: '产品6',
      value: 6
    }
  ]
  const option = [
    {
      label: '产品|1',
      value: 1
    },
    {
      label: '产品|2',
      value: 2
    },
    {
      label: '产品|3',
      value: 3
    }
  ]
  const validator = (rule, value, callback) => {
    const len = value.length
    if (len === 0) {
      callback(new Error('请选择'))
    } else if (len < 2) {
      callback(new Error('至少选择两项'))
    } else {
      callback()
    }
  }
  export default {
    name: 'BaseForm',
    components: { MyCard, MyBaseForm },
    meta: { title: '基础表单' },
    data () {
      return {
        itemList: [
          {
            label: '用户姓名',
            name: 'username',
            placeholder: '请输入用户姓名！！！',
            question: '提示说明，可以用插槽'
          },
          {
            label: '产品类型',
            name: 'proType',
            placeholder: '请选择产品类型',
            type: 'select',
            option: options
          },
          {
            label: '产品类型二',
            name: 'proTypeTow',
            placeholder: '请选择产品类型',
            type: 'select',
            option
          },
          {
            label: '日期选择',
            name: 'times',
            placeholder: '请选择日期选择!!!',
            type: 'date'
          },
          {
            label: '日期范围',
            name: 'rangeTime',
            placeholder: '请选择日期范围!!!',
            type: 'range'
          },
          {
            label: '备注',
            name: 'remarks',
            type: 'textarea',
            placeholder: '请输入备注信息！'
          },
          {
            label: '权重',
            name: 'weights',
            type: 'number',
            min: 1,
            max: 100
          },
          {
            label: '单选',
            name: 'radios',
            type: 'radio',
            option: [
              { label: '单选一', value: 1 },
              { label: '单选二', value: 2 },
              { label: '单选三', value: 3 }
            ],
            children: [
              { label: '产品列表', name: 'target_a', type: 'text', parent: 1 },
              { label: '', name: 'target_b', type: 'select', option, parent: 2 },
              { label: '', name: 'target_c', type: 'date', parent: 3 }
            ]
          },
          {
            label: '多选项',
            name: 'checks',
            type: 'checkbox',
            option: [
              { label: '蓝球', value: 1 },
              { label: '足球', value: 2 },
              { label: '高尔夫', value: 3 }
            ]
          },
          {
            label: '密码',
            name: 'password',
            type: 'password',
            placeholder: '请输入密码！'
          },
          {
            label: '自定义',
            name: 'custom',
            type: 'custom',
            rules: { required: true, message: '请输入自定义内容' },
            placeholder: '请输入自定义内容'
          }
        ],
        rules: {
          username: [
            { required: true, message: '请输入用户名称' },
            { min: 3, max: 10, message: '字符长度为3至10位' },
          ],
          proType: [
            { required: true, message: '请选择产品类型' }
          ],
          times: [
            { required: true, message: '请选择时间' }
          ]
          ,
          remarks: [
            { required: true, message: '请输入描述' }
          ],
          radios: [
            { required: true, message: '请选择单选项' }
          ],
          target_a: [
            { required: true, message: '请输入-------------' }
          ],
          checks: [
            { validator }
          ]
        }

      }
    },
    mounted () {
    },
    methods: {
      onSubmit (data) {
        console.log('需要提交的数据', data)
      }
    }
  }
</script>

<style scoped>

</style>
