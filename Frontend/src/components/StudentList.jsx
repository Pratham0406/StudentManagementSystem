import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import StudentForm from './StudentForm'
import Toasts from './Toast'

const API = '/api'

export default function StudentList(){
  const [students, setStudents] = useState([])
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)
  const [toasts, setToasts] = useState([])

  useEffect(()=>{ fetchStudents() },[])

  function pushToast(message, type='info'){
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(()=> setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }

  function extractErrorMessage(err){
    if(!err) return 'Unknown error'
    if(err.response && err.response.data){
      if(typeof err.response.data === 'string') return err.response.data
      if(err.response.data.message) return err.response.data.message
    }
    return err.message || String(err)
  }

  async function fetchStudents(){
    setLoading(true)
    try{
      const res = await axios.get(`${API}/students`)
      setStudents(Array.isArray(res.data) ? res.data : [])
      setError(null)
    }catch(err){
      setError('Could not load students')
      pushToast('Could not load students', 'error')
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  async function handleAdd(student){
    setActionLoading('add')
    try{
      await axios.post(`${API}/students`, student)
      pushToast('Student added', 'success')
      await fetchStudents()
    }catch(err){
      const msg = extractErrorMessage(err)
      pushToast(`Add failed: ${msg}`, 'error')
      setError('Add failed')
      console.error(err)
      throw err
    }finally{
      setActionLoading(null)
    }
  }

  async function handleUpdate(student){
    setActionLoading(student.rollNo)
    try{
      await axios.post(`${API}/${student.rollNo}`, student)
      pushToast('Student updated', 'success')
      setEditing(null)
      await fetchStudents()
    }catch(err){
      const msg = extractErrorMessage(err)
      pushToast(`Update failed: ${msg}`, 'error')
      setError('Update failed')
      console.error(err)
      throw err
    }finally{
      setActionLoading(null)
    }
  }

  async function handleDelete(rollNo){
    if(!confirm(`Delete student ${rollNo}?`)) return
    setActionLoading(rollNo)
    try{
      await axios.delete(`${API}/${rollNo}`)
      pushToast('Student deleted', 'success')
      await fetchStudents()
    }catch(err){
      const msg = extractErrorMessage(err)
      pushToast(`Delete failed: ${msg}`, 'error')
      setError('Delete failed')
      console.error(err)
    }finally{
      setActionLoading(null)
    }
  }

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    if(!q) return students
    return students.filter(s =>
      String(s.rollNo).includes(q) ||
      (s.firstName || '').toLowerCase().includes(q) ||
      (s.lastName || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q)
    )
  },[students, query])

  return (
    <div className="panel">
      <Toasts toasts={toasts} onRemove={id => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div className="panel-header">
        <div className="left">
          <h2>Students</h2>
          <p className="muted">Total: {students.length}</p>
        </div>
        <div className="right">
          <input
            className="search"
            placeholder="Search by name, email or roll"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="actions-row">
        <div className="add-card">
          <h3 className="card-title">Add Student</h3>
          <StudentForm onSave={handleAdd} disabled={actionLoading === 'add' || loading} />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="cards">
        {loading ? (
          <div className="empty"><div className="spinner" /> Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No students found. Add a student to get started.</div>
        ) : filtered.map(s => (
          <div className="card" key={s.rollNo}>
            <div className="card-left">
              <div className="avatar">{String(s.firstName || s.lastName || '').charAt(0).toUpperCase()}</div>
            </div>
            <div className="card-body">
              <div className="card-title">{s.firstName} {s.lastName}</div>
              <div className="card-sub">Roll: {s.rollNo} • {s.email}</div>
            </div>
            <div className="card-actions">
              <button
                className="btn ghost"
                onClick={()=>setEditing(s)}
                disabled={!!actionLoading}
              >
                {actionLoading === s.rollNo ? '...' : 'Edit'}
              </button>
              <button
                className="btn danger"
                onClick={()=>handleDelete(s.rollNo)}
                disabled={!!actionLoading}
              >
                {actionLoading === s.rollNo ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Student</h3>
              <button className="btn ghost" onClick={()=>setEditing(null)}>Close</button>
            </div>
            <StudentForm
              initial={editing}
              onSave={handleUpdate}
              onCancel={()=>setEditing(null)}
              disabled={!!actionLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}