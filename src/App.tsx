import { useState } from "react"
import { useQuery } from "react-query"
// Components
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core"
import Cart from "./Cart/Cart"
import { AddShoppingCart } from "@material-ui/icons"
import Item from "./Item/Item"
// Styles
import { Wrapper, StyledButton } from "./App.styles"
// Types
export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json()

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  )
  console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => null
  const handleRemoveFromCart = () => null

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong ... 🤨</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton
        onClick={() => {
          setCartOpen(true)
        }}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default App
