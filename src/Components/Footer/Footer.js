import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@material-ui/icons";
import {Container, Left, Logo, Desc, SocialIcon, SocialContainer, Center, Title, List, ListItem, Right, ContactItem, Payment} from './styles'

const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>Book Store</Logo>
          <Desc>
          Lorem ipsum dolor sit amet, mea at audiam suavitate pertinacia. An eius accommodare eam. Legere quaeque nonumes mel ei, suas efficiendi ei eum. Unum nullam nam cu, sit ei apeirian antiopam intellegam. 
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> Delhi Gurugram
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> contact@test.com
          </ContactItem>
        </Right>
      </Container>
    );
  };
  
  export default Footer;