import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import api from '../../../services/api'
import MenuAdmin from '../../../components/menu-admin'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Footer from '../../../components/footer-admin'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider,  KeyboardDatePicker } from '@material-ui/pickers'

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

export default function AddArticle() {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [publishDate, setPublishDate] = useState(new Date('2021-11-22T01:01:01'))

  async function handleSubmit() {
    const data = {
      title: title,
      content: content,
      publishDate: publishDate,
    }

    if (title !== '' && content !== '' && publishDate !== '') {
      const response = await api.post('/api/articles', data)

      if (response.status === 200) {
        window.location.href = '/admin/articles'
      } else {
        alert('Erro ao cadastrar a notícia!!')
      }
    } else {
      alert('Por favor, preencha todos os dados!')
    }
  }
  const handleDateChange = (date) => {
    setPublishDate(date)
  }


  return (
    <div className={classes.root}>
      <MenuAdmin title={'NOTÍCIAS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/admin/articles'}>
                <ArrowBackIcon /> Voltar
              </Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Notícias</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="title"
                      name="title"
                      label="Título"
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
                      label="Conteúdo"
                      fullWidth
                      autoComplete="content"
                      variant="standard"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={publishDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
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
