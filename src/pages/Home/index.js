import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  LogoContainer,
  LogoView,
  BannerButton,
  Banner,
  SliderMovies,
} from './styles';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import {Feather} from '@expo/vector-icons';
import Logo from '../../../assets/disneyplus.png';

import api, {key} from '../../services/api';
import {getListMovies} from '../../utils/movie';

// Key API Films => 6d11267f70ded103f665c42aea108a0d

function Home() {

  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getMovies(){
      // const response = await api.get('/movie/now_playing', {
      //   params:{
      //     api_key: key,
      //     language: 'pt-BR',
      //     page: 1,
      //   }
      // })

      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
            params:{
              api_key: key,
              language: 'en',
              page: 1,
            }
        }),
        api.get('/movie/popular', {
          params:{
            api_key: key,
            language: 'en',
            page: 1,
          }
        }),
        api.get('/movie/top_rated', {
          params:{
            api_key: key,
            language: 'en',
            page: 1,
          }
        }),
      ])
      const nowList = getListMovies(10, nowData.data.results);
      const popularList = getListMovies(6, popularData.data.results);
      const topList = getListMovies(5, topData.data.results);

      setNowMovies(nowList);
      setPopularMovies(popularList);
      setTopMovies(topList);
    }

    getMovies();
  }, []);

  return(
    <Container>
      <Header/>
      <LogoContainer>
        <LogoView source={Logo}/>
      </LogoContainer>

      {/* <SearchContainer>
        <Input 
          placeholder="Buscar"
          placeholderTextColor="#DDD"
        />
        <SearchButton>
          <Feather
            name="search"
            size={30}
            color="#FFF"
          />
        </SearchButton>
      </SearchContainer> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        
        <BannerButton activeOpacity={0.9} onPress={ () => {}}>
          <Banner 
            resizeMethod="resize"
            source={{uri: 'https://disneyplusbrasil.com.br/wp-content/uploads/2021/02/Luca-Banner-1024x576.jpg'}}
          />
        </BannerButton>

        <SliderMovies 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={ ({item}) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>
        <SliderMovies 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={ ({item}) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais votados</Title>
        <SliderMovies 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={ ({item}) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

      </ScrollView>

    </Container>
  )
}

export default Home;