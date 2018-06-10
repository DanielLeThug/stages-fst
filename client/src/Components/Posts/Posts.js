import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostFeed from "./PostFeed";
import { Spinner } from "../Commons";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    return (
      <div className="feed">
        <div className="container">
          {posts === null || loading ? (
            <Spinner />
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Titre</th>
                  <th scope="col">Publié le</th>
                  <th scope="col">Description</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                <PostFeed posts={posts} />
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
