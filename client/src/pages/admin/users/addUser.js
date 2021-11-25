import React from 'react'
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

import MenuAdmin from '../../../components/menu-admin'
// import { getTipoUsuario } from '../../../services/auth'

import Footer from '../../../components/footer-admin'

// import DashFuncionario from './funcionario'
// import DashGerente from './gerente'
// import DashAdmin from './admin'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: { width: '100%' },
}))

// function getDashboard() {
//   if (getTipoUsuario() === '1') {
//     return <DashAdmin />
//   } else if (getTipoUsuario() === '2') {
//     return <DashGerente />
//   } else {
//     return <DashFuncionario />
//   }
// }
export default function Dashboard() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="user_type">Tipo</InputLabel>
                      <Select
                        labelId="user_type"
                        id="user_type"
                        // value={user_type}
                        // onChange={(e) => setTipo(e.target.value)}
                      >
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
                    />
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
