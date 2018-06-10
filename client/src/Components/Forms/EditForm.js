import React, { Component } from "react";
import axios from "axios";
import applyPagination from "react-jsonschema-form-pagination";
import Form from "react-jsonschema-form";
import CustomNavs from "./CustomNavs";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import { Toasts } from "../Toasts";

import { shouldRender } from "../../utils/shouldRender";

import "codemirror/lib/codemirror.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToast } from "../../actions/toastActions";
import { bindActionCreators } from "redux";

const fromJson = json => JSON.parse(json);
const toJson = val => JSON.stringify(val, null, 2);
const cmOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2
};

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ valid: true, code: props.code });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onCodeChange = (editor, metadata, code) => {
    this.setState({ valid: true, code });
    setImmediate(() => {
      try {
        this.props.onChange(fromJson(this.state.code));
      } catch (err) {
        this.setState({ valid: false, code });
      }
    });
  };

  render() {
    const { title, theme } = this.props;
    const icon = this.state.valid ? "check" : "times";
    const cls = this.state.valid ? "valid" : "invalid";
    return (
      <div className="card">
        <div className="card-header">
          <span className={`${cls} fas fa-${icon}`} />
          {" " + title}
        </div>
        <CodeMirror
          value={this.state.code}
          onChange={this.onCodeChange}
          autoCursor={false}
          options={Object.assign({}, cmOptions, { theme })}
        />
      </div>
    );
  }
}

let FormWithPagination = applyPagination(Form, CustomNavs);

class EditForm extends Component {
  constructor(props) {
    super(props);

    const { schema, uiSchema } = {};
    this.state = {
      schema,
      uiSchema
    };
  }

  componentDidMount() {
    axios.get("/api/getForm").then(res => {
      const schema = res.data.JSONSchema;
      const uiSchema = res.data.UISchema;
      this.setState({ schema, uiSchema });
    });
  }

  onSchemaEdited = schema => this.setState({ schema });

  onUISchemaEdited = uiSchema => this.setState({ uiSchema });

  onSubmit = () => {
    const formData = {
      JSONSchema: this.state.schema,
      UISchema: this.state.uiSchema
    };

    axios.post("/api/editForm", formData).then(() => {
      this.props.actions.addToast({
        text: "Formulaire enregistré",
        color: "#007bff"
      });
    });
  };

  render() {
    const { schema, uiSchema } = this.state;

    return (
      <div className="container-fluid">
        <div className="col-sm-6 float-left">
          <div className="col-sm-12 mb-4">
            <Editor
              title="JSONSchema"
              theme="default"
              code={toJson(schema)}
              onChange={this.onSchemaEdited}
            />
          </div>
          <div className="col-sm-12">
            <Editor
              title="UISchema"
              theme="default"
              code={toJson(uiSchema)}
              onChange={this.onUISchemaEdited}
            />
          </div>
        </div>
        <div className="col-sm-6 float-left">
          {this.state &&
            this.state.schema && (
              <FormWithPagination
                schema={this.state.schema}
                uiSchema={this.state.uiSchema}
                noHtml5Validate={true}
                noValidate={true}
                onSubmit={this.onSubmit}
              >
                <input
                  type="submit"
                  className="btn btn-info"
                  value="Enregistrer le formulaire"
                />
              </FormWithPagination>
            )}
        </div>
        <Toasts />
      </div>
    );
  }
}

EditForm.propTypes = {
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
)(EditForm);
