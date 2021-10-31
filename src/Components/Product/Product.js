import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import {Container, Image, Info, Icon, Button} from './styles'
import { Link } from "react-router-dom";


const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <h3>{`${item.title} - Rs. ${item.price}`}</h3>
      <Info>  
          <Link to={`/product/${item._id}`}>
          <Button>SHOP NOW</Button>
          </Link>   
      </Info>
    </Container>
  );
};

export default Product;