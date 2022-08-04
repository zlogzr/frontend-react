import { Button, Space } from 'antd'

import './style.less'

function Home() {
  return (
    <div className="home-page">
      <Space size="large">
        <Button type="primary">爬取</Button>
        <Button type="primary">展示</Button>
        <Button type="primary">退出</Button>
      </Space>
    </div>
  )
}

export default Home
