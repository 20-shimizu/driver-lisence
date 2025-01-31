import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import './UserRegistration.css';

export default function UserRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, emailConfirm, birthDate, password });
    alert("\E7\99\BB\E9\8C\B2\E3\83\9C\E3\82\BF\E3\83\B3\E3\81\8C\E3\82\AF\E3\83\AA\E3\83\83\E3\82\AF\E3\81\95\E3\82\8C\E3\81\BE\E3\81\97\E3\81\9F\EF\BC\81");
  };

  return (
    <div className="registration-container">
      <Card className="registration-card">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            \E3\83\A6\E3\83\BC\E3\82\B6\E3\83\BC\E7\99\BB\E9\8C\B2
          </Typography>
          <form onSubmit={handleSubmit} className="registration-form">
            <TextField
              id="name"
              label="\E5\90\8D\E5\89\8D"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="email"
              label="\E3\83\A1\E3\83\BC\E3\83\AB\E3\82\A2\E3\83\89\E3\83\AC\E3\82\B9"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="emailConfirm"
              label="\E3\83\A1\E3\83\BC\E3\83\AB\E3\82\A2\E3\83\89\E3\83\AC\E3\82\B9\EF\BC\88\E7\A2\BA\E8\AA\8D\EF\BC\89"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              required
            />
            <TextField
              id="birthDate"
              label="\E7\94\9F\E5\B9\B4\E6\9C\88\E6\97\A5"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
            <TextField
              id="password"
              label="\E3\83\91\E3\82\B9\E3\83\AF\E3\83\BC\E3\83\89"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              \E7\99\BB\E9\8C\B2
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
