import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, content STRING)`).run()

export const getNotes = () => db.prepare(`SELECT * FROM notes`).all()
export const getNote = (id) => db.prepare(`SELECT * FROM notes WHERE id = ?`).get(id)
export const saveNote = (title, content) => db.prepare(`INSERT INTO notes (title, content) VALUES (?, ?)`).run(title, content)
export const deleteNote = (id) => db.prepare(`DELETE FROM notes WHERE id = ?`).run(id)

const notes = [
    {title: 'elso jegyzet', content: 'ez az elso jegyzet'},
    {title: 'masodik jegyzet', content: 'ez a masodik jegyzet'},
    {title: 'harmadik jegyzet', content: 'ez a harmadik jegyzet'},
    {title: 'negyedik jegyzet', content: 'ez a negyedik jegyzet'}
]
//for (const note of notes) saveNote(note.title, note.content);