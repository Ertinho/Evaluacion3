import { StyleSheet, Text, View , Image, Button} from 'react-native'
import React, { useState, useEffect } from 'react'
// import React from 'react'
import axios from 'axios'

export default function List() {
  const [products, setProducts] = useState([])

  //get products from API using axios
  const getProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  //delete product from API using axios
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  //edit product from API using axios
  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/products`)
      setProducts(response.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <View style = {styles.container}>
      <Text>List of Products</Text>
      {products.map((product, index) => (
        <View key={index}>
          <Text >Nombre: {product.name}</Text>
          <Image source={{uri: product.image}} style={{width: 50, height: 50}} />
          <Text >Descripción: {product.description}</Text>
          <Text>Precio: {product.price}</Text>
          <Text>Cantidad: {product.quantity}</Text>
          <Text>Estado: {product.status}</Text>
          <Button title="Edit" onPress={() => handleEdit(product.id)} />
          <Button title="Delete" onPress={() => handleDelete(product.id)} color="red" />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
  },




})