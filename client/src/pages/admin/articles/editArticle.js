import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SaveIcon from '@material-ui/icons/Save'
import api from '../../../services/api'
import MenuAdmin from '../../../components/menu-admin'
import { useParams } from 'react-router-dom'
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

export default function EditArticle() {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [publishDate, setPublishDate] = useState('')

  const { idArticle } = useParams()

  useEffect(() => {
    async function getArticle() {
      var response = await api.get('/api/articles/details/' + idArticle)

      setTitle(response.data.title)
      setContent(response.data.content)
      setPublishDate(response.data.publishDate)
    }
    getArticle()
  }, [idArticle])

  async function handleSubmit() {
    const data = {
      title: title,
      content: content,
      publishDate: publishDate,
      _id: idArticle,
    }

    if (title !== '' && content !== '' && publishDate !== '') {
      const response = await api.put('/api/articles/:_id', data)

      if (response.status === 200) {
        window.location.href = '/admin/articles'
      } else {
        alert('Erro ao Atualizar a not??cia!')
      }
    } else {
      alert('Por favor, preencha todos os dados!')
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'NOT??CIAS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/admin/articles'}>
                <ArrowBackIcon /> Voltar
              </Button>
              <Button style={{ marginBottom: 10 }} variant="contained" color="primary" href={'/admin/articles/cadastrar'}>
                <AddIcon />
                Cadastrar
              </Button>
              <Paper className={classes.paper}>
                <h2>Atualiza????o de Not??cia</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="title"
                      name="title"
                      label="T??tulo"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="content"
                      name="content"
                      label="Conte??do"
                      fullWidth
                      autoComplete="content"
                      variant="standard"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="date"
                      required
                      id="content"
                      name="content"
                      fullWidth
                      autoComplete="content"
                      variant="standard"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
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
