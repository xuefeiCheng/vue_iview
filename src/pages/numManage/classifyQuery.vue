<template>
  <div class="div-border source">
    <Form :label-width="100">
      <Row>
        <Col span="8">
          <FormItem label="号码来源">
            <Select style="width: 100%;" placeholder="请选择要查询的号码来源">
              <Option v-for="item in numSource" :value="item.type" :key="item.type">{{ item.content }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="号码分类">
            <Select style="width: 100%;" placeholder="请选择要查询的号码分类">
              <Option v-for="item in numClassify" :value="item.type" :key="item.type">{{ item.content }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="创建时间">
            <DatePicker  type="daterange" placement="bottom-end" placeholder="请选查询时间段" style="width: 100%;"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row style="margin-top:15px">
        <Col span="8" offset="8">
          <FormItem>
            <Button type="success" size="large" icon="ios-search" class="searchBtn" >搜索</Button>
            <Button type="info" size="large" icon="ios-refresh" class="searchBtn">重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider class="marginTen"/>
    <Row>
      <Table border :columns="columns" :data="data"></Table>
    </Row>
    <div class="tab_footer">
      <Page :total="100" show-elevator />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visualMapMix: 10,
      numSource: [{
        type: 'day',
        content: '自分析'
      },
      {
        type: 'week',
        content: '第三方'
      },
      {
        type: 'month',
        content: '网站导入'
      }],
      numClassify: [{
        type: 'day',
        content: '恶意骚扰'
      },
      {
        type: 'week',
        content: '广告推销'
      },
      {
        type: 'month',
        content: '违法犯罪'
      },
      {
        type: 'others',
        content: '其他'
      }],
      columns: [
        {
          title: '号码',
          key: 'num'
        },
        {
          title: '号码来源',
          key: 'source'
        },
        {
          title: '号码分类',
          key: 'classify'
        },
        {
          title: '入库时间',
          key: 'date'
        },
        {
          title: '是否拦截',
          key: 'isLianjie'
        },
        {
          title: '是否提醒',
          key: 'isTixing'
        }
      ],
      data: [
        {
          num: '158****9609',
          source: '自分析',
          classify: '违法犯罪',
          date: '2016-10-03',
          isLianjie: '已拦截',
          isTixing: '已提醒'
        }
      ]
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>
.source .marginTen{
  margin: 10px 0 !important;
}
.source .ivu-form-item{
  margin-bottom: 0 !important;
}
.source .row-col{
    height: 600px;
    width: 100%;
}
.source .conent-echart{
    width:96%;
    height:95%;
}
</style>
