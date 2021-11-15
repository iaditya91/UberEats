/* eslint-disable */
/* eslint-disable react/sort-comp */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unused-state */
/* eslint-disable radix */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Card, Container, Col, Form, Row, Button
} from 'react-bootstrap';
import { ChevronsLeft, ChevronsRight, ChevronsDown } from 'react-feather';

require('./Pagination.css');

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationBracket: 4,
      hideAfter: 6,
      minPageNumber: 1
    };
    this.switchPage = this.switchPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.changeTotalResults = this.changeTotalResults.bind(this);
  }

  changeTotalResults = (e) => {
    const totalResultsToShow = parseInt(e.target.value);
    if (totalResultsToShow > 0) {
      this.props.changeTotalResults(totalResultsToShow);
    }
  }

  prevPage(e) {
    e.preventDefault();
    const current = parseInt(this.props.currentPage);
    if (this.state.minPageNumber < current) {
      this.props.changePage((current - 1));
    }
  }

  nextPage(e) {
    e.preventDefault();
    const current = parseInt(this.props.currentPage);
    const totalPages = parseInt(this.props.totalPages);
    if (current < totalPages) {
      this.props.changePage((current + 1));
    }
  }

  switchPage(e) {
    e.preventDefault();
    const pageNumber = parseInt(e.currentTarget.dataset.page);
    if (pageNumber === parseInt(this.props.currentPage)) {
      return;
    }
    this.props.changePage(pageNumber);
  }

  generatePageNumbers() {
    const pages = [];
    const TOTALPAGES = parseInt(this.props.totalPages);
    const CURRENTPAGE = parseInt(this.props.currentPage);
    let addEllipsis = false;
    for (let idx = this.state.minPageNumber; idx <= TOTALPAGES; idx++) {
      if (idx === this.state.minPageNumber || ((idx >= CURRENTPAGE - 2)
      && (idx <= CURRENTPAGE + 2)) || idx === TOTALPAGES) {
        pages.push(
          <Button emphasis="none" tag="a" className={(idx === CURRENTPAGE) ? 'active' : ''} onClick={this.switchPage} data-page={idx}>{idx}</Button>
        );
        addEllipsis = true;
      } else if (addEllipsis === true) {
        pages.push(<span>...</span>);
        addEllipsis = false;
      }
    }
    return pages;
  }

  generatePagination() {
    const pagination = [];
    if (this.props.totalPages > 0) {
      pagination.push(
        <Button onClick={this.prevPage}>
          <ChevronsLeft variant="small" />
          {/* jjj */}
        </Button>
      );
      pagination.push(this.generatePageNumbers());
      pagination.push(
        <Button onClick={this.nextPage}>
          <ChevronsRight variant="small" />
          {/* kkk */}
        </Button>
      );
    }
    return pagination;
  }

  generateDropdown = () => {
    const dropdown = [];
    for (let idx = 2; idx <= 30; idx += 2) {
      dropdown.push(
        <option value={idx}>{idx}</option>
      );
    }
    return dropdown;
  }

  render() {
    return (
      <div className="pagination-container">
        <div className="total-items">
          <span className="entries-text">Show : </span>
          <select defaultValue="5" onChange={this.changeTotalResults} className="entries-select text-size3">
            {this.generateDropdown()}
          </select>
          <div className="select-icon">
            {/* <ChevronsDown variant="small" /> */}
            <ChevronsDown />
          </div>
          <span>orders per page</span>
        </div>
        <div className="pagination text-size3">
          {this.generatePagination()}
        </div>
      </div>
    );
  }
}

// Pagination.defaultProps = {
//   totalPages: 0,
//   currentPage: 0
// };

// Pagination.PropsTypes = {
//   totalPages: PropTypes.number,
//   currentPage: PropTypes.number,
//   changeTotalResults: PropTypes.func.isRequired,
//   changePage: PropTypes.func.isRequired
// };

export default Pagination;
