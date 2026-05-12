import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { ejecutarWorckFlow } from "../services/socioDeNegocio.service"
import Alert from "../components/Alert.jsx"



const TablaSociosNegocios = ({datos}) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [alert, SetAlert] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 10 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, borderRadius: 6 }}
        />

        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ borderRadius: 6 }}
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          >
            Buscar
          </Button>

          <Button
            size="small"
            style={{ borderRadius: 6 }}
            onClick={() => clearFilters && handleReset(clearFilters)}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => close()}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      //<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
       <SearchOutlined style={{ color: '#fff' }} />
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{fontSize:11, backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
 
  const columns = [

      {
      title: <span style={{ color: "white" }}>CardCode</span>,
      dataIndex: 'cardCode',
      key: 'cardCode',
      width: 150,
      ...getColumnSearchProps('cardCode')
      },
      {
      title: <span style={{ color: "white" }}>Nombre</span>,
      dataIndex: 'nombre',
      key: 'nombre',
      width: 150,
      ...getColumnSearchProps('nombre')
      },
      {
      title: <span style={{ color: "white" }}>Departamento</span>,
      dataIndex: 'cc_departamento',
      key: 'cc_departamento',
      width: 150,
      ...getColumnSearchProps('cc_departamento')
      },
      {
      title: <span style={{ color: "white" }}>Canal</span>,
      dataIndex: 'cc_canal',
      key: 'cc_canal',
      width: 150,
      ...getColumnSearchProps('cc_canal')
      },
      {
      title: <span style={{ color: "cc_vendedor" }}>Vendedor</span>,
      dataIndex: 'cc_vendedor',
      key: 'cc_vendedor',
      width: 150,
      ...getColumnSearchProps('cc_vendedor')
      },
    {
      title: <span style={{ color: "white" }}>Estado</span>,
      dataIndex: 'estado',
      key: 'estado',
      width: 150,
      ...getColumnSearchProps('estado'),
    },
    {
     title: <span style={{ color: "white" }}>Fecha de creación</span>,
     dataIndex: 'fecha_creacion',
     key: 'fecha_creacion',
     width: 150,
     ...getColumnSearchProps('fecha_creacion'),
   },
    {
     title: <span style={{ color: "white" }}>Workflow</span>,
     dataIndex: 'w_cadena',
     key: 'w_cadena',
     width: 150,
     ...getColumnSearchProps('w_cadena'),
     render: (_, record) => (
  <button
    onClick={() => NameCadena(record)}
    disabled={loadingId === record.cardCode}
    style={{
      background: loadingId === record.cardCode ? "#999" : "#1677ff",
      color: "#fff",
      border: "none",
      padding: "4px 10px",
      borderRadius: "6px",
      cursor: loadingId === record.cardCode ? "not-allowed" : "pointer"
    }}
  >
    {loadingId === record.cardCode ? "Procesando..." : "ejecutar"}
  </button>
)
   },
   
  ];

const NameCadena = async (record) => {

  // 🔥 activar loading
  setLoadingId(record.cardCode);

  SetAlert({
    ok: true,
    tipo: "info",
    text: '⏳ Procesando workflow, por favor espera...'
  });

  try {
    const respuesta = await ejecutarWorckFlow(record);

    console.log('aca 1', respuesta);

    if (respuesta?.ok) {
      SetAlert({
        ok: true,
        tipo: "success",
        text: '✅ Workflow ejecutado correctamente.'
      });
    } else {
      SetAlert({
        ok: false,
        tipo: "error",
        text: respuesta?.resultado?.message || '❌ Ocurrió un error al ejecutar el proceso.'
      });
    }

  } catch (error) {
    SetAlert({
      ok: false,
      tipo: "error",
      text: '❌ Error inesperado.'
    });
  } finally {
    // 🔥 quitar loading
    setLoadingId(null);
  }
};
  return (
    <>
    {alert.ok ? <Alert alert={alert} /> : null}
    <Table
      columns={columns}
      dataSource={datos}
      bordered
      pagination={{ pageSize: 8 }}
      scroll={{ x: 900, y: 400 }}

      style={{
        fontSize:11,
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}

      title={() => (
        <span style={{
          fontWeight: 600,
          fontSize: "13px",
          color: "#0b3c5d"
        }}>
          Listado de ItemCode
        </span>
      )}

      components={{
        header: {
          cell: (props) => (
            <th
              {...props}
              style={{
                fontSize:11,
                background: "#0b3c5d",
                color: "white",
                fontWeight: 600,
                display:Flex
              }}
            />
          ),
        },
      }}
    />
    </>
  );
};

export default TablaSociosNegocios;