import classStyles from './styles';
import { ValidationTextField } from './styles';

export const NUMBER_REGEX = /^\d+$/;

const PhoneNumber = props => {
  const { brTelefona, setBrojTelefona } = props;
  const classes = classStyles();

  const postaviBrojTelefona = ev => {
    const brTel = ev.target.value;
    const valid = NUMBER_REGEX.test(brTel);
    if (valid) setBrojTelefona(brTel);
  };

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        type="text"
        label="Broj telefona"
        id="validation-outlined-input"
        autoComplete="off"
        onChange={postaviBrojTelefona}
        required
        variant="outlined"
        value={brTelefona}
      />
    </form>
  );
};

export default PhoneNumber;
