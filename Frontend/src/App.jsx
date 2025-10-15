import React from 'react'
import StudentList from './components/StudentList'

export default function App(){
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <div className="logo">SM</div>
          <div>
            <h1>Student Management</h1>
            <p className="subtitle">Manage students quickly — add, edit and delete records</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <StudentList />
      </main>
    </div>
  )
}
