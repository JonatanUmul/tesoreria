import { useState, useEffect } from 'react'
import './App.css'
import { getsocios } from './services/sap.service.js'
import { Select } from 'antd'
import MenuLayout from './components/Menu.component.jsx'

function App() {

    const [socioSeleccionado, setSocioSeleccionado] = useState("")
    const [socios, setSocios] = useState([])
    const res = async () => {
        const sociosResponse = await getsocios()  
        console.log('SOICOS: ', sociosResponse)
        setSocios(sociosResponse)
    }

    const handleChange = (valueParam) => {
        console.log('valueParam: ', valueParam)
        //setSocioSeleccionado(valueParam[0])
    }

  useEffect(() => {
    res()
  }, [])

  /*
      options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
  */

 {/*
     <Select
   //suffixIcon={smileIcon}
   defaultValue={[socioSeleccionado]}
   //mode="multiple"
   style={{ width: 120 }}
   onChange={handleChange}
   
   options={socios.map(socioElem => {
     return {
         value : socioElem['Código'],
         label: socioElem['Nombre']
       }
     })}
 />
     */}

  return (
    <div className='w-screen  h-screen'>
      
      <MenuLayout children={<p>jlkjl</p>}/>
      
    </div>


    
  )
}

export default App
