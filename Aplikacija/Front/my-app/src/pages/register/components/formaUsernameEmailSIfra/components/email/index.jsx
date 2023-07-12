import classStyles from './styles';
import { ValidationTextField } from './styles';

const Email = props => {
  const { email, setEmail } = props;
  const classes = classStyles();

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Email"
        type="text"
        onChange={e => setEmail(e.target.value)}
        required
        variant="outlined"
        value={email}
      />
    </form>
  );
};

export default Email;
