import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import FileDownload from "js-file-download";
import { Spinner } from "../Commons";
import { getPost } from "../../actions/postActions";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  onDownload = event => {
    let filename = event.target.value;

    axios
      .request({
        responseType: "arraybuffer",
        url: "/attachments/" + filename,
        method: "get"
      })
      .then(res => {
        console.log(res);
        FileDownload(res.data, filename, res.headers["content-type"]);
      });
  };

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div className="card card-body mb-3">
          <h1 className="display-6 text-center">{post.title}</h1>
          <div className="white-space">{post.text}</div>
          {post.attachments
            ? post.attachments.map((attach, i) => (
                <button
                  className="btn btn-link mt-3"
                  key={i}
                  onClick={this.onDownload}
                  value={attach}
                >
                  {attach}
                </button>
              ))
            : null}
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Retour aux offres de stages
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
