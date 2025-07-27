import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaShoppingCart, FaSearch, FaFilter, FaPlus, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import StarsBackground from '../components/StarsBackground';
import Notification from '../components/Notification';

const StoreContainer = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1.5rem 2rem 2rem;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem 1rem 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StoreHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const StoreTitle = styled.h1`
  font-size: 3rem;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const StoreDescription = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchAndFilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchField = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 25px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #00ff88;
`;

const FilterButton = styled.button`
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.5);
  color: #00ff88;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(0, 255, 136, 0.3);
    transform: translateY(-2px);
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.active ? '#00ff88' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? '#00ff88' : '#fff'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(0, 255, 136, 0.2);
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 255, 136, 0.2);
    border-color: rgba(0, 255, 136, 0.3);
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.1);
  }
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.type === 'new' ? '#00ff88' : '#ff4444'};
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ProductDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

const FeatureTag = styled.span`
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 136, 0.2);
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  color: #00ff88;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #ffd700;
  font-size: 0.9rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }
`;

const ViewDetailsButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #00ff88;
    color: #00ff88;
  }
`;

// Datos de productos
const allProducts = [
  {
    id: 1,
    title: "Programación de Pagina web",
    description: "Programamos y Personalizamos tus Paginas web, para tu mejor alcance.",
    image: "/developers/diseño_1_pagina_web.jpg",
    features: ["REACT", "TAILWIND", "TREE.JS", ""],
    price: 1000,
    category: "Programacion",
    rating: 4.8,
    badge: "new"
  },
  {
    id: 2,
    title: "Administraccion de Instagram, plan basico",
    description: "Administramos, diseñamos y editamos videos, con una estrategia personalizada.",
    image: "/developers/adm_instagram.jpg",
    features: ["Diseños", "Edicion de Videos", "Estrategia", ""],
    price: 100,
    category: "Diseño",
    rating: 4.9
  },
  {
    id: 3,
    title: "Diseño de Interiores",
    description: "Diseñamos tus estructuras y el interior.",
    image: "/developers/diseño_interiores.jpg",
    features: ["Diseños", "Planos", "Render", ""],
    price: 3,
    category: "Diseño",
    rating: 4.7
  },
  {
    id: 4,
    title: "Fotos profesionales",
    description: "Fotos para tus eventos, y uso comercial por paquetes.",
    image: "/developers/fotos_pro.jpg",
    features: ["Fotos", "Comercio", "Eventos", ""],
    price: 30,
    category: "Diseño",
    rating: 4.6
  },
  {
    id: 5,
    title: "Personaliza tu evento",
    description: "Decoracion personalizada de Fiestas infantiles, Eventos corporativos y Eventos especiales.",
    image: "/developers/eventos_personalizados.jpeg",
    features: ["Decoracion", "Diseños", "Videos", ""],
    price: 3,
    category: "Diseño",
    rating: 4.8
  },
  {
    id: 6,
    title: "Logos",
    description: "Creacion de logotipo, isotipo, logo, imagotipo y mas.",
    image: "/developers/logo.jpeg",
    features: ["Diseños", "Logos", "Marca Comercial", ""],
    price: 20,
    category: "Diseño",
    rating: 4.7,
    badge: "new"
  },
  {
    id: 7,
    title: "App",
    description: "App programadas y totalmente personalizada reponsive.",
    image: "/developers/app.jpeg",
    features: ["App", "Programacion", "Diseños", ""],
    price: 1000,
    category: "Programacion",
    rating: 4.5
  },
  {
    id: 8,
    title: "Animaciones Personalizadas",
    description: "Animaciones en videos, o personalizadas para tus app, redes sociales o web.",
    image: "/developers/animacion.jpeg",
    features: ["Animaciones", "Personalizadas", "Diseños", ""],
    price: 33,
    category: "Diseño",
    rating: 4.4
  }
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'Diseño', name: 'Diseño' },
  { id: 'Programacion', name: 'Programacion' },
  { id: 'Seguridad Informatica', name: 'Seguridad Informatica' },
  { id: 'Wifi', name: 'Wifi' }
];

function Store() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const { addToCart } = useCart();

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification({
      show: true,
      message: `${product.title} agregado al carrito!`
    });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '' });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          style={{ color: i <= rating ? '#ffd700' : '#666' }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <StarsBackground>
        <StoreContainer>
          <ContentWrapper>
            <StoreHeader>
              <StoreTitle>Tienda Tecnológica</StoreTitle>
              <StoreDescription>
                Descubre nuestra amplia selección de productos tecnológicos de alta calidad.
                Desde laptops gaming hasta smartphones premium, tenemos todo lo que necesitas.
              </StoreDescription>
            </StoreHeader>

            <SearchAndFilterSection>
              <SearchInput>
                <SearchIcon>
                  <FaSearch />
                </SearchIcon>
                <SearchField
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchInput>
              <FilterButton>
                <FaFilter />
                Filtros
              </FilterButton>
            </SearchAndFilterSection>

            <CategoryFilters>
              {categories.map(category => (
                <CategoryButton
                  key={category.id}
                  active={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </CategoryButton>
              ))}
            </CategoryFilters>

            <ProductsGrid>
              {filteredProducts.map(product => (
                <ProductCard key={product.id}>
                  <ProductImage>
                    <img src={product.image} alt={product.title} />
                    {product.badge && (
                      <ProductBadge type={product.badge}>
                        {product.badge === 'new' ? 'NUEVO' : 'OFERTA'}
                      </ProductBadge>
                    )}
                  </ProductImage>
                  
                  <ProductInfo>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductDescription>{product.description}</ProductDescription>
                    
                    <ProductFeatures>
                      {product.features.slice(0, 3).map((feature, index) => (
                        <FeatureTag key={index}>{feature}</FeatureTag>
                      ))}
                    </ProductFeatures>
                    
                    <ProductRating>
                      {renderStars(product.rating)}
                      <span>({product.rating})</span>
                    </ProductRating>
                    
                    <ProductPrice>${product.price.toLocaleString()}</ProductPrice>
                    
                    <ProductActions>
                      <AddToCartButton onClick={() => handleAddToCart(product)}>
                        <FaPlus />
                        Agregar
                      </AddToCartButton>
                      <ViewDetailsButton>
                        Ver Detalles
                      </ViewDetailsButton>
                    </ProductActions>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </ContentWrapper>
        </StoreContainer>
      </StarsBackground>
      
      <Notification
        show={notification.show}
        message={notification.message}
        onClose={closeNotification}
      />
    </>
  );
}

export default Store; 