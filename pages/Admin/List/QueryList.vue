<template>
  <div>
    <MyLoading :loading="loading"/>
    <div v-if="!loading">
      <MyCard>
        <SearchFilter :item-list="itemList" @onSearch="onSearch"/>
      </MyCard>
      <MyCard title="查询表格">
        <div slot="extra">
          <a-space align="center" direction="horizontal">
            <a-button type="primary">新建</a-button>
            <a-button type="default">批量删除</a-button>
            <a-dropdown-button>
              更多操作
              <a-icon slot="icon" type="down" />
              <a-menu slot="overlay">
                <a-menu-item key="1">审核</a-menu-item>
                <a-menu-item key="2">删除</a-menu-item>
              </a-menu>
            </a-dropdown-button>
          </a-space>
        </div>
        <MyTable
          :columns="columns"
          :data-source="dataSource"
          show-operation
          show-selection
          @onSeeDetail="handleSeeDetail"
          @onEditDetail="handleEditDetail"
          @onDelete="handleDelete"
          @change="handleChange"
        >
          <span slot="status" slot-scope="{row}" :class="row.record.state === 1 ? 'text-success' : row.record.state === 2 ? 'text-danger' : ''">
            {{setStatus(row.record.state)}}
          </span>
          <span slot="extra-operation">
                        <a-dropdown :trigger="['click']" placement="bottomRight">
                          <a-menu slot="overlay">
                            <a-menu-item key="1">菜单一</a-menu-item>
                            <a-menu-item key="2">菜单二</a-menu-item>
                            <a-menu-item key="3">菜单三</a-menu-item>
                          </a-menu>
                          <a-button size="small" type="link">
                              更多
                              <a-icon type="down"/>
                          </a-button>
                        </a-dropdown>
                </span>
        </MyTable>
      </MyCard>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QueryList',
    meta: { title: '查询表格' },
    data () {
      return {
        loading: true,
        itemList: [
          {
            label: '编号',
            name: 'id'
          },
          {
            label: '标题',
            name: 'title'
          },
          {
            type: 'select',
            label: '状态',
            name: 'state',
            placeholder: '请选择',
            option: [{ label: '关闭', value: 1 }, { label: '运行中', value: 2 }]
          },
          {
            label: '调用次数',
            name: 'frequency'
          },
          {
            type: 'date',
            label: '更新日期',
            name: 'upTime'
          },
          {
            label: '描述',
            name: 'desc'
          }
        ],
        dataSource: [
          {
            id: 10,
            frequency: 20,
            desc: '女老师穿“洛丽塔”上课，学生情绪高涨，家长看到后却担心不已',
            state: -1,
            upTime: '2022-07-25 14:35:00'
          },
          {
            id: 208,
            frequency: 22,
            desc: '换剧不换妆、换汤不换药，杨紫还要在古偶剧里被蹉跎多久',
            state: -1,
            upTime: '2022-07-26 14:35:00'
          },
          {
            id: 308,
            frequency: 202,
            desc: 'Vue项目实战-尚品汇--detail页面开发(七)_winterjoycc',
            state: 1,
            upTime: '2022-07-27 14:35:00'
          },
          {
            id: 318,
            frequency: 212,
            desc: '难怪宝玉后悔娶宝钗，反而出家当和尚，看宝钗这个毛病谁受得',
            state: 2,
            upTime: '2022-07-28 14:35:00'
          },
          {
            id: 319,
            frequency: 213,
            desc: '女子在石缝中发现野生西瓜，5天后带工具切开意外惊喜，现场吃瓜',
            state: 1,
            upTime: '2022-07-29 14:35:00'
          },
          {
            id: 320,
            frequency: 210,
            desc: '丑脖子究竟多拉垮？5位女星明明都有张美人脸',
            state: 1,
            upTime: '2022-07-29 11:35:00'
          }
        ],
        columns: [
          {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['ascend', 'descend']
          },
          {
            title: '调用次数',
            dataIndex: 'frequency',
            key: 'frequency',
            sorter: (a, b) => a.frequency - b.frequency,
            sortDirections: ['ascend', 'descend']
          },
          {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc'
          },
          {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
            filters: [
              {
                text: '开启',
                value: 1,
              },
              {
                text: '初始',
                value: -1,
              },
              {
                text: '关闭',
                value: 2,
              }
            ],
            onFilter: (value, record) => {
              return record.state === value
            },
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '更新时间',
            dataIndex: 'upTime',
            key: 'upTime',
            sorter: (a, b) => new Date(a.upTime).getTime() - new Date(b.upTime).getTime(),
            sortDirections: ['ascend', 'descend']
          }
        ]
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.loading = false
      })
    },
    methods: {
      onSearch (data) {
        console.log('搜索打印字段', data)
      },
      handleChange (e) {
        const { filters, sorter } = e
        if (Object.keys(filters).length > 0) {
          console.log(`远程筛选对象=>${JSON.stringify(filters)}`)
        }
        if (Object.keys(sorter).length > 0) {
          console.log(`远程排序字段=>${sorter.field}`, `远程排序值=>${sorter.order || ''}`)
        }
      },
      handleSeeDetail (id) {
        this.$router.push('/admin/List/Detail/BasicDetail?id=' + id)
      },
      handleEditDetail (id) {
        this.$router.push('/admin/List/Detail/EditorDetail?id=' + id)
      },
      handleDelete (id) {
        const data = [...this.dataSource]
        this.$lodash.remove(data, o => o.id === id)
        this.dataSource = data
      },
      setStatus (type) {
        return type === -1 ? '初始' : type === 1 ? '开启' : '关闭'
      }
    }
  }
</script>

<style scoped>

</style>
