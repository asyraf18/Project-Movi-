import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';

@connect(
  state => ({
    movies: state.movies,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_MOVIE_DATA'}),
  }),
)
export default class Movies extends Component {

  state = {
    popupIsOpen: false,
    // Day chosen by user
    chosenDay: 0,       // choose first day by default
    // Time chosen by user
    chosenTime: null,
  }

  openMovie = (movie) => {
    this.setState({
      popupIsOpen: true,
      movie,
    });
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
      chosenDay: 0,
      chosenTime: null,
    });
  }

  chooseDay = (day) => {
    this.setState({
      chosenDay: day,
    });
  }

  chooseTime = (time) => {
    this.setState({
      chosenTime: time,
    });
  }

  bookTicket = () => {
    if (!this.state.chosenTime) {
      alert('Please select show time');
    } else {
      this.closeMovie();
      
      this.props.navigator.push({
        screen: 'Movies.Confirmation',
        title: 'Confirmation',
        passProps :{
          code: Math.random().toString(36).substring(6).toUpperCase()
        }
       
      });
    }
  }

  render() {
    const { movies, loading, refresh } = this.props;
    return (
      <View style={styles.container}>
        {movies
          ? <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={refresh}
                />
              }
            >
              {movies.map((movie, index) => <MoviePoster
                movie={movie}
                onOpen={this.openMovie}
                key={index}
              />)}
            </ScrollView>
          : <ActivityIndicator
              animating={loading}
              style={styles.loader}
              size="large"
            />
        }
        <MoviePopup
          movie={this.state.movie}
          isOpen={this.state.popupIsOpen}
          onClose={this.closeMovie}
          chosenDay={this.state.chosenDay}
          chosenTime={this.state.chosenTime}
          onChooseDay={this.chooseDay}
          onChooseTime={this.chooseTime}
          onBook={this.bookTicket}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                
    paddingTop: 20,        
  },
  loader: {
    flex: 1,
    alignItems: 'center',    
    justifyContent: 'center',
  },
  scrollContent: {
    flexDirection: 'row',  
    flexWrap: 'wrap',       
  },
});