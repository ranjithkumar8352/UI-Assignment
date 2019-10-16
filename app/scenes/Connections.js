import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/AntDesign';

export default class Connections extends Component {
  state = {
    searchText: '',
    probableConnections: [
      {
        id: 1,
        name: 'Eliza',
        country: 'Ireland',
        photo: 'https://randomuser.me/api/portraits/women/96.jpg',
      },
      {
        id: 2,
        name: 'Brooklyn',
        country: 'New Zealand',
        photo: 'https://randomuser.me/api/portraits/women/20.jpg',
      },
      {
        id: 3,
        name: 'Seifert',
        country: 'Germany',
        photo: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      {
        id: 4,
        name: 'Caitlin',
        country: 'United Kingdom',
        photo: 'https://randomuser.me/api/portraits/women/20.jpg',
      },
      {
        id: 5,
        name: 'Christian',
        country: 'Denmark',
        photo: 'https://randomuser.me/api/portraits/women/88.jpg',
      },
    ],
    existingConnections: [
      {
        id: 6,
        name: 'Vittorio',
        country: 'Germany',
        photo: 'https://randomuser.me/api/portraits/women/52.jpg',
      },
    ],
    searchResults: [],
  };
  render() {
    const { existingConnections, searchText, searchResults } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TextInput
            value={searchText}
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={this.onChangeText}
          />
          <TouchableOpacity
            style={styles.addButton}
            hitSlop={{
              top: 15,
              left: 15,
              right: 15,
              bottom: 15,
            }}>
            <Icon name="adduser" size={16} color="#00b894" />
          </TouchableOpacity>
          <View style={styles.resultsContainer}>
            {this.renderSearchResults(searchResults)}
          </View>
        </View>
        <View style={styles.content}>
          <FlatList
            data={existingConnections}
            renderItem={({ item }) => this.renderConnection(item)}
            keyExtractor={connection => connection.id}
          />
        </View>
      </View>
    );
  }

  onChangeText = val => {
    this.setState({ searchText: val });
    this.filterResults(val);
  };

  filterResults = val => {
    if (val) {
      const results = this.state.probableConnections.filter(
        conn =>
          conn.name.substr(0, val.length).toUpperCase() === val.toUpperCase(),
      );
      this.setState({ searchResults: results });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  renderConnection = connection => (
    <View style={styles.connectionContainer}>
      <Image style={styles.avatar} source={{ uri: connection.photo }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{connection.name}</Text>
        <Text style={styles.country}>{connection.country}</Text>
      </View>
    </View>
  );
  renderSearchResults = results =>
    results.map(result => (
      <TouchableOpacity>{this.renderConnection(result)}</TouchableOpacity>
    ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    height: 55,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#E5E5E5',
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
  },
  connectionContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailsContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    color: '#2d3436',
  },
  country: {
    fontSize: 11,
    color: '#636e72',
  },
  addButton: {
    marginLeft: 10,
  },
  resultsContainer: {
    backgroundColor: 'white',
    elevation: 3,
    zIndex: 10,
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    marginHorizontal: 15,
  },
});
