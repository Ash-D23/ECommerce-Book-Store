import {Container, Image, Info, Button,Title } from './styles';
import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
    return (
      <Container>
        <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
        </Link>
      </Container>
    );
  };
  
  export default CategoryItem;