import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import api from '../../../services/api'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddIcon from '@material-ui/icons/Add'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import ClearIcon from '@material-ui/icons/Clear'
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin'

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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}))

export default function UsersList() {
  const classes = useStyles()

  const [articles, setArticles] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/api/articles')
      setArticles(response.data)
      setLoading(false)
    }
    loadUsers()
  }, [])

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esta notícia?')) {
      var result = await api.delete('/api/articles/' + id)
      if (result.status === 200) {
        window.location.href = '/admin/articles'
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }
    }
  }

  const data = new Date();
  const  dataFormatada = ("0" + data.getDate()).substr(-2) + "/"
    + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();

  return (
    <div className={classes.root}>
      <MenuAdmin title={'LISTA DE USUÁRIOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{ marginBottom: 10 }} variant="contained" color="primary" href={'/admin/users/cadastrar'}>
                <AddIcon />
                Cadastrar
              </Button>
              <Paper className={classes.paper}>
                <h2>Lista de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {loading ? (
                        <LinearProgress style={{ width: '50%', margin: '20px auto' }} />
                      ) : (
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Tipo</TableCell>
                              <TableCell align="center">Data de Cadastro</TableCell>
                              <TableCell align="right">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {articles.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.title}
                                </TableCell>
                                <TableCell align="center">{row.content}</TableCell>

                                <TableCell align="center">{dataFormatada}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined primary button group">
                                    <Button variant="contained" color="primary" href={'/admin/articles/editar/' + row._id}>
                                      <AutorenewIcon /> Atualizar
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(row._id)}>
                                      <ClearIcon />
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </TableContainer>
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
