import Card, { CardProps } from "react-bootstrap/Card";
import LazyLoad from "react-lazyload";

export type Pub = {
  id: number;
  name: string;
  category: string;
  url: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  twitter: string;
  starsBeer: number;
  starsAtmosphere: number;
  starsAmenities: number;
  starsValue: number;
  tags: string;
};

export interface PubCardProps extends CardProps {
  pub: Pub;
}

const PubCard: React.FC<PubCardProps> = ({ pub, ...props }) => {
  return (
    <Card {...props}>
      <LazyLoad height={200} scroll resize once>
        <Card.Img
          variant="top"
          src={pub.thumbnail}
          style={{ height: 200, objectFit: "cover" }}
          alt={pub.name}
        />
      </LazyLoad>
      <Card.Body>
        <Card.Title>{pub.name}</Card.Title>
        <Card.Text>{pub.excerpt}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PubCard;
