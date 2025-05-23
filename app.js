import express from 'express'
import * as db from './util/database.js'
const PORT = 8080
const app = express()
app.use(express.json())

app.listen(PORT, () =>{
    console.log(`serever running on port ${PORT}`)
})

app.get('/notes', (req,res)=>{
    try{
    const notes = db.getNotes()
    res.status(200).json(notes)
    } catch (err){
        res.status(500).json({message: `${err}`})
    }
})

app.get('/notes/:id', (req,res) =>{
    try{
        const note = db.getNote(req.params.id)
        if (!note){
            res.status(404).json({message: 'jegyzet nem talalhato'})
        }
        res.status(200).json(note)
        } catch (err){
            res.status(404).json({message: `${err}`})
        }
})

app.post('/notes', (req, res) =>{
    try{
        const {title, content} = req.body
        if (!title || !content){
            return res.status(400).json({message: 'nem megfelelo adatok'})
        }
        const savedNote = db.saveNote(title, content)
        if (savedNote.changes != 1){
            return res.status(501).json({message: 'mentes hiba'})
        }
        res.status(201).json(savedNote.lastInsertRowid, title, content)
        } catch (err){
            res.status(500).json({message: `${err}`})
        }
})

app.delete('/notes/:id', async (req, res) => {
    try{
        const deletedNote = db.deleteNote(req.params.id)
        if (deletedNote.changes !=1){
            return res.status(501).json({message: 'jegyzet torles hiba'})
        }
        res.status(204).json()
    } catch (err){
        res.status(404).json({message: `${err}`})
    }
});