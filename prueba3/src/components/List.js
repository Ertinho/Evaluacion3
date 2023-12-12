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
        <View key={index} style={styles.productContainer}>
          <Image source={{uri: product.image}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Nombre: {product.name}</Text>
            <Text style={styles.productDescription}>Descripción: {product.description}</Text>
            <Text style={styles.productPrice}>Precio: {product.price}</Text>
            <Text style={styles.productQuantity}>Cantidad: {product.quantity}</Text>
            <Text style={styles.productStatus}>Estado: {product.status}</Text>
            <Button title="Edit" onPress={() => handleEdit(product.id)} />
            <Button title="Delete" onPress={() => handleDelete(product.id)} color="red" />
          
          </View>
          
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8'
  },

  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  productInfo: {
    flex: 1
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productDescription: {
    fontSize: 14,
    color: '#666'
  },
  productPrice: {
    fontSize: 16,
    color: '#000'
  },
  productQuantity: {
    fontSize: 14,
    color: '#666'
  },
  productStatus: {
    fontSize: 14,
    color: '#666'
  }


})