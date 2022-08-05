import { useAuth } from '@/context'
import { get } from '@/utils/request'
import { Button, Space, message } from 'antd'
import { EChartsOption, SeriesOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import moment from 'moment'
import { useEffect, useState } from 'react'

import './style.less'

interface ICourseItem {
  title: string
  count: number
}

interface IData {
  [key: string]: ICourseItem[]
}

function Home() {
  const { logout } = useAuth()

  const [data, setData] = useState<IData>({})

  useEffect(() => {
    get('/api/showData').then(res => {
      if (res?.data) {
        setData(res?.data)
      }
    })
  }, [])

  const getData = () => {
    get('/api/getData').then(res => {
      if (res?.data) {
        message.destroy()
        message.success('爬取数据成功')
      } else {
        message.destroy()
        message.error(res.data?.errMsg)
      }
    })
  }

  const getOption: () => EChartsOption = () => {
    const courseNames: string[] = []
    const times: string[] = []
    const tempData: {
      [key: string]: number[]
    } = {}

    for (const i in data) {
      const item = data[i]
      times.push(moment(Number(i)).format('MM-DD HH:mm'))
      item.forEach(innerItem => {
        const { title, count } = innerItem
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title)
        }
        tempData[title] ? tempData[title].push(count) : (tempData[title] = [count])
      })
    }

    const result: SeriesOption[] = []
    for (const i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i]
      })
    }
    return {
      title: {
        text: '课程在线学习人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: courseNames
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times
      },
      yAxis: {
        type: 'value'
      },
      series: result
    }
  }
  return (
    <div className="home-page">
      <div className="button-box">
        <Space size="large">
          <Button type="primary" onClick={getData}>
            爬取
          </Button>
          <Button type="primary" onClick={() => logout()}>
            退出
          </Button>
        </Space>
      </div>
      <div className="echarts-box">
        <ReactECharts option={getOption()} />
      </div>
    </div>
  )
}

export default Home
