import React, { useEffect, useState } from 'react'

export default function StudentForm({ initial, onSave, onCancel, disabled }){
  const [student, setStudent] = useState({ rollNo:'', firstName:'', lastName:'', email:'' })
  const [errors, setErrors] = useState({})

  useEffect(()=>{ if(initial) setStudent(initial) },[initial])

  function change(e){
    const { name, value } = e.target
    setStudent(prev => ({
      ...prev,
      [name]: name === 'rollNo' ? (value === '' ? '' : Number(value)) : value
    }))
    setErrors(prev => ({ ...prev, [name]: null, form: null }))
  }

  async function submit(e){
    e.preventDefault()
    const nextErrors = {}
    if(student.rollNo === '' || student.rollNo === null) nextErrors.rollNo = 'Roll number is required'
    if(!student.firstName || String(student.firstName).trim() === '') nextErrors.firstName = 'First name is required'
    if(Object.keys(nextErrors).length){ setErrors(nextErrors); return }

    try{
      await onSave(student)
      if(!initial) setStudent({ rollNo:'', firstName:'', lastName:'', email:'' })
    }catch(err){
      setErrors(prev => ({ ...prev, form: 'Save failed. Check the details and try again.' }))
    }
  }

  return (
    <form className="student-form card-form" onSubmit={submit} noValidate>
      {errors.form && <div className="error">{errors.form}</div>}

      <div className="row">
        <div className="field small">
          <label>Roll</label>
          <input
            name="rollNo"
            value={student.rollNo}
            onChange={change}
            type="number"
            disabled={!!initial || disabled}
          />
          {errors.rollNo && <div className="field-error">{errors.rollNo}</div>}
        </div>
        <div className="field">
          <label>First</label>
          <input name="firstName" value={student.firstName} onChange={change} disabled={disabled} />
          {errors.firstName && <div className="field-error">{errors.firstName}</div>}
        </div>
        <div className="field">
          <label>Last</label>
          <input name="lastName" value={student.lastName} onChange={change} disabled={disabled} />
        </div>
      </div>

      <div className="row">
        <div className="field wide">
          <label>Email</label>
          <input name="email" value={student.email} onChange={change} type="email" disabled={disabled} />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn primary" type="submit" disabled={disabled}>
          {disabled ? 'Saving...' : 'Save'}
        </button>
        {onCancel && (
          <button className="btn ghost" type="button" onClick={onCancel} disabled={disabled}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
