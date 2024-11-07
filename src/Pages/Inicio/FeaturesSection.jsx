// src/components/FeaturesSection.js
import styled from 'styled-components';
import FeatureCard from './FeatureCard';
import { useGlobalContext } from '../../context/GlobalContext';
import Titulo from '../Galeria/Titulo';


// Sección principal con alineación centrada y separación
const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 150px 0; // Espaciado vertical
  display: flex;
  flex-direction: column; // Dirección de los elementos en columna
  align-items: center; // Centrado horizontal
  justify-content: center; // Centrado vertical
  gap: 50px; // Espacio entre elementos
`;

// Contenedor de características con alineación y separación central
const FeaturesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; // Centrado horizontal
  flex-direction: column; // Elementos en columna
  align-items: center; // Centrado vertical
  gap: 50px; // Espacio entre elementos
`;


function FeaturesSection() {
  const { noticias, imagesGaleria, sistemaSolar } = useGlobalContext();

  // Registra todo el sistemaSolar para verificar su estructura
  console.log('Sistema Solar:', sistemaSolar);

  // Asegúrate de que los datos sean definidos antes de usarlos
  const planetas = sistemaSolar?.planetas || [];
  const asteroides = sistemaSolar?.asteroides || [];
  const cometas = sistemaSolar?.cometas || [];
  const lunas = sistemaSolar?.lunas || [];
  const estrellas = sistemaSolar?.estrellas || [];

  // Registra los arreglos individuales para inspeccionar su contenido
  console.log('Planetas:', planetas);
  console.log('Asteroides:', asteroides);
  console.log('Cometas:', cometas);
  console.log('Lunas:', lunas);
  console.log('Estrellas:', estrellas);

  return (
    <Section id="caracteristicas">
      <Titulo titulo="Explora el Universo"/>
      <FeaturesContainer>
        <FeatureCard
          titulo={'Galería Espacial'}
          descripcion={'Descubre la belleza del universo a través de una colección curada de imágenes impresionantes, desde nebulosas brillantes hasta galaxias lejanas.'}
          images={imagesGaleria}
        />
        <FeatureCard
          titulo={'Noticias'}
          descripcion={'Mantente al día con los últimos descubrimientos espaciales, avances científicos y misiones de exploración que están ampliando nuestros horizontes cósmicos.'}
          images={noticias}
        />
        <FeatureCard
          titulo={'Sistema Solar'}
          descripcion={'Explora los últimos descubrimientos y avances en nuestro vecindario cósmico. Aprende sobre los planetas, lunas, y otros cuerpos celestes que conforman el sistema solar, junto con las misiones espaciales que los estudian.'}
          images={planetas}
        />
      </FeaturesContainer>
    </Section>
  );
}

export default FeaturesSection;