import React, { Component } from "react";
import axios from "axios";
import applyPagination from "react-jsonschema-form-pagination";
import Form from "react-jsonschema-form";
import CustomNavs from "./CustomNavs";
import PropTypes from "prop-types";
import { Toasts } from "../Toasts";
import { connect } from "react-redux";
import { addToast } from "../../actions/toastActions";
import { bindActionCreators } from "redux";

let FormWithPagination = applyPagination(Form, CustomNavs);

class CompanyDetails extends Component {
  componentDidMount() {
    axios.get("/api/getForm").then(res => {
      const schema = res.data.JSONSchema;
      const uiSchema = res.data.UISchema;
      this.setState({ schema, uiSchema });
    });
    // recuperation de l'id qui proviens de l'url
    const {
      match: { params }
    } = this.props;
    const formData = {
      id: params.id
    };
    axios.post("/api/getFormData", formData).then(res => {
      const formData = res.data.formData;
      this.setState({ formData });
    });
  }

  onSave = () => {
    const {
      match: { params }
    } = this.props;
    const formData = {
      id: params.id,
      formData: this.state.formData
    };

    axios.post("/api/saveFormData", formData).then(res => {
      this.props.actions.addToast({
        text: res.data.message,
        color: res.data.color
      });
    });
  };

  onFormDataChange = ({ formData }) => this.setState({ formData });

  render() {
    return (
      <div className="container">
        {this.state &&
          this.state.schema && (
            <FormWithPagination
              schema={this.state.schema}
              uiSchema={this.state.uiSchema}
              formData={this.state.formData}
              onChange={this.onFormDataChange}
            >
              <div className="row">
                <div className="col-lg-4 mt-2" />
                <div className="col-lg-4 mt-2">
                  <input
                    type="button"
                    className="btn btn-info btn-block"
                    value="Enregistrer le formulaire"
                    onClick={this.onSave}
                  />
                </div>
              </div>
            </FormWithPagination>
          )}
        <Toasts />
      </div>
    );
  }
}

CompanyDetails.propTypes = {
  actions: PropTypes.shape({
    addToast: PropTypes.func.isRequired
  }).isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addToast }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(CompanyDetails);
