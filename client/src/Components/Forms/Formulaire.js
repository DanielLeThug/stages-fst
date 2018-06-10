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

class Formulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  componentDidMount() {
    axios.get("/api/getForm").then(res => {
      const schema = res.data.JSONSchema;
      const uiSchema = res.data.UISchema;
      this.setState({ schema, uiSchema });
    });

    const formData = {
      id: this.props.auth.user.id
    };
    axios.post("/api/getFormData", formData).then(res => {
      const formData = res.data.formData;
      this.setState({ formData });
    });
  }

  onMailChange = event => {
    this.setState({ email: event.target.value });
  };

  onSave = () => {
    if (this.state.checked && this.state.email) {
      let url =
        window.location.href.substring(
          0,
          window.location.href.lastIndexOf("/")
        ) +
        "/company-details/" +
        this.props.auth.user.id;

      axios
        .post("/api/send-email", {
          to: this.state.email,
          text: `Veuillez cliquer sur le lien suivant pour compléter la convention de stage avec l'UHA : ${url}`
        })
        .then(res => {
          this.props.actions.addToast({
            text: res.data.message,
            color: res.data.color
          });
        });
    }

    const formData = {
      id: this.props.auth.user.id,
      formData: this.state.formData
    };

    axios.post("/api/saveFormData", formData).then(res => {
      this.props.actions.addToast({
        text: res.data.message,
        color: res.data.color
      });
    });
  };

  onCheck = event => {
    this.setState({ checked: event.target.checked });
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
                <div className="col-lg-4 mt-2">
                  <input
                    type="submit"
                    className="btn btn-success btn-block"
                    value="Envoyer le formulaire à la FST"
                  />
                </div>
                <div className="col-lg-4 mt-2">
                  <input
                    type="button"
                    className="btn btn-info btn-block"
                    value="Enregistrer le formulaire"
                    onClick={this.onSave}
                  />
                  <small className="form-text text-muted">
                    L'enregistrement vous permettra de revenir ultérieurement à
                    la saisie du formulaire par le biais d'un lien URL.
                  </small>
                </div>
                <div className="col-lg-4 mt-2">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      defaultChecked={this.state.checked}
                      onChange={this.onCheck}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Recevoir le lien URL par mail?
                    </label>
                  </div>
                  <input
                    name="saveMail"
                    className="form-control mt-3"
                    type="email"
                    placeholder="Adresse mail"
                    value={this.state.email}
                    onChange={this.onMailChange}
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

Formulaire.propTypes = {
  auth: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    addToast: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addToast }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Formulaire);
