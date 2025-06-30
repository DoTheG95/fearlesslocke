import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function Header({ title }) {
  return <header className="App-header">{title}</header>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};
