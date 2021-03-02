import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieAPI, tvAPI } from "api";

export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false
    };

    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
    };

    searchByTerm = async() => {
        const { searchTerm } = this.state;
        this.setState({loading: true});
        try {
            const {data: {results: movieResults}} = await movieAPI.search(searchTerm);
            const {data: {results: tvResults}} = await tvAPI.search(searchTerm);
            this.setState({
                movieResults,
                tvResults,
            });
        } catch {
            this.setState({error: "Can't find results."});
        } finally {
            this.setState({loading: false});
        }
    };

    updateTerm = event => {
        const { target: {value} } = event;
        this.setState({
            searchTerm: value
        });
    }

    render() {
        const { movieResults, tvResults, searchTerm, error, loading } = this.state;
        return (
            <SearchPresenter 
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                error={error}
                loading={loading}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}