import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Modal from "../components/Modal"
import { write } from 'xlsx';




const TableItemCode = ({datos, get_socioNegocio}) => {
  console.log('en tabla',datos)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


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
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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
      dataIndex: 'cardCode_cadena',
      key: 'cardCode_cadena',
      width: 150,
      ...getColumnSearchProps('cardCode_cadena')
      },
      {
      title: <span style={{ color: "white" }}>Cadena</span>,
      dataIndex: 'name_cadena',
      key: 'name_cadena',
      width: 150,
      ...getColumnSearchProps('name_cadena')
      },
    {
      title: <span style={{ color: "white" }}>SKU Cliente</span>,
      dataIndex: 'sku_cliente',
      key: 'sku_cliente',
      width: 150,
      ...getColumnSearchProps('sku_cliente'),
    },
    {
     title: <span style={{ color: "white" }}>Descripcion cliente</span>,
     dataIndex: 'descripcion_cliente',
     key: 'descripcion_cliente',
     width: 150,
     ...getColumnSearchProps('descripcion_cliente'),
   },
    {
      title: <span style={{ color: "white" }}>SKU Ecofiltro</span>,
      dataIndex: 'sku_ecofiltro',
      key: 'sku_ecofiltro',
      width: 150,
      ...getColumnSearchProps('sku_ecofiltro'),
    },
    {
      title: <span style={{ color: "white" }}>Precio sin Iva</span>,
      dataIndex: 'precio_sinIva',
      key: 'precio_sinIva',
      width: 150,
      ...getColumnSearchProps('sku_ecofiltro'),
    },
    {
      title: <span style={{ color: "white" }}>Descripción Ecofiltro</span>,
      dataIndex: 'descripcion_ecofiltro',
      key: 'descripcion_ecofiltro',
      ...getColumnSearchProps('descripcion_ecofiltro'),
    },
    {
      title: <span style={{ color: "white" }}>Acciones</span>,
      key: 'acciones',
      render: (_, record) => (
        <Space>
         <Modal record={record} formulario='updateItemCode' get_socioNegocio={get_socioNegocio}/>
        </Space>
      ),
    },
  ];



  return (
    <Table
      columns={columns}
      dataSource={datos}
      bordered
      pagination={{ pageSize: 8 }}
      scroll={{ x: 'max-content' }}

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
                 whiteSpace: "nowrap"
                //display:Flex
              }}
            />
          ),
        },
      }}
    />
  );
};

export default TableItemCode;