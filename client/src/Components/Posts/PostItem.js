import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../actions/postActions";
import { Link } from "react-router-dom";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <tr>
        <td>
          <Link to={"/post/" + post._id}>{post.title}</Link>
        </td>
        <td>{post.date}</td>
        <td>{post.desc}</td>
        <td>
          {showActions ? (
            <span>
              {auth.user.admin ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          ) : null}
        </td>
      </tr>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(PostItem);
