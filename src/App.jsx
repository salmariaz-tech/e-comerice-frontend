import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState("")
  const [productIdOfUpdate, setProductIdOfUpdate] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backen-server-with-db-production.up.railway.app//products")
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchProducts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newProduct = {
        id: products.length + 1,
        name,
        desc,
        imageUrl,
        price: parseFloat(price)
      }
      await axios.post("https://backen-server-with-db-production.up.railway.app//products", newProduct)
      setProducts([...products, newProduct])
      alert("Product Added Successfully!")
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const updatedData = { name, desc, imageUrl, price }
      await axios.put(`http://localhost:5050/products/${productIdOfUpdate}`, updatedData)
      alert("Product Updated Successfully!")
    } catch (err) {
      console.log(err)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/products/${id}`)
      setProducts(products.filter((pr) => pr.id !== id))
      alert("Product Removed!")
    } catch (err) {
      alert("Something went wrong")
      console.log(err)
    }
  }

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {/* Add Product */}
        <div className="form-section">
          <h2>Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" onChange={(e) => setImageUrl(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" onChange={(e) => setDesc(e.target.value)} />
            </Form.Group>
            <Button className="btn-custom" type="submit">Add Product</Button>
          </Form>
        </div>

        {/* Update Product */}
        <div className="form-section">
          <h2>Update Product</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" onChange={(e) => setImageUrl(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" onChange={(e) => setDesc(e.target.value)} />
            </Form.Group>
            <Button className="btn-custom" type="submit">Update Product</Button>
          </Form>
        </div>
      </div>

      {/* Product Cards */}
      <div className="products-container">
        {products.map((pr) => (
          <Card key={pr.id} className="custom-card">
            <Card.Img variant="top" src={pr.imageUrl} />
            <Card.Body>
              <Card.Title>{pr.name}</Card.Title>
              <Card.Text>{pr.desc}</Card.Text>
              <p className="price-tag">Price: Rs. {pr.price}</p>
              <div className="card-buttons">
                <Button variant="success" onClick={() => setProductIdOfUpdate(pr.id)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteProduct(pr.id)}>Delete</Button>
                {/* <Button variant="primary">Add to Cart</Button> */}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default App
