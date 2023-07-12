import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Opis = props => {
  const [validBio, setValidBio] = useState(false);
  const { opis, setBio } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = opis;
    setValidBio(result);
  }, [opis]);

  return (
    <form noValidate className={classes.container}>
      <TextareaAutosize
        placeholder="Opis"
        style={{ width: 300, height: 50 }}
        onChange={e => setBio(e.target.value)}
        aria-invalid={validBio ? 'false' : 'true'}
        value={opis}
      />
    </form>
  );
};

export default Opis;
