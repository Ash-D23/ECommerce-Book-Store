import React from 'react';
import { Container,Wrapper,Language,Left,Logo,SearchContainer,Input,Center,Right,MenuItem } from './styles';
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {logout} from "../../redux/userRedux"
import { emptycart } from '../../redux/cartRedux';

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handlelogout = () => {
      localStorage.removeItem('persist:root');
      dispatch(logout())
      dispatch(emptycart())
    }

    return (
      <Container>
        <Wrapper>
          <Left>
            <Logo><Link className="link" to="/" >Book Store </Link></Logo>
          </Left>
         
          <Right>
            {
              user ? (<Link className="link" onClick={handlelogout} to="/"><MenuItem>Logout</MenuItem></Link>) : (
                <>
                <Link className="link" to="/register"><MenuItem>REGISTER</MenuItem></Link>
                <Link className="link" to="/login"><MenuItem>SIGN IN</MenuItem></Link>
                </>
              )
            }
            
            <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    );
  };
  
  export default Navbar;
