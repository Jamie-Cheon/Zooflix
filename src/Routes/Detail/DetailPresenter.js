import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImg});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${props => props.bgImg});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    height: 100%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const DetailPresenter = ({result, error, loading }) => (
    loading ? (<Loader />) : 
    (
        <Container>
            <Helmet>
                <title>{result.original_title ? result.original_title : result.original_name} | Zooflix</title>
            </Helmet>
            <Backdrop bgImg={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
            <Content>
                <Cover bgImg={result.poster_path ? 
                `https://image.tmdb.org/t/p/original${result.poster_path}` 
                : "https://images.unsplash.com/photo-1532630571098-79a3d222b00d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1138&q=80"
                } />
            <Data>
                <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                <ItemContainer>
                    <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                    <Divider>•</Divider>
                    <Item>{result.runtime ? result.runtime : result.episode_run_time[0]} min</Item>
                    <Divider>•</Divider>
                    <Item>{result.genres && 
                        result.genres.map((genre, index) => index === result.genres.length - 1 ? genre.name : `${genre.name} / `)}
                    </Item>
                </ItemContainer>
                <Overview>{result.overview}</Overview>
            </Data>
            </Content>
        </Container>
    )
);

DetailPresenter.propTypes = {
    result: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default DetailPresenter;