import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import cuid from 'cuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({ notes, folders });
            })
            .catch(error => {
                console.error({ error });
            });
    }

    addFolder = (folderName) => {
        const folderId = cuid();


        const body = JSON.stringify({
            id: folderId,
            name: folderName
        });

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body,
        };

        fetch(`${config.API_ENDPOINT}/folders`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    folders: [...this.state.folders, data]
                }, console.log(`STATE: ${this.state.folders}`))
            })
            .catch(error => {
                console.log(error);
            });
    }

    addNote = (title, content, folderId) => {

        const dateObj = new Date();

        const noteId = cuid();
        const body = JSON.stringify({
            id: noteId,
            name: title,
            modified: dateObj,
            folderId,
            content,
        });

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body,
        };

        fetch(`${config.API_ENDPOINT}/notes`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json();
            })
            .then(data => {
                console.log(this.state.notes);
                this.setState({
                    notes: [...this.state.notes, data]
                })
            })
            .catch(error => {
                console.log(error);
            });


    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote
        };
        return (

            <ApiContext.Provider value={value}>

                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>

            </ApiContext.Provider>
        );
    }
}

export default App;