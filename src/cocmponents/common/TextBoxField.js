import PropTypes from "prop-types";


const TextBoxField = ({
    field,
    value,
    label,
    type,
    isvalid,
    onChangeHandler
}) => {
    if (isvalid) {
        return (
            <div className="col-md-12">
                <label htmlFor={field} className="form-label">{label}</label>
                <input type={type}
                    className="form-control is-valid"
                    id={field}
                    name={field}
                    value={value}
                    onChange={onChangeHandler}
                />
            </div>
        );
    }
    else {
        return (
            <div className="col-md-12">
                <label htmlFor={field} className="form-label">{label}</label>
                <input type={type}
                    className="form-control is-invalid"
                    id={field}
                    name={field}
                    value={value}
                    onChange={onChangeHandler}
                />
            </div>
        );
    }

}

TextBoxField.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isvalid: PropTypes.bool.isRequired,
    onChangeHandler: PropTypes.func.isRequired
  };


TextBoxField.defaultProps ={
    type: "text"
}

export default TextBoxField;