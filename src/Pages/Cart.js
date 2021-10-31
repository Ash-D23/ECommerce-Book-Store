import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateproduct, removeproduct } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 18px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductAmountbtn = styled.div`
  font-size: 18px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const [total, settotal] = useState(null)
  const history = useHistory();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", { data: res.data });
      } catch {
        history.push("/error");
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const updatequantity = (prodid, prodquantity)=> {
    if (prodquantity==0){
      dispatch(
        removeproduct({ id: prodid})
      );
    }else{
      dispatch(
        updateproduct({
        id: prodid,
        quantity : prodquantity
      })
      )
    }
    
  }

  useEffect(()=>{
    let tot = 0

    cart.products.map((product)=>{
      tot += (product.price*product.quantity)
    })

    settotal(tot)
  }, [cart])

  const removefromcart = (pid)=>{
    dispatch(
      removeproduct({ id: pid})
    );
  }
  

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Cart</Title>
        
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <Button onClick={() => removefromcart(product._id)}>Remove from Cart</Button>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    
                    <ProductAmount><b>Quantity: </b>
                    <br />
                    <ProductAmountbtn>
                      <Remove onClick={() => updatequantity(product._id, product.quantity-1)} />
                      <p>{product.quantity}</p>
                      <Add onClick={() => updatequantity(product._id, product.quantity+1)} />
                    </ProductAmountbtn>
                    
                    </ProductAmount>
                    
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs. {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {total}</SummaryItemPrice>
            </SummaryItem>
            {!user ? (<p>Login to Checkout</p> ) : (
            <StripeCheckout
              name="Book Store"
              image="book3.jpg"
              billingAddress
              shippingAddress
              description={`Your total is Rs.${total}`}
              amount={total}
              token={onToken}
              stripeKey="pk_test_51JjemaSAE3j38Gp7qfA5j1NReoLn9pMMVrXw49mOmNosNnPZebjGQ594Zx8cLWMUEMuQln7csENemOrNUNt2EqRh00iwFkn5nu"
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
            ) }
            
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;