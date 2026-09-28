import { DatePicker, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import toDay from '../components/toDay.js'
import { useEffect } from 'react';
const { RangePicker } = DatePicker;
console.log('dayyyyy',dayjs)
const App = ({onDateChanges, f_inicio, f_fin, tittle }) => {
  useEffect(()=>{
    toDay
  })

  return(
  <Space vertical>
    <Typography.Title level={5}>{tittle}</Typography.Title>
    <RangePicker defaultValue={[dayjs(f_inicio ? f_inicio : toDay), dayjs(f_fin ? f_fin : toDay)]} onChange={(e)=>onDateChanges(e)} />
  </Space>
  )
};
export default App;