import React, { useEffect, useRef, useState } from 'react';
import './TablaOrdenesDeVenta.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Flex } from 'antd';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { formatFecha } from '../services/FormatearFecta';
import Modal from "./Modal"
const App = ({ dato }) => {

console.log('datossss',dato)
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pedido, setPedido] = useState('');
  const [codSap, setCodSap] = useState('');

  const searchInput = useRef(null);

  const data = dato?.map((dato, index) => ({
    key: index,
    id: dato.id_oc,
    tienda: dato.nombre,
    DocNum: dato.DocNum,
    pedido: dato.numero_oc,
    cod_sap: dato.cardCode,
    tags: [dato.estado],
    para_tienda: dato.pedido_para_tienda,
    telefono: dato.telefono,
    age: formatFecha(dato.fecha_creacion),
    direccion_entrega: dato.direccion_entrega,
    U_V3_FCE_Enlace: dato.U_V3_FCE_Enlace
  }));

  const NumPedido = (record) => {
    setPedido(record);
  };

  useEffect(() => {
    if (pedido) {
      navigate(`/h2h/OrdenDeVenta/detalleOrdenDeVenta/${pedido}`, { state: { pedido } });
    }
  }, [pedido, navigate]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 10 }}>
        
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            borderRadius: "6px",
            height: "32px"
          }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ borderRadius: "6px", width: 90}}
          >
            Buscar
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ borderRadius: "6px", width: 90 }}
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

    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),

    onFilter: (value, record) =>
      record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),

    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },

    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
      title: <span style={{ color: "white" }}>Pedido</span>,
      dataIndex: 'pedido',
      key: 'pedido',
      ...getColumnSearchProps('pedido'),
      render: (_, record) => (
        <button
          onClick={() => NumPedido(record)}
          style={{
            background: "#1677ff",
            color: "#fff",
            border: "none",
            padding: "4px 10px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          {record.pedido}
        </button>
      )
    },
     {
      title: <span style={{ color: "white" }}>Factura</span>,
      dataIndex: 'Ver Factura',
      key: 'factura',
      ...getColumnSearchProps('factura'),
      render: (_, record) => (
          <Modal formulario='VerFacturaReserva' URL_PDF={data[0]?.U_V3_FCE_Enlace} title={data[0]?.U_V3_FCE_Enlace ? 'Ver factura' : 'Sin factura' }/>
      )
    },
    
    {
      title: <span style={{ color: "white" }}>Tienda</span>,
      dataIndex: 'tienda',
      key: 'tienda',
      width: '10%',
      ...getColumnSearchProps('tienda'),
    },
    {
      title: <span style={{ color: "white" }}>DocNum</span>,
      dataIndex: 'DocNum',
      key: 'DocNum',
      ...getColumnSearchProps('DocNum')
    },
    {
      title: <span style={{fontSize:11, color: "white" }}>Código SAP</span>,
      dataIndex: 'cod_sap',
      key: 'cod_sap',
      width: '10%',
      ...getColumnSearchProps('cod_sap'),
    },
    {
      title: <span style={{fontSize:11, color: "white" }}>Estado</span>,
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <Flex gap="small" align="center" wrap>
          {tags.map(tag => {
            const key = tag?.toLowerCase().trim();
            let color = 'default';

            if (key === 'creado en sap') color = 'success';
            else if (key === 'actualizado') color = 'processing';
            else if (key === 'error') color = 'error';
            else if (key === 'pendiente') color = 'warning';

            return (
              <Tag key={tag} color={color} style={{ borderRadius: "6px", padding: "2px 8px" }}>
                {tag?.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      title: <span style={{ color: "white" }}>Para Tienda</span>,
      dataIndex: 'para_tienda',
      key: 'para_tienda',
      ...getColumnSearchProps('para_tienda'),
    },
    {
      title: <span style={{ color: "white" }}>Teléfono</span>,
      dataIndex: 'telefono',
      key: 'telefono',
      ...getColumnSearchProps('telefono'),
    },
    {
      title: <span style={{ color: "white" }}>Fecha</span>,
      dataIndex: 'age',
      key: 'age',
      ...getColumnSearchProps('age'),
    },
    {
      title: <span style={{ color: "white" }}>Id</span>,
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
  ];

return (
  <Table
    columns={columns}
    dataSource={data}
    scroll={{ x: 1200, y: 450 }} 
    bordered
    pagination={{ pageSize: 8 }}

    size="middle"

    style={{
      textAlign:'center',
      background: "#ffffff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
    }}

    title={() => (
      <div style={{
        fontSize: "13px",
        fontWeight: "600",
        color: "#0b3c5d"
      }}>
        Órdenes de Venta
      </div>
    )}

    components={{
      header: {
        cell: (props) => (
          <th
            {...props}
            style={{
              background: "#0b3c5d",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "11px",
              padding: "10px"
            }}
          />
        ),
      },
      body: {
        cell: (props) => (
          <td
            {...props}
            style={{
              textAlign:'center',
              padding: "10px",
              fontSize: "11px"
            }}
          />
        ),
      },
    }}
  />
);
};

export default App;