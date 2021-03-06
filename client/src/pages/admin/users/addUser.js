import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import api from '../../../services/api'
import MenuAdmin from '../../../components/menu-admin'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Footer from '../../../components/footer-admin'

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  title: { flexGrow: 1 },
  appBarSpacer: theme.mixins.toolbar,
  content: { flexGrow: 1, height: '100vh', overflow: 'auto' },
  container: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(4) },
  paper: { padding: 35, display: 'flex', overflow: 'auto', flexDirection: 'column' },
  formControl: { width: '100%' },
  btnSuccess: { backgroundColor: 'green', color: '#fff', '&:hover': { backgroundColor: '#12b912' } },
}))

export default function Dashboard() {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')

  async function handleSubmit() {
    const data = {
      user_name: name,
      user_email: email,
      user_password: password,
      user_type: type,
    }

    if (name !== '' && email !== '' && password !== '' && type !== '') {
      const response = await api.post('/api/users', data)

      if (response.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Erro ao cadastrar o usuário!')
      }
    } else {
      alert('Por favor, preencha todos os dados!')
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/admin/users'}>
                <ArrowBackIcon /> Voltar
              </Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="user_name"
                      name="user_name"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="user_email"
                      name="user_email"
                      label="E-mail"
                      fullWidth
                      autoComplete="email"
                      variant="standard"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="user_type">Tipo</InputLabel>
                      <Select labelId="user_type" id="user_type" value={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Gerente</MenuItem>
                        <MenuItem value={3}>Redator</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="user_password"
                      name="user_password"
                      label="Senha"
                      fullWidth
                      autoComplete="password"
                      variant="standard"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} className={classes.btnSuccess}>
                      <SaveIcon /> Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}
