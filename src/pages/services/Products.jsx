import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaShoppingCart, FaStar, FaSearch, FaFilter } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import Notification from '../../components/Notification';

const ProductsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 2rem 3rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(0, 255, 136, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #ccc;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 100%;
  }
`;

const SearchAndFilterSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.2rem 1.2rem 3.5rem;
  border-radius: 30px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
    background: rgba(255, 255, 255, 0.12);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem 1rem 3rem;
    font-size: 1rem;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #00ff88;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    left: 1rem;
    font-size: 1.1rem;
  }
`;

const FilterButton = styled.button`
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 0.95rem;
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-bottom: 2rem;
  }
`;

const CategoryButton = styled.button`
  background: ${props => props.active 
    ? 'linear-gradient(45deg, #00b8ff, #00ff88)' 
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: 1px solid ${props => props.active 
    ? 'transparent' 
    : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(45deg, #00ff88, #00b8ff)' 
      : 'rgba(255, 255, 255, 0.15)'};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 255, 136, 0.2);
    border-color: rgba(0, 255, 136, 0.4);
  }

  @media (max-width: 768px) {
    border-radius: 15px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProductInfo = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProductName = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`;

const ProductDescription = styled.p`
  color: #ccc;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  font-size: 1rem;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #00ff88;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.2rem;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#ffd700' : '#444'};
  font-size: 1.1rem;
  text-shadow: ${props => props.filled ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'};
`;

const RatingText = styled.span`
  color: #ccc;
  font-size: 0.95rem;
  font-weight: 500;
`;

const CategoryTag = styled.span`
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 255, 136, 0.3);
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    margin-bottom: 1.2rem;
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  border: none;
  padding: 1.2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    background: rgba(255, 255, 255, 0.2);
    color: #ccc;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #ccc;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.8;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Datos de productos
const productsData = [
  {
    id: 1,
    name: "Laptop Gaming Pro",
    description: "Laptop de alto rendimiento para gaming y trabajo profesional con gráficos dedicados y procesador de última generación",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    category: "Electrónicos",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: "Smartphone Ultra",
    description: "Teléfono inteligente con cámara profesional de 108MP, batería de larga duración y pantalla AMOLED de 120Hz",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    category: "Electrónicos",
    rating: 4.6,
    reviews: 203
  },
  {
    id: 3,
    name: "Auriculares Wireless",
    description: "Auriculares bluetooth con cancelación de ruido activa, sonido Hi-Fi y hasta 30 horas de batería",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Audio",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 4,
    name: "Tablet Pro",
    description: "Tablet profesional para creativos y profesionales con lápiz digital y pantalla de alta resolución",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    category: "Electrónicos",
    rating: 4.5,
    reviews: 127
  },
  {
    id: 5,
    name: "Smartwatch Elite",
    description: "Reloj inteligente con monitor de salud avanzado, GPS integrado y resistencia al agua",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Wearables",
    rating: 4.4,
    reviews: 94
  },
  {
    id: 6,
    name: "Cámara DSLR",
    description: "Cámara réflex digital profesional para fotografía con sensor full-frame y 4K video",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    category: "Fotografía",
    rating: 4.9,
    reviews: 67
  }
];

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { addItem, isInCart } = useCart();

  const categories = ['Todos', ...new Set(productsData.map(product => product.category))];

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addItem(product, 1);
    setNotificationMessage(`${product.name} agregado al carrito`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>
          <FaStar />
        </Star>
      );
    }
    return stars;
  };

  return (
    <ProductsContainer>
      <Header>
        <Title>Nuestros Productos</Title>
        <Subtitle>
          Descubre nuestra selección de productos tecnológicos de alta calidad, diseñados para satisfacer todas tus necesidades digitales
        </Subtitle>
      </Header>

      <SearchAndFilterSection>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <FilterButton onClick={() => setSelectedCategory('Todos')}>
          <FaFilter />
          Filtrar por Categoría
        </FilterButton>
      </SearchAndFilterSection>

      <CategoryFilters>
        {categories.map(category => (
          <CategoryButton
            key={category}
            onClick={() => setSelectedCategory(category)}
            active={selectedCategory === category}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilters>

      <ProductsGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <CategoryTag>{product.category}</CategoryTag>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              
              <RatingContainer>
                <Stars>
                  {renderStars(product.rating)}
                </Stars>
                <RatingText>({product.reviews} reseñas)</RatingText>
              </RatingContainer>
              
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              
              <AddToCartButton
                onClick={() => handleAddToCart(product)}
                disabled={isInCart(product.id)}
              >
                <FaShoppingCart />
                {isInCart(product.id) ? 'En el Carrito' : 'Agregar al Carrito'}
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>

      {filteredProducts.length === 0 && (
        <EmptyState>
          <EmptyStateTitle>No se encontraron productos</EmptyStateTitle>
          <EmptyStateText>Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas</EmptyStateText>
        </EmptyState>
      )}

      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </ProductsContainer>
  );
}

export default Products; 